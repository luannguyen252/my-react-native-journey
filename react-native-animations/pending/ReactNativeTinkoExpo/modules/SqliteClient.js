//import db from './SqliteDB';
import {SQLite} from "expo";
import Task from "data.task";
import {currentUserUid} from "./CommonUtility";
const db = SQLite.openDatabase('db.db');

export const initNewFriendsRequestTable = (uid) => {
    db.transaction(
        tx => {
            tx.executeSql('create table if not exists new_friends_request'+ uid +' (' +
                'id integer primary key not null , ' +
                'requesterUid text UNIQUE, ' +
                'username text, ' +
                'photoURL text, ' +
                'type int,' +
                'timestamp int,' +
                'msg text);');
        },
        (error) => console.log("new_friends_request :" + error),
        () => {
            console.log('new_friends_request complete');
        }
    );
};


export const insertNewFriendsRequest = (uid, data, userData) => {
    const {requester, type, timestamp, msg} = data;
    db.transaction(
        tx => {
            tx.executeSql(
                'insert or replace into new_friends_request'+uid+' (requesterUid,type,timestamp, msg, username, photoURL) values (?,?,?,?,?,?)',
                [requester, type, timestamp, msg, userData.username,userData.photoURL]);
        }
        ,
        (error) => console.log("new_friends_request" + error),
        () => {
            console.log('insertNewFriendsRequest complete');
        }
    );
};

export const getNewFriendsRequest = (uid) => {
    return new Task((reject, resolve) => {
        //console.log('getNewFriendsrequest');
        db.transaction(
            tx => {
                tx.executeSql(`SELECT * FROM new_friends_request${uid} ORDER BY timestamp DESC`, [], (_, { rows }) => {
                    let dataArr =  rows['_array'];
                    //console.log(dataArr);
                    resolve(dataArr);
                });
            },
            (error) => reject(error),
            null
        )
    });
};

export const updateNewFriendsRequestType = (uid, id) => {
    return new Task((reject, resolve) => {
        //console.log('getNewFriendsrequest');
        db.transaction(
            tx => {
                tx.executeSql(`UPDATE new_friends_request${uid} SET type = 1 WHERE id = ${id}`);
            },
            (error) => reject(error),
            () => resolve()
        )
    });
};

export const insertFriendSql = (userData) => {
    db.transaction(
        tx => {
            tx.executeSql(
                'insert or replace into friend_list'+currentUserUid()+' (userId,avatarUrl,username, location, gender) values (?,?,?,?,?)',
                [userData.uid,userData.photoURL,userData.username,userData.location,userData.gender]);
        }
        ,
        (error) => console.log("insertFriendSql" + error),
        // () => {
        //     console.log('insertFriendSql complete');
        // }
    );
};



export const getUserDataFromSql = async (uid) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql(`SELECT * FROM friend_list${currentUserUid()} WHERE userId = '${uid}'`, [], (_, {rows}) => {
                    //console.log(rows);
                    let length = rows.length;
                    if (length === 0) {
                        reject();
                    } else {
                        let data = rows._array;
                        let userData = {
                            uid: data[0].userId,
                            photoURL: data[0].avatarUrl,
                            username: data[0].username,
                            location: data[0].location,
                            gender: data[0].gender,
                        };
                        resolve(userData);
                    }
                });
            },
            (error) => {
                console.log(error);
                reject();
            },
            //() => console.log('getUserDataFromSql')
        )
    });
};


export const getMeetTitleFromSql = async (meetId) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql(`SELECT * FROM meet${currentUserUid()} WHERE meetId = '${meetId}'`, [], (_, {rows}) => {
                    //console.log(rows);
                    let length = rows.length;
                    if (length === 0) {
                        reject();
                    } else {
                        let data = rows._array;
                        let meetDataString = data[0].meetData;
                        let meetData = JSON.parse(meetDataString);
                        //console.log('getMeetTitleFromSql, data, ', data);
                        if(Object.keys(meetData).length !== 0){
                            let tagsList = meetData.tagsList;
                            let tagName;
                            if(tagsList){
                                tagName = tagsList[0];
                            } else {
                                tagName='default';
                            }
                            let userUploadedImages = meetData.userUploadedImages;
                            let coverImageUri = null;
                            if(userUploadedImages && userUploadedImages.length>0){
                                coverImageUri = userUploadedImages[0];
                            }else if(meetData.placeCoverPhotoReference && meetData.placeCoverPhotoReference!==''){
                                coverImageUri = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${100}&photoreference=${meetData.placeCoverPhotoReference}&key=AIzaSyCw_VwOF6hmY5yri8OpqOr9sCzTTT7JKiU`;
                            }
                            //console.log('getMeetTitleFromSql, ', meetData.title, tagName);
                            resolve({
                                title:meetData.title,
                                tagName:tagName,
                                coverImageUri:coverImageUri
                            })
                        }else{
                            console.log('getMeetTitleFromSql data === {}');
                            reject();
                        }

                    }
                });
            },
            (error) => {
                console.log(error);
                reject();
            },
            //() => console.log('getUserDataFromSql')
        )
    });
};


