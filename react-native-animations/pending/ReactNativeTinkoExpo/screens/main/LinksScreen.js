import React, {
    Component
} from 'react'
import {StyleSheet, View, WebView, ScrollView, Text, DeviceEventEmitter, Image, Alert,AppState, Platform} from 'react-native'
import { ListItem, Header, Avatar } from 'react-native-elements'
import Expo, { Notifications, SQLite, Permissions} from 'expo';
const db = SQLite.openDatabase('db.db');
import * as firebase from "firebase";
import moment from "moment";
import IconBadge from '../../modules/react-native-icon-badge'
import {Ionicons} from '@expo/vector-icons'
import {Image as CacheImage} from "react-native-expo-image-cache";
//Expo.Constants.deviceId

import {Hang,userLogin} from '../../modules/SocketModule'

require("firebase/firestore");
import SocketIOClient from 'socket.io-client';
import {
    StackNavigator
} from 'react-navigation';
import PrivateChatScreen from './common/PrivateChatScreen';
import GroupChatScreen from './common/GroupChatScreen';
import Colors from "../../constants/Colors";
import TinkoScreen from "./TinkoScreen";
import {getMeetInfo, getUserDataFromDatabase, getMeetAvatarUri,getListTime,getCurrentTime,writeInAsyncStorage,getFromAsyncStorage} from "../../modules/CommonUtility";
import {
    appendChatData,
    updateUserInfo,
    updateMeets,
    getLength,
    getData,
    updateUnReadNum,
    setUid,
    getTotalUnReadNum,
    unReadNumNeedsUpdates,
    currentOnSelectUser,
    removeChat, setDataStore,
    updateTime
} from "../../modules/ChatStack";


import {quitMeet} from "../../modules/SocketClient";
import {ifIphoneX} from "react-native-iphone-x-helper";

let friendList = [],
    uid = "",
    lastUpdateArr = [],
    personalInfo = {},
    alreadyInList = [],
    currentOnSelectId = "",
    totalUnReadMessageNum = 0,
    getPrivateHistory = false,
    getMeetsHistory = false,
    format = 'YYYY-MM-DD HH:mm:ss';

async function getToken(userId) {
    if (!Expo.Constants.isDevice) {
        return;
    }
    let { status } = await Expo.Permissions.askAsync(
        Expo.Permissions.NOTIFICATIONS,
    );
    if (status !== 'granted') {
        return;
    }
    let value = await Expo.Notifications.getExpoPushTokenAsync();
    //这个是我们的token需要传给服务器
    fetch('https://gotinko.com/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uid: userId,
            token: value,
        }),
    });
}

export default class FriendChatListView extends Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {

            title: 'Message',

            tabBarIcon: ({tintColor, focused}) =>
                <IconBadge
                    MainElement={
                        <View style={{
                            height: 36, width: 36, alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Ionicons
                                name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'}
                                size={30}
                                style={{marginBottom: -3}}
                                color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                            />
                        </View>

                    }
                    BadgeElement={
                        <Text style={{color: '#FFFFFF'}}>{params.totalUnReadMessageNum}</Text>
                    }
                    IconBadgeStyle={
                        {width: 20, height: 20, backgroundColor: 'red'}
                    }
                    Hidden={!params.totalUnReadMessageNum>0}
                />,


            // headerTitle: (<Text>Message</Text>),
            header:null
        }

    };

