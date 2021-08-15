import Task from 'data.task';
import firebase from "firebase";
import 'firebase/firestore';
import moment from 'moment';
import {Alert, AsyncStorage} from "react-native";
import {getUserDataFromSql, insertFriendSql, getMeetTitleFromSql} from "./SqliteClient";


export const currentUserUid = () => {
    if(firebase){
        return firebase.auth().currentUser.uid;
    }
};

export const firestoreDB = () => {
    if(firebase){
        const firestore = firebase.firestore();
        const settings = {timestampsInSnapshots:true};
        firestore.settings(settings);
        return firestore;
    }
};

export const writeInAsyncStorage = (code, data) => {
    let dataString = JSON.stringify(data);
    try {
        AsyncStorage.setItem(code+currentUserUid(), dataString);
    } catch (error) {
        // Error saving data
        console.log(error);
    }
};

export const getFromAsyncStorage = async (code) => {
    try {
        const value = await AsyncStorage.getItem(code + currentUserUid());
        if (value !== null){
            // We have data!!
            //console.log(value);
            let data = JSON.parse(value);
            return data;
        }
    } catch (error) {
        // Error retrieving data
        console.log(error);
        return {};
    }
}

export const getPostRequest = (code, bodyData, onComplete, onError) => {
    try {
        fetch(`https://us-central1-tinko-64673.cloudfunctions.net/${code}`, {
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        }).then ((response) => {
            //console.log(response);
            if(response.status === 200){
                onComplete(response);
            } else {
                onError("request Failed");
            }
        }).catch((error) => {
            //console.log(error);
            //Alert.alert('Error ' + error);
            onError(error);
        });

    }catch (e) {
        console.log(e)
    }
};

