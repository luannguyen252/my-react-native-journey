import {SQLite} from "expo";
import * as firebase from "firebase";
import {firestoreDB} from "./CommonUtility";
const db = SQLite.openDatabase('db.db');

require("firebase/firestore");

function getFriendList(uid) {
    return new Promise(resolve =>{
        db.transaction(                       
            tx => {
                tx.executeSql("SELECT userId FROM friend_list"+ uid + " WHERE isFriend = 1", [], (_, {rows}) => {
                    let dataArr = rows['_array'];
                    resolve(dataArr);
                })
            },
            (error) => console.log("get friendsList :" + error),
            () => {
                console.log('get friends complete');
            }
        );
    })
}

function requestUserData(uid,pid){
    return new Promise(resolve => {
        db.transaction(
            tx => {
                tx.executeSql("SELECT * FROM friend_list"+ uid + " WHERE userId = '"+ pid +"' LIMIT 1", [], (_, {rows}) => {
                    let dataArr = rows['_array'];
                    if (dataArr.length === 0){
                        //没有数据
                        getFromFireBase(pid).then(function (data) {
                            resolve(data);
                        })
                    }else{
                        resolve(dataArr);
                    }
                    console.log("给发送数据",dataArr);
                    resolve(dataArr);
                })
            },
            (error) => console.log("get friends :" + error),
            () => {
                console.log('get friends complete');
            }
        );
    });
}

function getFromFireBase(id) {
    let docRef = firestoreDB().collection("Users").doc(id);
    return new Promise(resolve => {
        let getDoc = docRef.get().then(
            doc =>{
                if (!doc.exists){
                    resolve([]);
                }else{
                    resolve(doc.data());
                }
            }
        ).catch(err => {
            resolve([]);
        })
    });

}

export function getUserDetail(uid,pid) {
    return requestUserData(uid,pid).then(user => user);
}

export function getFriends(uid) {
    return getFriendList(uid).then(friends => friends);
}