    constructor(){
        super();

        // console.log("init socket module");
        // initSocketModule(uid);
        let user = firebase.auth().currentUser;
        this.renderChatList= this.renderChatList.bind(this);
        uid = user.uid;
        getToken(uid);
        setUid(uid);
        //userLogin(uid);
       // this.socket = SocketIOClient('https://gotinko.com/');
        //this.getAvatar();
        //this.getDBData();
        this.initChatTableAndGetDBData(uid);
        this.state = {
            messages: [],
            friendInfo:[],
            totalUnReadMessageNum:0
        };

        this.listener =DeviceEventEmitter.addListener('updateUnReadNum',(param)=>{
            getLength(param.id);
            currentOnSelectId = "";
        });
        this.selectListener =DeviceEventEmitter.addListener('updateCurrentOnSelectUser',(param)=>{
            currentOnSelectId = param.id;
        });
        this.avatarListener = DeviceEventEmitter.addListener('avatarUpdate', async (param)=>{
            currentOnSelectId = param.id;
            if (param.type === 0){
                await this.upDateAvatar(param.id);
            }else{                            
                await this.getMeetsName(param.id);
            }
        });
        this.updateBadgeListener =DeviceEventEmitter.addListener('updateBadge',(param)=>{
            //total need update(  
            totalUnReadMessageNum = getTotalUnReadNum();
            this.setState({
                totalUnReadMessageNum:totalUnReadMessageNum
            });
            this.totalUnreadMessageNumChanged(param.num);
        });
        this.sendboxListener =  DeviceEventEmitter.addListener('mySendBox',(msg)=>{
            msg = msg.msg;
            console.log("?????",msg);
            let data = JSON.parse(msg);
            let type = data.type;
            if (parseInt(type) === 0){
                //系统
                appendChatData(moment().format(),getCurrentTime(),type,data.activityId,data.message);
            }else if (parseInt(type)===1){
                //私聊
                appendChatData(moment().format(),getCurrentTime(),type,data.toId,data.msg);
            }else if (parseInt(type) === 999){
                appendChatData(moment().format(),getCurrentTime(),1,data.requester,data.msg);
            }else{
                appendChatData(moment().format(),getCurrentTime(),type,data.activityId,data.message);
            }
            writeInAsyncStorage("chatStack",getData());
            this.setState({
                messages:getData()
            });
        });
        this.localMsgListener =  DeviceEventEmitter.addListener('localMsgSendBox',(msg)=>{
            msg = msg.data;
            let data = JSON.parse(msg);
            let type = data.type;
            if (parseInt(type) === 1){
                appendChatData(moment().format(),getCurrentTime(),type,data.toId,"发送中:"+data.msg);
            }
            writeInAsyncStorage("chatStack",getData());
            this.setState({
                messages:getData()
            });
        });
        this.connectListener =  DeviceEventEmitter.addListener('SocketConnect',(msg)=>{
            msg = msg.msg;
            let data = JSON.parse(msg),
                type = data.type;
            //历史记录
            if (type === 3){
                getPrivateHistory = true;
                if (data.message){
                    let unReadDataArr = data.message;
                    for (let i in unReadDataArr){
                        let dataArr =  unReadDataArr[i],
                            sqlObj = {
                                type :1,
                                from : dataArr.fromId,
                                message : dataArr.msg,
                                time : dataArr.time
                            };
                        if (dataArr!==""){
                            this.insertChatSql(uid,sqlObj);
                            appendChatData(moment(dataArr.time),getListTime(moment(dataArr.time).format(format)),type,dataArr.fromId,dataArr.msg,true);
                            if (!personalInfo[dataArr.fromId]){
                                this.upDateAvatar(dataArr.fromId);
                            }
                        }
                    }

                    writeInAsyncStorage("chatStack",getData());
                    this.setState({
                        messages:getData()
                    });
                }
                //历史记录
            }else if (type === 4){
                getMeetsHistory = true;
                if (data.message.length){
                    if (data.message.length!==0){
                        let unReadDataArr = data.message;
                        for (let i in unReadDataArr){
                            let dataArr =  unReadDataArr[i],
                                sqlObj = {
                                    type :2,
                                    from : dataArr.fromId,
                                    message : dataArr.msg,
                                    time : dataArr.time,
                                    meetId:dataArr.meetId,
                                    meetUserData:dataArr.data
                                };
                            this.insertChatSql(uid,sqlObj);
                            appendChatData(moment(dataArr.time),getListTime(moment(dataArr.time).format(format)),type,dataArr.meetId,dataArr.msg,true);
                        }

                        writeInAsyncStorage("chatStack",getData());
                        this.setState({
                            messages:getData()
                        });
                    }
                }
            }else if (type === 5){
                console.log(data);
            }else{
                console.log(data);
            }
            //正常的聊天
            if (type !== 3 && type !== 4){
                console.log("recieved data:",data);
                console.log("当前时间：",moment().format());
                this.insertChatSql(uid,data);
                if (parseInt(type) === 0){
                    //系统
                    appendChatData(moment().format(),getCurrentTime(),type,data.activityId,data.message,true);
                }else if (parseInt(type)===1){
                    //私聊
                    appendChatData(moment().format(),getCurrentTime(),type,data.from,data.message,true);
                }else{
                    if (data.from!==uid){
                        appendChatData(moment().format(),getCurrentTime(),type,data.activityId,data.message,true);
                    }else{
                        appendChatData(moment().format(),getCurrentTime(),type,data.activityId,data.message);
                    }
                }

                writeInAsyncStorage("chatStack",getData());
                this.setState({
                    messages:getData()
                });
            }
        })
        this.signOutListener =  DeviceEventEmitter.addListener('signOut',()=>{
            this.listener.remove();
            this.sendboxListener.remove();
            this.connectListener.remove();
            this.selectListener.remove();
            this.avatarListener.remove();
            this.localMsgListener.remove();
            this.updateBadgeListener.remove();
            this.signOutListener.remove();
        });

        //updateBadge

        // setInterval(() => {
        //     this.totalUnreadMessageNumChanged(totalUnReadMessageNum);
        // },500);
    }

