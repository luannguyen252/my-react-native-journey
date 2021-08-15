import firebase from 'react-native-firebase'
import { AsyncStorage } from 'react-native'
import config, { printLog } from '../config' 

export const registerUser = (result) => {

    return new Promise((resolve) => {
        firebase.database().ref().child(config.constants.registerFirePath + result.id).set(result, (response) => {
            resolve(response)
        });
    });
}

export const uploadUserReactionImage = (reaction) => {
    return new Promise((resolve) => {

        printLog(reaction)

        // let filePath = reaction.reactionId + "/" + reaction.reactionConfig.fileName
        let filePath = config.constants.uploadFirePath + reaction.reactionConfig.fileName + "_" + new Date().toLocaleString()
        uploadfile = reaction.reactionConfig.path

        // Create the file metadata
        // var metadata = {
        //     contentType: 'image/jpeg'
        // };

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = firebase.storage().ref().child(filePath).put(uploadfile);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                printLog('Upload is ' + progress + '% done')
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        printLog('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        printLog('Upload is running');
                        break;
                }
            }, function (error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            }, function (snapshot) {
                // Upload completed successfully, now we can get the download URL
                snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    printLog('File available at ' + downloadURL);
                    if (downloadURL != null) {
                        reaction.reactionImage = downloadURL
                        reaction.reactionConfig = ""
                        resolve(reaction)
                    }
                });
            });
    });
}

export const saveUserReaction = (reaction) => {
    return new Promise((resolve) => {
        firebase.database().ref().child(config.constants.reactionFirePath).push().
            set(reaction, (response) => {
                resolve(response)
            })
    });
}

export const getUserReaction = () => {

    var listReactions = []

    return new Promise((resolve) => {
        var reactionRef = firebase.database().ref().child(config.constants.reactionFirePath);
        reactionRef.on("value", (childSnapshot) => {
            listReactions = parseFirebaseResponse(childSnapshot, listReactions, false, "")
            resolve(listReactions)
        });

        // reactionRef.on("child_added", (data) => {
        //     printLog("child_added = " + JSON.stringify(data))
        //     resolve(data)
        // });

        // reactionRef.on('child_changed', function (data) {
        //     printLog("child_changed = " + JSON.stringify(data))
        //     resolve(data)
        // });
        
        // reactionRef.on('child_removed', function (data) {
        //     printLog("child_removed = " + JSON.stringify(data))
        //     resolve(data)
        // });
    });
}

export const getUserSpecificReaction = (result) => {

    var listReactions = []

    return new Promise((resolve) => {
        var reactionRef = firebase.database().ref().child(config.constants.reactionFirePath);
        reactionRef.on("value", (childSnapshot) => {
            printLog(childSnapshot)
            listReactions = parseFirebaseResponse(childSnapshot, listReactions, true, result.id)
            resolve(listReactions)
        });
    });
}

export const parseFirebaseResponse = (childSnapshot, listReactions, isAdminUser, userid) => {
    var listReactions = []

    if (isAdminUser) {

        childSnapshot.forEach((child) => {
            if (userid == child.val().reactionId) {
                var reactionData = {
                    rowid: child.key,
                    reactionId: child.val().reactionId,
                    reactionName: child.val().reactionName,
                    reactionImage: child.val().reactionImage,
                    reactionMsg: child.val().reactionMsg,
                    reactionLikes: child.val().reactionLikes,
                    reactionDate: child.val().reactionDate == undefined ? "" : child.val().reactionDate,
                    likeOwner: child.val().likeOwner,
                }   
                listReactions.push(reactionData);
            }
        });
    } else {
        childSnapshot.forEach((childSnapshot) => {
            var reactionData = {
                rowid: childSnapshot.key,
                reactionId: childSnapshot.val().reactionId,
                reactionName: childSnapshot.val().reactionName,
                reactionImage: childSnapshot.val().reactionImage,
                reactionMsg: childSnapshot.val().reactionMsg,
                reactionLikes: childSnapshot.val().reactionLikes,
                reactionDate: childSnapshot.val().reactionDate == undefined ? "" : childSnapshot.val().reactionDate,
                likeOwner: childSnapshot.val().likeOwner,
            }
            listReactions.push(reactionData);
        }); 
    }
    return listReactions
}

export const sendUserLikeToFirebase = (postid, likeCount, isOwner) => {

    return new Promise((resolve) => {
        var reactionRef = firebase.database().ref().child(config.constants.reactionFirePath + "/" + postid);
        reactionRef.once('value', function (child) { 

            reactionRef.update({ reactionLikes: likeCount , likeOwner : isOwner}, (child) => {
                resolve(likeCount)
            });
        });
    });
}