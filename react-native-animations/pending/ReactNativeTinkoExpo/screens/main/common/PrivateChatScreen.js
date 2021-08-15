import React, {
    Component
} from 'react';
import {
    AsyncStorage, View, StyleSheet, Text, DeviceEventEmitter, KeyboardAvoidingView,TouchableOpacity, Platform
} from 'react-native';
import {getUserDetail} from "../../../modules/UserAPI";
import {Image as CacheImage} from "react-native-expo-image-cache";
import { SQLite } from 'expo';
const db = SQLite.openDatabase('db.db');
import { GiftedChat } from 'react-native-gifted-chat';
import SocketIOClient from 'socket.io-client';
import {ifIphoneX} from "react-native-iphone-x-helper";
import {Header} from "react-native-elements";
import {
    unReadNumNeedsUpdates,
    updateLastMessage,
    currentOnSelectUser,
    appendChatData, getLength
} from "../../../modules/ChatStack";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
    getAvatarPlaceholder,
    getCurrentTime,
    getFromAsyncStorage,
    writeInAsyncStorage
} from "../../../modules/CommonUtility";
import moment from "moment";
import {sendPrivateChat} from "../../../modules/SocketModule";
import Composer from '../../../components/Composer';

let uid = "",
    pid = "",
    myName = "Private Chat",
    dbInfoList = [],
    limit = 15,
    userAvatar,userName,
    timeSTP = "";

export default class PrivateChatScreen extends Component {

    static navigationOptions = {header:null};

    state = {
        messages: [],
        thisUser:{_id: 1},
        isLoadingEarlier:false,
        hasCache:false,
    };

    constructor(props){
        super(props);
        dbInfoList = [];
        this.state.messages = [];
        let dataStore = this.props.navigation.state.params;
        uid = dataStore.myId;
        pid = dataStore.personId;
        userAvatar =  dataStore.avatar;
        userName = dataStore.name;
        getFromAsyncStorage('ThisUser').then((userData) => {
            if(userData) {
                myName = (userData.username);
            }
        });
    }

    componentDidMount(){
        //unReadNumNeedsUpdates(pid,0);
        this.getFromDB(uid,pid);
        this.connectListener =  DeviceEventEmitter.addListener('SocketConnect',(msg)=>{
            msg = msg.msg;
            let data = JSON.parse(msg),
                type = data.type;
            if (type === 1){
                if (data.from === pid){
                    this.appendFriendMessage(false,data.message,Date.parse(new Date()))
                }
            }
        });
        this.sendboxListener =  DeviceEventEmitter.addListener('mySendBox',(msg)=>{
            msg = msg.msg;
            let data = JSON.parse(msg);
            if (data.type === 1){
                //updateSql = "update db"+uid+" set hasRead = 0 where hasRead = 1 and fromId = '" + targetId + "'"
                let updateSQL = "update db" + uid + " set sendCode = 0 where id = " + data.code;
                db.transaction(
                    tx => {
                        tx.executeSql(updateSQL,[]);
                    },
                    (error) => console.log("update chat error :" + error),
                    () => function () {
                        console.log("update Success");
                    }
                );
            }
        });
        this.unReadMsg =DeviceEventEmitter.addListener('PrivateUnRead',(param)=>{
            let data = JSON.parse(param.data);
            if (data.fromId === pid){
                this.appendFriendMessage(false,data.msg,new Date(data.time))
            }
        });
    }

    componentWillUnmount(){
        this.sendboxListener.remove();
        this.connectListener.remove();
        this.unReadMsg.remove();
        currentOnSelectUser("");
    }

    getFromDB(uid,pid){
        // ORDER BY id DESC limit 10
        db.transaction(
            tx => {
                tx.executeSql("SELECT * from db" + uid + " WHERE fromId = '" + pid + "' and meetingId = '' ORDER by id DESC", [], (_, {rows}) => {
                    let dataArr = rows['_array'];
                    if (dataArr.length>limit){
                        let processIng = [];
                        for (let i = 0;i<limit;i++){
                            processIng.push(dataArr.shift());
                        }
                        dbInfoList = dataArr;
                        this.processData(processIng);
                    }else{
                        this.setState({
                            hasCache:false
                        });
                        this.processData(dataArr);
                    }
                })
            },
            null,
            null
        );
    }

    //1代表还有
    processData(infoList,type){
        for (let i = 0;i<infoList.length;i++){
            if (infoList[i].isSystem === 1){
                this.appendSystemMessage(true,infoList[i].msg,infoList[i].timeStamp)
            }else{
                if (infoList[i].status === 0){
                    this.appendFriendMessage(true,infoList[i].msg,"cache"+infoList[i].id,infoList[i].timeStamp);
                }else{
                    if (infoList[i].sendCode!==0){
                        this.appendMessage(true,infoList[i].msg,infoList[i].timeStamp,1);
                    }else{
                        this.appendMessage(true,infoList[i].msg,infoList[i].timeStamp);
                    }
                }
            }
        }                 
        if (type===undefined){
            this.setState({
                hasCache:(dbInfoList.length !== 0)
            });
        }else{
            this.setState({
                hasCache:false
            });
        }
    }

    getHistoryChatContents(){
        this.setState({isLoadingEarlier:true});
        if (dbInfoList.length>limit){
            let processIng = [];
            for (let i = 0;i<limit;i++){
                processIng.push(dbInfoList.shift());
            }
            this.processData(processIng);
        }else{
            this.processData(dbInfoList,1);
        }

        this.setState({isLoadingEarlier:false});
    }