    componentDidMount(){
        this.totalUnreadMessageNumChanged(totalUnReadMessageNum);
        AppState.addEventListener('change', this._handleAppStateChange);
        console.log("开启chatStack");
        this.initChatStack();
    }

    componentWillUnmount(){
        AppState.removeEventListener('change', this._handleAppStateChange);
        writeInAsyncStorage("chatStack",getData());
        // this.listener.remove();
        // this.selectListener.remove();
        // this.avatarListener.remove();
        // this.localMsgListener.remove();
        // this.updateBadgeListener.remove();
    }

    _handleAppStateChange = (nextAppState) => {
        if (nextAppState === "background"){
            Hang();
        }else if (nextAppState === "active"){
            userLogin(uid);
        }
    };

    initChatStack(){
        getFromAsyncStorage("chatStack").then((chatInfo) => {
            console.log('initChatStack', chatInfo);
            console.log("???????",getData());
            if(chatInfo){
                setDataStore(chatInfo);
                let chat = getData();
                updateTime();
                for (element in chat){
                    let ele = chat[element];
                    if (ele.imageURL === "http://larissayuan.com/home/img/prisma.png"&&(ele.type === 1||ele.type ===3)){
                        this.upDateAvatar(ele.id);
                    }else if (ele.imageURL === "http://larissayuan.com/home/img/prisma.png"&&(ele.type === 2||ele.type ===4)){
                        this.getMeetsName(ele.id);
                    }

                }
                this.setState({
                    messages:getData()
                });
            } else {
                setDataStore([]);
            }
        });
    }

    totalUnreadMessageNumChanged(num){
        if (this.props.navigation){
            this.props.navigation.setParams({totalUnReadMessageNum:num});
        }
    }

