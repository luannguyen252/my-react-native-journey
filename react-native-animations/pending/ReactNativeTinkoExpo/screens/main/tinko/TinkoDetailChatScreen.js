import React from "react";
import {View, Platform, SafeAreaView, Keyboard, DeviceEventEmitter} from 'react-native';
import { GiftedChat, Actions, Bubble, SystemMessage } from 'react-native-gifted-chat';
import SlackMessage from '../../../components/SlackMessage'
import emojiUtils from 'emoji-utils';
import {
    getFromAsyncStorage,
    getUserData,
    writeInAsyncStorage,
    getUserDataFromDatabase,
    getMeetInfo, getMeetAvatarUri
} from "../../../modules/CommonUtility";
import firebase from "firebase/index";
import {Header} from "react-native-elements";
import { ifIphoneX } from 'react-native-iphone-x-helper';
import SocketIOClient from 'socket.io-client';
import KeyboardSpacer from "react-native-keyboard-spacer";
import {MaterialIcons} from '@expo/vector-icons';
import {byStander,initByStanderChat,removeByStanderChat} from "../../../modules/SocketModule";
import {getLength, updateMeets} from "../../../modules/ChatStack";
import Composer from '../../../components/Composer';

let MeetId = "",
    uid = "",
    MeetName = "",
    userList = [],
    waitingList = [],
    myName = "Group Chat",
    userInfo = {},
    stack;

export default class TinkoDetailChatScreen extends React.Component {

    static navigationOptions = {header:null};

    state = {
        messages: []
    };

    messageStack(){
        this.dataStore = [];
        this.messageMap = {

        };
        this.appendMsg = function (userId,msg,type) {
            if (this.messageMap[userId] === undefined){
                this.messageMap[userId] = [this.dataStore.length];
            }else{
                this.messageMap[userId].push(this.dataStore.length)
            }
            // if (msg.indexOf("/*Tinko-[") === 0){
            //     msg = "notification"
            // // }
            // msg = msg.indexOf("/*Tinko-[")
            if (userInfo[userId]!==undefined){
                this.dataStore.push({
                    _id: Math.floor(Math.random()*10000),
                    text: msg,
                    user: {
                        _id: userId,
                        name: userInfo[userId].username,
                        avatar: userInfo[userId].photoURL,
                    },
                    sent: (type === 0)
                });
            }else{
                this.dataStore.push({
                    _id: Math.floor(Math.random()*10000),
                    text: msg,
                    user: {
                        _id: userId,
                        name: "Tinko",
                        avatar: "http://larissayuan.com/home/img/prisma.png",
                    },
                    sent: (type === 0)
                });
            }
        };
        this.reloadUserInfo = function (userId) {
            for (let i = 0;i<this.dataStore.length;i++){
                if (this.dataStore[i].user._id === userId){
                    this.dataStore[i].user = {
                        _id: userId,
                        name: userInfo[userId].username,
                        avatar: userInfo[userId].photoURL
                    };
                }
            }
        };
        this.getData = function () {
            return (this.dataStore);
        }
    }

    constructor(props){
        super(props);
        stack = new this.messageStack();
        let user = firebase.auth().currentUser;
        let userUid = user.uid;
        uid = user.uid;
        MeetId = this.props.navigation.state.params.meetId;
        this.getMeetsName(MeetId);
        getFromAsyncStorage('ThisUser').then((userData) => {
            if(userData) {
                myName = (userData.username);
            }
        });
        this.state = {
            meetId: this.props.navigation.state.params.meetId,
            messages: [],
            thisUser:{_id:-1},
            userUid:userUid,
            loadEarlier: false,
            isLoadingEarlier:false,
            lastMeetId:-1,
            limit:15,
            SafeAreaInsets:34,
        };

    }

    async getMeetsName(id){
        console.log("we are waiting for Activity:" ,id);
        await getMeetInfo(id,
            (title, tagName, coverImageUri)=>{
                MeetName = title
            },
            (error) => {
                console.log(error);
            });
    }


    componentDidMount(){
        this.getGroupChatContents();
        initByStanderChat(MeetId);
        this.listener =DeviceEventEmitter.addListener('activity'+MeetId,(param)=>{
            try {
                let msg = param.msg;
                let data = JSON.parse(msg);
                this.processMessageData([data],0);
            } catch(e) {
                console.log(e);
            }
        });
        getFromAsyncStorage('ThisUser').then((userData) => {
            if(userData) {
                let thisUser = {
                    _id:userData.uid,
                    name: userData.username,
                    avatar: userData.photoURL,
                    uid: userData.uid
                };
                this.setState({thisUser})
            } else {
                getUserData(userUid).fork(
                    (error) => {
                        console.log(error);
                    },
                    (userData) => {
                        let thisUser = {
                            _id:userData.uid,
                            name: userData.username,
                            avatar: userData.photoURL,
                            uid: userData.uid
                        };
                        this.setState({thisUser})
                    }
                );
            }
        });
    }

    componentWillUnmount(){
        removeByStanderChat("activity" + MeetId);
        this.listener.remove();
    }

