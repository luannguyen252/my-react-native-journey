import Expo, { SQLite } from 'expo';
const db = SQLite.openDatabase('db.db');
import {
    DeviceEventEmitter
} from 'react-native';
import {getListTime} from './CommonUtility'
import moment from "moment/moment";

let uid,
    currentOnSelect,
    chatStackDataStore = [],
    personalInfo = {};

export const setUid = (id) => {
    uid = id;
};

export const setDataStore = (data) =>{
    chatStackDataStore = data;
    updateTotalUnReadNum();
};

export const updateTime = () => {
    for (let i = 0;i<chatStackDataStore.length;i++){
        chatStackDataStore[i].time = getListTime(chatStackDataStore[i].dateTime);
    }
};

export const currentOnSelectUser = (id) => {
    currentOnSelect = id
};

export const removeChat = (id) => {
        let arr = [];
        for (let i = 0;i<chatStackDataStore.length;i++){
            arr.push(chatStackDataStore[i].id);
        }
    let indexOf = arr.indexOf(id);
    if (indexOf !== -1){
        chatStackDataStore.splice(indexOf,1);
        updateTotalUnReadNum();
    }
    return chatStackDataStore
};

export const appendChatData = (dateTime,time,type,id,msg,hasRead) =>{
        let arr = [];
        for (let i = 0;i<chatStackDataStore.length;i++){
            arr.push(chatStackDataStore[i].id);
        }
        let indexOf = arr.indexOf(id);
        if (indexOf !== -1){
            let d = chatStackDataStore[indexOf];
            d.msg = msg;
            if (hasRead){
                d.length = d.length+1;
            }
            if (currentOnSelect === id){
                d.length = 0;
            }
            d.time = time;
            d.dateTime = dateTime;
            chatStackDataStore.splice(indexOf,1);
            chatStackDataStore.unshift(d);
        }else{
            //这里是新建
            let rtnData = {};
            if (type === 1|| type === 3){
                //私聊
                let data = personalInfo[id];
                let imageURL =  "http://larissayuan.com/home/img/prisma.png",
                    personName = "Tinko好友";
                if (data !== undefined){
                    imageURL =  (data[0]!==undefined)?data[0]:"http://larissayuan.com/home/img/prisma.png";
                    personName = (data[1]!==undefined)?data[1]:"Tinko好友";
                }else{
                    console.log("找不到头像");
                }
                rtnData = {
                    id:id,
                    type:1,
                    length:(hasRead)?1:0,
                    msg:msg,
                    time:time,
                    dateTime:dateTime,
                    imageURL:imageURL,
                    personName:personName
                };
                unReadNumNeedsUpdates(id,0);
            }else{
                //群聊
                rtnData = {
                    id:id,
                    type:2,
                    length:(hasRead)?1:0,
                    msg:msg,
                    time:time,
                    dateTime:dateTime,
                    imageURL:"http://larissayuan.com/home/img/prisma.png",
                    personName :id,
                };
                unReadNumNeedsUpdates(id,1);
            }
            chatStackDataStore.unshift(rtnData);
        }
        updateTotalUnReadNum();
        return chatStackDataStore;
};

export const updateTotalUnReadNum = () => {
    DeviceEventEmitter.emit('updateBadge',{
        num:getTotalUnReadNum()
    });
};

export const updateUserInfo = (data) => {
        let uid = data.uid;
        console.log("input data = ",data);
        console.log("the chatStackDataStore = ",chatStackDataStore);
        for (element in chatStackDataStore){
            let ele = chatStackDataStore[element];
            if (ele.id === uid){
                ele.imageURL = data.photoURL;
                ele.personName = data.username
            }
        }
        console.log(chatStackDataStore);
        return chatStackDataStore;
};

export const updateMeets = (data) => {
        let meetId = data.id;
        for (element in chatStackDataStore){
            let ele = chatStackDataStore[element];
            if (ele.id === meetId){
                ele.personName = data.name;
                ele.imageURL = data.photoURL;
            }
        }
        return chatStackDataStore;
};

export const getLength = (id) => {
        for (element in chatStackDataStore){
            let ele = chatStackDataStore[element];
            if (ele.id === id){
                console.log("ele.length:",ele.length);
                let eleLength = ele.length;
                chatStackDataStore[element].length = 0;
                return eleLength;
            }
        }
        //假设是一个新的聊天
        return 0;
};

export const getTotalUnReadNum = () => {
    let number = 0;
    for (element in chatStackDataStore){
        let ele = chatStackDataStore[element];
        number += chatStackDataStore[element].length;
    }
    return number;
};

export const updateLastMessage = (id,message) => {
    for (element in chatStackDataStore){
        let ele = chatStackDataStore[element];
        if (ele.id === id){
            chatStackDataStore[element].msg = message;
        }
    }
};


export const getData = () => {
    return chatStackDataStore;
};


//type = 1为私聊
//type = 2群聊
export const updateUnReadNum = (type,targetId) => {
    let updateSql = "";
    if (type === 1){
        updateSql = "update db"+uid+" set hasRead = 0 where hasRead = 1 and fromId = '" + targetId + "'"
    }else{
        updateSql = "update db"+uid+" set hasRead = 0 where hasRead = 1 and meetingId = '" + targetId + "'"
    }
    db.transaction(
        tx => {
            tx.executeSql(updateSql,[]
            );
        },
        (error) => console.log("update chat error :" + error),
        () => function () {
            console.log("update Success");
        }
    );
};

//1 group 0 private
export const unReadNumNeedsUpdates = (id,type) =>{
    DeviceEventEmitter.emit('updateUnReadNum',{
        id:id
    });
    DeviceEventEmitter.emit('avatarUpdate',{
        id:id,
        type:type
    });
    updateTotalUnReadNum();
};

export const insertChatSql = (uid,data,isSend) =>{
    console.log("哈哈哈哈 这里开始存储信息");
    let type = data["type"],
        message = data["message"],
        from = data["from"],
        meetingId = "",
        userData = "",
        status = (isSend === undefined)?0:1;
    if (data["meetId"]!==undefined){
        meetingId = data["meetId"];
    }else if (data["activityId"]!==undefined){
        meetingId = data["activityId"];
    }
    if (data["meetUserData"]!==undefined){
        userData = data["meetUserData"];
    }
    if (data["userData"]!==undefined){
        userData = JSON.stringify(data["userData"]);
    }
    let sql = "INSERT INTO db"+uid+" (fromId,msg,status,type,meetingId,meetUserData,timeStamp) VALUES (?,?,?,?,?,?,?)",
        sqlParams = [from,message,status,type,meetingId,userData,moment().format()];
    if (meetingId!==""&&from===uid){
        sql = "INSERT INTO db"+uid+" (fromId,msg,status,type,meetingId,meetUserData,hasRead,timeStamp) VALUES (?,?,?,?,?,?,?,?)";
        sqlParams = [from,message,status,type,meetingId,userData,0,moment().format()];
    }
    db.transaction(
        tx => {
            tx.executeSql(sql,sqlParams);
        },
        null,
        null
    );
};

export const initChatTable = (uid) =>{
    console.log("===========????????=================INIT CHAT TABLE==============")
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
};