    appendMessage(isCache,msg,time,isFailed){
        if (isFailed!==undefined){
            msg = "Failed:"+msg;
        }
        let messages = [{
            _id: Math.round(Math.random() * 10000),
            text: msg,
            createdAt: new Date(time),
            user: {
                _id: 1,
                name: 'Developer',
            }
        }];
        if (isCache){
            messages = this.state.messages.concat(messages);
        }else{
            messages = messages.concat(this.state.messages);
        }
        this.setState({
            messages:messages
        })
    }

    appendSystemMessage(isCache,msg,time){
        let chatData = [{
            _id: Math.round(Math.random() * 10000),
            text: msg,
            createdAt: time,
            system:true
        }];
        if (isCache){
            chatData = this.state.messages.concat(chatData);
        }else{
            chatData = chatData.concat(this.state.messages);
        }
        this.setState({
            messages:chatData
        })
    }


    appendFriendMessage(isCache,msg,key,time){
        let chatData = [];
        if (time === undefined){
            chatData = [{
                _id: key,
                text: msg,
                createdAt: new Date(),
                user: {
                    _id: Math.random()*100000,
                    name: userName,
                    avatar: userAvatar,
                },
            }]
        }else{
            chatData = [{
                _id: key,
                text: msg,
                createdAt: time,
                user: {
                    _id: Math.random()*100000,
                    name: userName,
                    avatar: userAvatar,

                },
            }];
        }
        if (isCache){
            chatData = this.state.messages.concat(chatData);
        }else{
            chatData = chatData.concat(this.state.messages);
        }
        this.setState({
            messages:chatData
        })
    }

    SendMSG(messages = []) {
        let text = messages[0].text;
        let code =  Date.parse( new Date())/1000;
        if (code !== timeSTP){
            timeSTP = code;
            updateLastMessage(pid,text);
            db.transaction(
                tx => {
                    tx.executeSql("INSERT INTO db"+uid+" (" +
                        "timeStamp,"+
                        "fromId," +
                        "hasRead,"+
                        "msg," +
                        "status," +
                        "type," +
                        "meetingId," +
                        "meetUserData," +
                        "isSystem," +
                        "sendCode) VALUES (?,?,?,?,?,?,?,?,?,?)",[moment().format(),pid,0,text,1,1,"","",0,code],(_, { insertId }) => {
                                //被修改了的数量
                        console.log("已经存进去了，id是",insertId);

                            sendPrivateChat({
                                uid:uid,
                                pid:pid,
                                text:text,
                                insertId:insertId,
                                myName:myName
                            });
                            this.setState(previousState => ({
                                messages: GiftedChat.append(previousState.messages, messages[0]),
                            }))
                        }
                    );
                },
                (error) => {
                    console.log("error:",error)
                },
                () => {
                }
            );
        }
    }

    renderAvatar(props){
        return(
            <TouchableOpacity
            onPress={() => props.onPressAvatar(pid,this.props.navigation)}
        >
            <CacheImage
                preview={getAvatarPlaceholder}
                uri={props.currentMessage.user.avatar}
                style={styles.avatar}
            />
        </TouchableOpacity>)
    }

    renderComposer(props) {
        return <Composer
            {...props}
        />;
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:'white'}}>
                <Header
                    leftComponent={{ icon: 'chevron-left', color: '#fff', onPress:()=>this.props.navigation.goBack()}}
                    centerComponent={{ text: userName, style: { fontSize:18, fontFamily:'regular', color: '#fff' } }}
                    outerContainerStyles={Platform.OS === 'android'? {height:68} : ifIphoneX({height:88})}
                />

                <GiftedChat
                    messages={this.state.messages}
                    user={this.state.thisUser}
                    onSend={messages => this.SendMSG(messages)}
                    renderAvatar={this.renderAvatar.bind(this)}
                    onPressAvatar={this.props.screenProps.showThisUser}
                    showAvatarForEveryMessage={true}
                    loadEarlier={this.state.hasCache}
                    isLoadingEarlier={this.state.isLoadingEarlier}
                    onLoadEarlier={() => this.getHistoryChatContents()}
                    bottomOffset={ifIphoneX(34)}
                    renderAvatarOnTop={true}
                    ref={(c) => this.giftedChatRef = c}
                    renderComposer={props => this.renderComposer(props)}
                    textInputProps={{
                        // onSubmitEditing: () => {
                        //     let text = this.giftedChatRef.textInput._getText();
                        //     let messages = [{
                        //         createdAt: new Date(),
                        //         text: text,
                        //         user: this.state.thisUser,
                        //         _id: Math.floor(Math.random()*10000)
                        //     }];
                        //     this.giftedChatRef.onSend(messages);
                        //     this.giftedChatRef.onInputTextChanged('');
                        // },
                        // returnKeyType:'send',
                        // blurOnSubmit:false,
                        // onLayout:(event)=> {
                        //     console.log(event.nativeEvent.layout);
                        //     console.log(this.giftedChatRef.textInput._getText());
                        // }
                    }}
                />
                {Platform.OS === 'android' && <KeyboardSpacer/>}
                <View style={{...ifIphoneX({height:34, backgroundColor:'white'}, {})}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#aaa',
    },
    avatar: {
        // The bottom should roughly line up with the first line of message text.
        height: 36,
        width: 36,
        borderRadius: 18,
    },
});