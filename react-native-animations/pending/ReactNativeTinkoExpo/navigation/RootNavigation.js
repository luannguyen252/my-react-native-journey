import { Notifications, SQLite, Permissions } from 'expo';
const db = SQLite.openDatabase('db.db');

import React from 'react';
import {StyleSheet, SafeAreaView, View, Text, DeviceEventEmitter} from 'react-native';
import { StackNavigator } from 'react-navigation';
import moment from 'moment';
import MainTabNavigator from './MainTabNavigator';
import LoginNavigator from './LoginNavigaor';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import * as firebase from "firebase";
import SocketIOClient from 'socket.io-client';
import 'firebase/firestore';
import UserDetailOverlay from '../screens/main/common/UserDetailOverlay';
import AvatarDisplayOverlay from '../screens/main/common/AvatarDisplayOverlay';
import {initNewFriendsRequestTable, insertNewFriendsRequest} from "../modules/SqliteClient";
import {firestoreDB, getUserData, getUserDataFromDatabase} from "../modules/CommonUtility";
import {initSocketModule} from '../modules/SocketModule';
import {getLength,insertChatSql} from "../modules/ChatStack";

let getPrivateHistory = false,
    getMeetsHistory = false;

let uid = "";

export default class RootNavigator extends React.Component {
    constructor(props){
        super(props);
        this.state={
            userUid:'',
        }
    }

    componentDidMount() {
        // this.listener = Expo.Notifications.addListener(this.handleNotification);
        // this._notificationSubscription = this._registerForPushNotifications();
        if(this.props.loggedIn){
            this.loggedInSetup();
        }
    }

    componentWillUnmount() {
        // this.listener && this.listener.remove();
        this._notificationSubscription && this._notificationSubscription.remove();
    }

  loggedInSetup(){
      let user = firebase.auth().currentUser;
      uid = user.uid;
      this.setState({userUid:uid});
      this.initChatTable(uid);
      initSocketModule(uid);    

      this.listener =DeviceEventEmitter.addListener('mySendBox',(msg)=>{
          msg = msg.msg;
          let data = JSON.parse(msg);
          if (data.type!==999&&data.type!==1){
              insertChatSql(uid,data,0);
             // this.insertChatSql(uid,data,0);
          }
      });
      this.signOutListener =  DeviceEventEmitter.addListener('signOut',()=>{
          this.listener.remove();
          this.signOutListener.remove();
      });

  }


  render() {
        if(this.props.loggedIn){
            return (
                <View style={{flex:1}}>
                    <MainTabNavigator
                        screenProps={{
                            //friendsListIsReady:this.friendsListIsReady.bind(this),
                            showThisUser:this.showThisUser.bind(this),
                            showAvatarDisplay:this.showAvatarDisplay.bind(this),
                            meRef:ref => this.meRef = ref,
                        }}/>
                    <UserDetailOverlay
                        onRef={ref => this.userDetailOverlay = ref}
                        showAvatarDisplay={this.showAvatarDisplay.bind(this)}
                    />
                    <AvatarDisplayOverlay
                        onRef={ref => this.avatarDisplayOverlay = ref}
                    />
                </View>)


        } else {
            return <LoginNavigator screenProps={this.props}/>
        }
      //return <RootStackNavigator/>;
  }

  showThisUser(uid, navigation, updateMethod){
        this.userDetailOverlay.showThisUser(uid, navigation, updateMethod);
  }

  showAvatarDisplay(photoURL){
        this.avatarDisplayOverlay.showAvatarDisplay(photoURL);
  }


    dropChatTable(uid){
        db.transaction(
            tx => {
                tx.executeSql('drop table if exists db'+ uid);
            },
            (error) => console.log("db drop :" + error),
            () => {
                console.log('db complete');
            }
        );
    }

    dropFriendsTable(uid){
        db.transaction(
            tx => {
                tx.executeSql('drop table if exists friend_list'+ uid);
            },
            null,
            null
        );
    }


    initFriendsTable(uid){
        db.transaction(
            tx => {
                tx.executeSql('create table if not exists friend_list'+ uid +' (' +
                    'id integer primary key not null , ' +
                    'userId text UNIQUE, avatarUrl text , ' +
                    'username text, ' +
                    'location text,' +
                    'isFriend int DEFAULT 0,' +
                    'nickname text,' +
                    'isNicknameSet int DEFAULT 0,' +
                    'gender text);');
            },
            (error) => console.log("friendList :" + error),
            () => {
                console.log('friend_list complete');
            }
        );
    }


    dropMeetTable(uid){
        db.transaction(
            tx => {
                tx.executeSql('drop table if exists meet'+ uid);
            },
            (error) => console.log("meet drop :" + error),
            () => {
                console.log('meet complete');
            }
        );
    }

    dropMeetingTable(uid){
        db.transaction(
            tx => {
                tx.executeSql('drop table if exists meeting'+ uid);
            },
            (error) => console.log("meeting drop :" + error),
            () => {
                console.log('meeting complete');
            }
        );
    }