    insertChatSql(uid,data){
        let type = data["type"],
            message = data["message"],
            from = data["from"],
            meetingId = "",
            userData = "",
            time = "",
            status = 0,
            readStatus = (currentOnSelectId === from)?0:1;
        if (data["time"]){
            time = data["time"];
        }
        if (data["meetId"]!==undefined){
            meetingId = data["meetId"];
            readStatus = (currentOnSelectId === meetingId)?0:1;
        }else if (data["activityId"]!==undefined){
            meetingId = data["activityId"];
        }
        if (data["meetUserData"]!==undefined){
            userData = data["meetUserData"];
        }
        if (data["userData"]!==undefined){
            userData = JSON.stringify(data["userData"]);
        }
        if (readStatus === 1){
            totalUnReadMessageNum ++;
            this.totalUnreadMessageNumChanged(totalUnReadMessageNum);
        }
        let sqlStr = "",
            sqlParams = [];
        if (time === ""){
            sqlStr = "INSERT INTO db"+uid+" (fromId,msg,status,type,meetingId,meetUserData,hasRead,timeStamp) VALUES (?,?,?,?,?,?,?,?)";
            sqlParams =[from,message,status,type,meetingId,userData,readStatus,moment().format()];
        }else{
            console.log("进入的是这里");
            sqlStr = "INSERT INTO db"+uid+" (fromId,msg,status,type,meetingId,meetUserData,timeStamp,hasRead) VALUES (?,?,?,?,?,?,?,?)";
            sqlParams =[from,message,status,type,meetingId,userData,time,readStatus];
        }
        console.log(totalUnReadMessageNum);
        db.transaction(
            tx => {
                tx.executeSql(sqlStr,sqlParams);
            },
            (error) => console.log("db insert chat error :" + error),
            null
        );
    }

    initChatTableAndGetDBData(uid){
        console.log("uid:",uid);
        db.transaction(
            tx => {
                tx.executeSql('create table if not exists db'+ uid +' (' +
                    'id integer primary key not null , ' +
                    'fromId text, msg text , ' +
                    'status int, ' +
                    'type int,' +
                    'meetingId text, '+
                    'sendCode int DEFAULT 0,'+
                    'meetUserData text,'+
                    'hasRead int DEFAULT 1,' +
                    'isSystem int DEFAULT 0,'+
                    'timeStamp DATETIME DEFAULT CURRENT_TIMESTAMP);');
            },
            (error) => console.log("db create:" + error),
            () => {
                console.log('db create complete db'+uid);
               // this.getDBData();
            }
        );
    }

    async upDateAvatar(id){
        console.log("we are waiting for User:" ,id);
        await getUserDataFromDatabase(id,
            (userData) => {
                this.setState({
                    messages:updateUserInfo(userData)
                });

            },
            (error) => {
                console.log("error");
            });
    }

    async getMeetsName(id){
        console.log("we are waiting for Activity:" ,id);
        await getMeetInfo(id,
            (title, tagName, coverImageUri)=>{
            console.log(title, tagName, 'coverImageUri');
            let uri;
            if(coverImageUri){
                uri = coverImageUri;
            } else {
                uri = getMeetAvatarUri(tagName);
            }
                // updateMeets({
                //     name:title,
                //     photoURL:uri,
                //     id:id
                // });
                this.setState({
                    messages:updateMeets({
                        name:title,
                        photoURL:uri,
                        id:id
                    })
                });
            },
            (error) => {
                console.log(error);
            });
    }

    removeData(id){
        removeChat(id);
        writeInAsyncStorage("chatStack",getData());
        this.setState({
            messages:getData()
        });
    }