    getInfo(pid){
        if (waitingList.indexOf(pid) === -1){
            waitingList.push(pid);
            getUserDataFromDatabase(
                pid,
                (userData) => {
                    let creatorUsername = userData.username,
                        creatorPhotoURL = userData.photoURL;
                    userInfo[pid] = {
                        username:userData.username,
                        photoURL:userData.photoURL
                    };
                    stack.reloadUserInfo(pid);
                    this.setState({
                        messages:stack.getData()
                    });
                    console.log("我们刷新了state:",this.state.messages);
                },
                (error) => {
                    console.log('Error', error);
                }
            );
        }
    }

    getGroupChatContents() {
        this.setState({isLoadingEarlier:true});
        const {lastMeetId, limit} = this.state;
        let bodyData= {
            meetId:this.state.meetId,
            lastId: lastMeetId,
            limit:limit
        };
        try {
            console.log('before fetch');
            fetch('https://gotinko.com/getChatHistory', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            }).then((response) => response.json())
                .then((responseJson) => {
                    let data = responseJson.data;
                    console.log('after fetch', data);
                    let messages=[];
                    this.processMessageData(data,1);
                    if(data.length<limit){
                        this.setState({loadEarlier:false, });
                    } else {
                        this.setState({loadEarlier:true, });
                    }
                    let lastId;
                    if(data.length!==0){
                        lastId=data[data.length-1].id;
                    }
                    this.setState({isLoadingEarlier:false, lastMeetId:lastId});
                })
                .catch((error) => {
                    console.log("报错了");
                    console.error(error);
                });
        } catch (error) {
            console.log("报错了");
            console.error(error);
        }
    }

    //type === 1为历史 需要unshift
    async processMessageData(data,type){
        let messages = [];
        await data.reduce((p,e,i) => p.then(async ()=> {
            console.log(e);
            await getUserDataFromDatabase(e.fromId,
                (userData) => {
                    //console.log(userData);
                    if (e.msg.indexOf("/*Tinko-[notifiction://")!==-1&&e.msg.indexOf("]-Tinko*/")!==-1){
                        e.msg = e.msg.replace("/*Tinko-[notifiction://","").replace("]-Tinko*/","");
                        let message = {
                            _id: Math.floor(Math.random()*10000),
                            // text: e.msg,
                            text: e.msg,
                            createdAt: e.timeStamp,
                            system:true
                        };
                        messages.push(message);
                    }else{
                        let message = {
                            _id: Math.floor(Math.random()*10000),
                            // text: e.msg,
                            text: e.msg,
                            user: {
                                _id: userData.uid,
                                name: userData.username,
                                avatar: userData.photoURL,
                            },
                            sent: (e.status === 0)
                        };
                        messages.push(message);
                    }
                },
                (error) => {
                    Alert.alert('Error', error);
                });
        }),Promise.resolve());
        if (type === 1){
            messages = this.state.messages.concat(messages);
        } else{
            messages = (messages).concat(this.state.messages);
        }
        this.setState({
            messages:messages
        });
    }


    renderMessage(props) {
        const { currentMessage: { text: currText } } = props;

        let messageTextStyle;

        // Make "pure emoji" messages much bigger than plain text.
        if (currText && emojiUtils.isPureEmojiString(currText)) {
            messageTextStyle = {
                fontSize: 28,
                // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
                lineHeight: Platform.OS === 'android' ? 34 : 30,
            };
        }

        return (
            <SlackMessage {...props} messageTextStyle={messageTextStyle} />
        );
    }


    onSend(messages = []) {
        let text = messages[0].text;
        byStander({
            uid:uid,
            MeetId:MeetId,
            text:text,
            myName:myName,
            MeetName:MeetName
        });
    }

    renderComposer(props) {
        return <Composer
            {...props}
        />;
    }

    render() {
        const {thisUser, messages, loadEarlier, isLoadingEarlier, SafeAreaInsets} = this.state;
        return (
            <View style={{flex:1}}>
                <Header
                    centerComponent={{ text: 'Discuss', style: { fontSize:18, fontFamily:'regular', color: '#fff' } }}
                    outerContainerStyles={Platform.OS === 'android'? {height:68} : ifIphoneX({height:88})}
                    leftComponent={<MaterialIcons name='details' size={26} color={'white'} backgroundColor={'transparent'}
                                                   onPress={()=>this.props.navigation.navigate('TinkoDetail')}/>}
                />
                <GiftedChat
                    renderComposer={props=>this.renderComposer(props)}
                    showAvatarForEveryMessage={true}
                    messages={messages}
                    renderMessage={this.renderMessage}
                    renderBubble={this.renderBubble}
                    onSend={messages => this.onSend(messages)}
                    user={thisUser}
                    listViewProps={{
                        style: {
                            backgroundColor: 'white',
                        }
                    }}
                    onPressAvatar={this.props.screenProps.showThisUser}
                    navigation={this.props.navigation}
                    loadEarlier={loadEarlier}
                    onLoadEarlier={() => this.getGroupChatContents()}
                    isLoadingEarlier={isLoadingEarlier}
                    bottomOffset={ifIphoneX(SafeAreaInsets)}
                    //textInputProps={{height:54}}
                />

                {Platform.OS === 'android' && <KeyboardSpacer/>}

                <View style={{...ifIphoneX({height:SafeAreaInsets, backgroundColor:'white'}, {})}}/>
            </View>

        )
    }
}