    initMeetingTable(uid){
        db.transaction(
            tx => {
                //tx.executeSql('create table if not exists friend_list'+uid+' (id integer primary key not null , userId text UNIQUE, avatarUrl text, username text, location text, gender text)');
                tx.executeSql('create table if not exists meeting'+ uid + "(" +
                    "id integer primary key not null ," +
                    "meetingId text UNIQUE, " +
                    "creator text, " +
                    "endTime text, " +
                    "address text, " +
                    "tagList text, " +
                    "description text, " +
                    "title text)");
            },
            (error) => console.log("meeting :" + error),
            () => {
                console.log('meeting complete');
            }
        );
    }

    insertMeetingId(uid,dataSource){
        let data = dataSource.data(),
            title = data.title,
            meetingId = dataSource.id,
            description = data.description,
            tag = JSON.stringify(data.tagList),
            place = data.place.name,
            endTime = data.endTime.toString(),
            creator = data.creator;
        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO meeting"+uid+"(meetingId,creator,endTime,address,tagList,description,title) VALUES (?,?,?,?,?,?,?)",
                    [meetingId,creator,endTime,place,tag,description,title]);
            },
            (error) => console.log("meeting insert:" + error),
            null,
            () => {
                console.log('insert meeting complete');
            }
        );
    }

    //status -1带表自己发送的
    initChatTable(uid){
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
                    'timeStamp DATE DEFAULT (datetime(\'now\',\'localtime\'))' +
                    ');');
            },
            (error) => console.log("db insert:" + error),
            () => {
                console.log('db insert complete');
            }
        );
    }

    //type 1 ="privateChat"
    //type 2 ="groupChat"
    //status 1 = "response"
    // insertChatSql(uid,data,isSend){
    //     let type = data["type"],
    //         message = data["message"],
    //         from = data["from"],
    //         meetingId = "",
    //         userData = "",
    //         status = (isSend === undefined)?0:1;
    //     // if (status === 1){
    //     //     console.log("这里是发送啦");
    //     // }
    //     if (data["meetId"]!==undefined){
    //         meetingId = data["meetId"];
    //     }else if (data["activityId"]!==undefined){
    //         meetingId = data["activityId"];
    //     }
    //     if (data["meetUserData"]!==undefined){
    //         userData = data["meetUserData"];
    //     }
    //     if (data["userData"]!==undefined){
    //         userData = JSON.stringify(data["userData"]);
    //     }
    //     let sql = "INSERT INTO db"+uid+" (fromId,msg,status,type,meetingId,meetUserData,timeStamp) VALUES (?,?,?,?,?,?,?)",
    //         sqlParams = [from,message,status,type,meetingId,userData,moment().format()];
    //     if (meetingId!==""&&from===uid){
    //         sql = "INSERT INTO db"+uid+" (fromId,msg,status,type,meetingId,meetUserData,hasRead,timeStamp) VALUES (?,?,?,?,?,?,?,?)";
    //         sqlParams = [from,message,status,type,meetingId,userData,0,moment().format()];
    //     }
    //     console.log(sql , sqlParams);
    //     db.transaction(
    //         tx => {
    //             tx.executeSql(sql,sqlParams);
    //         },
    //         null,
    //         null
    //     );
    // }


    setNewFriendsRequestListener(userUid){
        let newFriendsRequestRef = firestoreDB().collection('Users').doc(userUid).collection('NewFriendsRequest');
        newFriendsRequestRef.where("read", "==", false)
            .onSnapshot(function(querySnapshot) {
                querySnapshot.forEach(async (doc) => {
                    let newFriendsRequest = doc.data();
                     console.log('setNewFriendsRequestListener', doc.id, doc.data());
                    await getUserDataFromDatabase(newFriendsRequest.responser,
                        (userData) => {
                            console.log('setNewFriendsRequestListener',userData);
                            insertNewFriendsRequest(this.state.userUid, newFriendsRequest, userData);
                            this.meRef.showBadge();
                        },
                        (error) => {});
                });

            });

    }

    getFriendRequestInfo(data){
        //data.msg 代表想说的话
        getUserData(data.requester).fork(
            (error) => {
                console.log(error);
            },
            (userData) => {
                //console.log(this.meRef);
                if (data.type === 0){
                    //data.requester 发送了好友请求
                    insertNewFriendsRequest(this.state.userUid, data, userData);
                    this.meRef.showBadge();
                }else if (data.type === -1){
                    //data.requester 拒绝了好友请求
                }else if (data.type === 1){
                    //data.requester 接受了好友请求
                }else if (data.type === 2){
                    //facebook自动确认了好友 好友id = data.requester
                }
            }
        );
    }

    // friendsListIsReady(){
    //     console.log('Root Navigator: friendsListIsReady');
    // }


  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}