    renderChatList(){
        return (
            this.state.messages.map((messages) => (
                <ListItem
                    leftAvatar={
                        <IconBadge
                            MainElement={
                                messages.type===1 ?
                                    <Image
                                        style={{width:50, height:50, borderRadius:25}}
                                        //uri={messages.imageURL}
                                        source={{uri:messages.imageURL}}
                                    />

                                    :

                                    <Image
                                        style={{width: 50,height: 50,borderRadius: 10}}
                                        //uri={messages.imageURL}
                                        source={{uri:messages.imageURL}}
                                    />


                            }
                            BadgeElement={
                                <Text style={{color: '#FFFFFF'}}>{messages.length}</Text>
                            }
                            IconBadgeStyle={
                                {width: 20, height: 20, backgroundColor: 'red'}
                            }
                            Hidden={!messages.length>0}
                        />
                    }
                    key={messages.id}
                    title={messages.personName}
                    titleProps={{numberOfLines:1}}
                    titleStyle={{fontFamily:'regular'}}
                    // title={
                    //     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    //         <Text style={{fontFamily:'regular', fontSize:25}} numberOfLines={1}>{messages.personName}</Text>
                    //         <Text>3:22</Text>
                    //     </View>
                    // }
                    subtitle={messages.msg}
                    subtitleProps={{numberOfLines:1}}
                    subtitleStyle={{fontFamily:'regular', color:'#626567'}}
                    rightSubtitle={messages.time}
                    // badge={
                    //     { value: messages.length, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }
                    // }
                    onPress={() => {
                        currentOnSelectId = messages.id;
                        if (messages.type === 1){
                            unReadNumNeedsUpdates(messages.id,0);
                            updateUnReadNum(1,messages.id);
                            currentOnSelectUser(messages.id);
                            // totalUnReadMessageNum = totalUnReadMessageNum - getLength(messages.id);
                            // this.totalUnreadMessageNumChanged(totalUnReadMessageNum);

                            writeInAsyncStorage("chatStack",getData());
                            this.props.navigation.navigate('PrivateChatPage', {
                                avatar:messages.imageURL,
                                name:messages.personName,
                                personId:messages.id,
                                myId:uid
                            });
                        }else{
                            unReadNumNeedsUpdates(messages.id,1);
                            updateUnReadNum(2,messages.id);
                            currentOnSelectUser(messages.id);
                            // totalUnReadMessageNum = totalUnReadMessageNum - getLength(messages.id);
                            // this.totalUnreadMessageNumChanged(totalUnReadMessageNum);

                            writeInAsyncStorage("chatStack",getData());
                            this.props.navigation.navigate('GroupChatPage', {
                                avatar:messages.imageURL,
                                name:messages.personName,
                                personId:messages.id,
                                myId:uid
                            })
                        }
                    }
                    }
                    onLongPress={()=>{
                        Alert.alert("Delete this row?", '',
                            [
                                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {text: 'Delete', onPress: () => this.removeData(messages.id), style:"destructive"},
                            ]);
                    }}
                />
            ))
        )
    }

    render() {

        return (
            <View style={{flex:1}}>
                <Header
                    backgroundColor={'#C4ECFF'}
                    centerComponent={{ text: 'Message', style: { fontSize:18, fontFamily:'regular', color: '#000' } }}
                    outerContainerStyles={Platform.OS === 'android'? {height:68} : ifIphoneX({height:88})}
                />
                <ScrollView>
                    <this.renderChatList/>
                    {this.state.messages.length===0 &&
                        <ListItem
                            title={'Welcome to Tinko'}
                            titleStyle={{fontFamily:'regular'}}
                            subtitle={'You can view your friends\' Tinko at Tinko tab.' +
                            'And view nearby Tinkos at Discover tab.'}
                            subtitleStyle={{fontFamily:'regular', color:'#626567'}}
                            leftAvatar={{ rounded: true, size:40, source: { uri: 'https://firebasestorage.googleapis.com/v0/b/tinko-64673.appspot.com/o/System%2FMeetAvatar%2Fsmileface.png?alt=media&token=9fd2c9aa-f52c-48b1-9daa-b014ef674b13' } }}
                        />
                    }
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create(
    {
        separator:
            {
                height: 2,
                backgroundColor: 'rgba(0,0,0,0.5)',
                width: '100%'
            },

        text:
            {
                fontSize: 18,
                color: 'black',
                padding: 15
            },
        subtitleView: {
            flexDirection: 'row',
            paddingLeft: 10,
            paddingTop: 5
        },
        ratingImage: {
            height: 19.21,
            width: 100
        },
        ratingText: {
            paddingLeft: 10,
            color: 'grey'
        }
    });