export const getUserData = (userUid) => {
    return new Task((reject, resolve) => {
        let firestoreDb = firestoreDB();
        var userRef = firestoreDb.collection("Users").doc(userUid);
        userRef.get().then((userDoc) => {
            if (userDoc.exists) {
                //console.log("Document data:", userDoc.data());
                let user = userDoc.data();
                resolve({
                    username: user.username,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    location:user.location,
                    gender:user.gender,
                });
            } else {
                console.log("No such document!");
                reject(error);
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            reject(error);
        });
    });
};

export const getUserDataFromFirebase = async (userUid, onComplete, onError) => {
    let firestoreDb = firestoreDB();
    var userRef = firestoreDb.collection("Users").doc(userUid);
    await userRef.get().then((userDoc) => {
        if (userDoc.exists) {
            //console.log("Document data:", userDoc.data());
            let user = userDoc.data();
            onComplete({
                username: user.username,
                photoURL: user.photoURL,
                uid: user.uid,
                location:user.location,
                gender:user.gender,
            });
        } else {
            console.log("No such document!");
            onError(error);
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
        onError(error);
    });
};





export const getUserDataFromDatabase = async (uid, onComplete, onError) => {
    if(uid === currentUserUid()){
        let userData = await getFromAsyncStorage('ThisUser');
        if(userData !== {} && userData){
            console.log('user is theuser, get data from async storage'+userData.username);
            onComplete(userData);
        } else {
            await getUserDataFromFirebase(uid,
                (userData) => {
                    console.log('user is theuser, get data from firebase'+userData.username);
                    onComplete(userData);
                    writeInAsyncStorage('ThisUser', userData);
                },
                (error) => {
                    onError(error);
                })
        }
    } else {
        await getUserDataFromSql(uid)
            .then((userData) => onComplete(userData))
            .catch(async () => {
                await getUserDataFromFirebase(uid,
                    (userData) => {
                        console.log('user isnt the user, get data from firebase'+userData.username);
                        onComplete(userData);
                        insertFriendSql(userData);
                    },
                    (error) => {
                        onError(error);
                    })
            })

    }

};


export const getMeetInfo = async (meetId, onComplete, onError) => {
    await getMeetTitleFromSql(meetId)
        .then((meetInfo) => {
            onComplete(meetInfo.title, meetInfo.tagName, meetInfo.coverImageUri);
        })
        .catch(async () => {
            let docRef = firestoreDB().collection("Meets").doc(meetId);
            await docRef.get().then(
                doc =>{
                    if (!doc.exists){
                        console.log("no data");
                        onError('no data');
                    }else{
                        let meet = doc.data();
                        let title = meet.title;
                        let tagsList = meet.tagsList;
                        let tagName;
                        if(tagsList){
                            tagName=tagsList[0];
                        } else{
                            tagName = 'default';
                        }
                        let userUploadedImages = meet.userUploadedImages;
                        let coverImageUri = null;
                        if(userUploadedImages && userUploadedImages.length>0){
                            coverImageUri = userUploadedImages[0];
                        }else if(meet.placeCoverPhotoReference && meet.placeCoverPhotoReference!==''){
                            coverImageUri = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${100}&photoreference=${meet.placeCoverPhotoReference}&key=AIzaSyCw_VwOF6hmY5yri8OpqOr9sCzTTT7JKiU`;
                        }
                        //console.log('come from firebase', title, tagName);
                        onComplete(title, tagName, coverImageUri);
                    }
                }
            ).catch(err => {
                console.log("ERROR: ",err);
                onError(err);
            })
        })
};

export const getStartTimeString = (startTime) => {
    if(typeof(startTime)==='string'){
        startTime = new Date(startTime);
    }
    //console.log('--------------------------------',startTime, typeof(startTime));
    let year = startTime.getFullYear();
    let month = startTime.getMonth() + 1;
    let day = startTime.getDate();
    let hour = startTime.getHours();
    let min = ("0" + startTime.getMinutes()).slice(-2);

    let now = new Date();
    let nowYear = now.getFullYear(),
        nowMonth = now.getMonth()+1,
        nowDay = now.getDate();
    if(year===nowYear && month===nowMonth && day===nowDay){
        return `Today ${hour}:${min}`
    } else if(year===nowYear && month===nowMonth && day===nowDay+1){
        return `TMW ${hour}:${min}`
    } else {
        var monthString;
        switch(month){
            case 1:
                monthString='Jan';
                break;
            case 2:
                monthString='Feb';
                break;
            case 3:
                monthString='Mar';
                break;
            case 4:
                monthString='Apr';
                break;
            case 5:
                monthString='May';
                break;
            case 6:
                monthString='June';
                break;
            case 7:
                monthString='July';
                break;
            case 8:
                monthString='Aug';
                break;
            case 9:
                monthString='Sep';
                break;
            case 10:
                monthString='Aug';
                break;
            case 11:
                monthString='Nov';
                break;
            case 12:
                monthString='Dec';
                break;
            default:
                monthString='JAN';
                break;
        }
        return `${monthString} ${day}  ${hour}:${min}`
    }
};

export const getPostTimeString = (postTime) => {
    //console.log(postTime);
    let postTimeTS = postTime.getTime();
    let nowTS = new Date().getTime();
    let dif = nowTS - postTimeTS;
    if(dif < 60*1000){
        return "Just now";
    } else if (dif < 2*60*1000){
        return "1 min ago"
    } else if (dif < 60*60*1000){
        return `${Math.round(dif/(60*1000))} mins ago`;
    } else if (dif < 2*60*60*1000){
        return "1 hour ago"
    } else if (dif < 24*60*60*1000){
        return `${Math.round(dif/(60*60*1000))} hours ago`;
    } else if (dif < 48*60*60*1000){
        return "Yesterday";
    } else {
        return `${Math.round(dif/(24*60*60*1000))} days ago`;
    }
};

export const logoutFromNotification = (uid) => {
    try{
        fetch('https://gotinko.com/logout', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: uid
            }),
        });
    }catch (e) {
        console.log(e);
    }
};

export const getListTime = (time) => {
    if (moment(time).isSame(moment(), 'day')){
        return moment(time).format("HH:mm");
    }else if (moment(time).isSame(moment(), 'week')){
        return moment(time).format("ddd");
    }else{
        return moment(time).format("MM/DD/YYYY");
    }
};

export const getCurrentTime = () => {
    let today = moment();
    return today.format("HH:mm");
};


export const getListWhoParticipatedInMeetsByMeetId = (meetId) => {
    try{
        fetch('https://gotinko.com/getListWhoParticipatedInMeetsByMeetId', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                meetId: meetId
            }),
        }).then((response) => console.log(response));
    }catch (e) {
        console.log(e);
    }
};

export const updateDeviceId = (userId,deviceId) => {
    console.log("准备发送devideId:",deviceId," userId:",userId);
    try{
        fetch('https://gotinko.com/getDeviceId', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceId:deviceId,
                userId:userId
            }),
        }).then((response) => console.log(response));
    }catch (e) {
        console.log(e);
    }
};

export const getDurationString = (duration) => {
    if(duration>2*24*60*60*1000){
        return `${Math.round(duration/(24*60*60*1000))} days`;
    } else if(duration > 24*60*60*1000){
        return "1 day";
    } else if (duration > 2*60*60*1000){
        return `${Math.round(duration/(60*60*1000))} hours`;
    } else if (duration > 60*60*1000){
        return "1 hour";
    } else if (duration > 2*60*1000){
        return `${Math.round(duration/(60*1000))} mins`;
    } else{
        return "1 min";
    }
};


export const getImageSource = (tagName) => {
    switch(tagName){
        case "#party":
            return require('../assets/images/tagsTheme/StaindGlass.jpg');
        case "#sports":
            return require('../assets/images/tagsTheme/sports.jpg');
        case "#food":
            return require('../assets/images/tagsTheme/food.png');
        case "#shopping":
            return require('../assets/images/tagsTheme/shopping.jpg');
        case "#movie":
            return require('../assets/images/tagsTheme/cinema.jpg');
        case "#bar":
            return require('../assets/images/tagsTheme/bar.jpg');
        case "#travel":
            return require('../assets/images/tagsTheme/travel.jpg');
        case "#study":
            return require('../assets/images/tagsTheme/leaves.jpg');
        case "#esports":
            return require('../assets/images/tagsTheme/esports.jpg');
        default:
            return require('../assets/images/tagsTheme/StaindGlass.jpg');

    }
};

export const getMeetAvatarUri = (tagName) => {
    switch(tagName){
        case "#party":
            return 'https://firebasestorage.googleapis.com/v0/b/tinko-64673.appspot.com/o/System%2FMeetAvatar%2FStaindGlassavatar.jpg?alt=media&token=c0f51bf5-90f5-4139-abc8-f254af428a71';
        case "#sports":
            return 'https://firebasestorage.googleapis.com/v0/b/tinko-64673.appspot.com/o/System%2FMeetAvatar%2F6090864-sports-wallpaper.jpg?alt=media&token=4adde46c-bda4-4516-82ad-86b613224122';
        case "#food":
            return 'https://firebasestorage.googleapis.com/v0/b/tinko-64673.appspot.com/o/System%2FMeetAvatar%2Ffoodwallpaper.png?alt=media&token=b05b3699-f208-4848-a76c-3dc04438760f';
        case "#shopping":
            return 'https://firebasestorage.googleapis.com/v0/b/tinko-64673.appspot.com/o/System%2FMeetAvatar%2Fshoppingwallpaper.jpg?alt=media&token=4ca5b5dc-3c5f-45ee-859e-9d1f94575f46';
        case "#movie":
            return 'https://firebasestorage.googleapis.com/v0/b/tinko-64673.appspot.com/o/System%2FMeetAvatar%2Fcinemawallpaper.jpg?alt=media&token=8a8cf55f-c0a4-432a-86c7-3f4701c6a388';
        case "#bar":
            return 'https://firebasestorage.googleapis.com/v0/b/tinko-64673.appspot.com/o/System%2FMeetAvatar%2Fbarwallpaper.jpg?alt=media&token=857f1e5e-7b11-4ae2-acdd-6c17160177c0';
        case "#travel":
            return 'https://firebasestorage.googleapis.com/v0/b/tinko-64673.appspot.com/o/System%2FMeetAvatar%2Ftravelwallpaper.jpg?alt=media&token=25524a85-2e40-480b-8387-6e5e07eaaa17';
        case "#study":
            return 'https://firebasestorage.googleapis.com/v0/b/tinko-64673.appspot.com/o/System%2FMeetAvatar%2Fleavesavatar.jpg?alt=media&token=5b48042a-3cca-4349-9273-1b378c75eb3e';
        case "#esports":
            return 'https://firebasestorage.googleapis.com/v0/b/tinko-64673.appspot.com/o/System%2FMeetAvatar%2Fesportswallpaper.jpg?alt=media&token=8965ffc1-fd95-4fe1-9f77-64b24b9d7729';
        default:
            return 'https://firebasestorage.googleapis.com/v0/b/tinko-64673.appspot.com/o/System%2FMeetAvatar%2FStaindGlassavatar.jpg?alt=media&token=c0f51bf5-90f5-4139-abc8-f254af428a71';

    }
};


export const getTagName = (tagName) => {
    switch(tagName){
        case "#party":
            return 'Party';
        case "#sports":
            return 'Sports';
        case "#food":
            return 'Food';
        case "#shopping":
            return 'Shopping';
        case "#movie":
            return 'Movie';
        case "#bar":
            return 'Bar';
        case "#travel":
            return 'Travel';
        case "#study":
            return 'Study';
        case "#esports":
            return 'ESports';
        default:
            return 'Meet Me';

    }
};

export const getAvatarPlaceholder = () => {
    return require('../assets/images/avatar-placeholder.png');
};

export const getCoverImagePlaceholder = () => {
    return require('../assets/images/placeholder-big.jpg');
}