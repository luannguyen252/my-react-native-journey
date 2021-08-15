import React, {
    Component
} from 'react'
import {Text, Image, AsyncStorage, DeviceEventEmitter, Alert, TouchableOpacity, Dimensions} from 'react-native';
import {Button, Header, Avatar, Overlay, Input} from 'react-native-elements'
import {firestoreDB, getAvatarPlaceholder, getFromAsyncStorage, getPostRequest} from "../../../modules/CommonUtility";
import {getLength,updateUnReadNum} from "../../../modules/ChatStack";
import {sendFriendRequest} from "../../../modules/SocketClient";
import {CacheManager, Image as CacheImage} from "react-native-expo-image-cache";
import {ListItem} from 'react-native-elements';
import {
    View
} from 'react-native'
import firebase from "firebase";
import {Ionicons, Entypo} from '@expo/vector-icons'
import {SQLite} from "expo";

const db = SQLite.openDatabase('db.db');
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class UserDetailScreen extends Component{

    // static navigationOptions = ({ navigation }) => {
    //     const params = navigation.state.params || {};
    //
    //     return {
    //         headerLeft:(<Ionicons.Button
    //             name="ios-arrow-back" size={20} color="black" style={{marginLeft:26}} backgroundColor="transparent"
    //             onPress={() => navigation.goBack()}/>),
    //
    //         headerStyle:{ backgroundColor: 'white',}
    //     };
    // };
    static navigationOptions = {header:null}

    constructor(props){
        super(props);
        let user = firebase.auth().currentUser;
        this.showThisUser=this.showThisUser.bind(this);
        this.getThisUserDataAndSetStateRequestMessage=this.getThisUserDataAndSetStateRequestMessage.bind(this);
        props.onRef(this);
        this.state={
            userUid:user.uid,
            userData:{},
            isFriends:true,
            isVisible:false,
            navigation:null,
            updateMethod:null,
            requestMessage:'',
            loading:true,
            thisUserData:{},
            settingVisible:false
        };
    }

    componentDidMount(){

        //this.getUserDataFromFirebase();
    }


    showThisUser(uid, navigation, updateMethod){

        if(uid===this.state.userUid){
            getFromAsyncStorage('ThisUser').then((userData) => {
                if(userData) {
                    this.setState({thisUserData:userData, userData:userData, isFriends:true, loading:false});
                }
            });
        } else {
            this.getUserDataFromSql(uid);
        }
        this.setState({isVisible:true, navigation:navigation, updateMethod:updateMethod});
    }


    getUserDataFromSql(uid){

        db.transaction(
            tx => {
                tx.executeSql(`SELECT * FROM friend_list${this.state.userUid} WHERE userId = '${uid}'` , [], (_, { rows }) => {
                    console.log(rows);
                    let length = rows.length;
                    if(length===0){
                        this.getUserDataFromFirebase(uid);
                    } else {
                        let data = rows._array;
                        let userData = {
                            uid:data[0].userId,
                            photoURL:data[0].avatarUrl,
                            username:data[0].username,
                            location:data[0].location,
                            gender:data[0].gender,
                        };
                        let isFriends = data[0].isFriend === 1;

                        this.setState({
                            userData:userData,
                            //requestMessage:`I am ${this.state.thisUserData.username}`,
                            isFriends:isFriends,
                            loading:false,
                        });
                        this.getThisUserDataAndSetStateRequestMessage(isFriends);
                        this.getUserDataFromFirebase(uid, isFriends);
                    }
                });
            },
            (error) => {
                console.log(error);
                this.getUserDataFromFirebase(uid);
                this.getThisUserDataAndSetStateRequestMessage(false);
            },
            () => console.log('getUserDataFromSql')
        )
    }

    getUserDataFromFirebase(uid, isFriends=false){
        let firestoreDb = firestoreDB();
        var userRef = firestoreDb.collection("Users").doc(uid);
        userRef.get().then((userDoc) => {
            if (userDoc.exists) {
                //console.log("Document data:", userDoc.data());
                let user = userDoc.data();
                let userData = this.state.userData;
                if(userData.username===user.username && userData.photoURL === user.photoURL && userData.location === user.location && userData.gender === user.gender){

                } else {
                    this.setState({
                        userData:user,
                        //requestMessage:`I am ${user.username}`,
                        isFriends:isFriends,
                        loading:false,
                    });
                    //this.getThisUserDataAndSetStateRequestMessage(isFriends);
                    let callUpdateMethod = userData !== {};
                    if(callUpdateMethod){
                        this.state.updateMethod(user);
                    }
                    this.updateFriendSql(this.state.userUid, user, isFriends);
                }

            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    getThisUserDataAndSetStateRequestMessage(isFriends){
        if(!isFriends){
            getFromAsyncStorage('ThisUser').then((userData) => {
                if(userData) {
                    this.setState({thisUserData:userData,requestMessage:`I am ${userData.username}`});
                }
            });
        }
    }

    updateFriendSql(uid, userData, isFriends){
        let isFriend = isFriends ? 1 : 0;
        db.transaction(
            tx => {
                tx.executeSql(
                    'insert or replace into friend_list'+uid+' (userId,avatarUrl,username, location, gender, isFriend) values (?,?,?,?,?, ?)',
                    [userData.uid,userData.photoURL,userData.username,userData.location,userData.gender, isFriend]);
            }
            ,
            (error) => console.log("这里报错" + error),
            () => {
                console.log('updateFriendSql complete');
                // if(callUpdateMethod){
                //     //console.log(this.state.updateMethod);
                //     this.state.updateMethod();
                // }
            }
        );
    }

    sendNewFriendsRequest(responser, type, requestMessage){
        const { userUid } = this.state;
        let newFriendsRequestRef = firestoreDB().collection('Users').doc(responser).collection('NewFriendsRequest').doc(userUid);
        newFriendsRequestRef.set({
            requester:userUid,
            responser:responser,
            type:type,
            msg:requestMessage,
            timestamp:new Date().getTime(),
        }).catch((error) => Alert.alert('Error', error));
    }

    blockUser(){
        const { userUid, userData } = this.state;
        Alert.alert("Alert", `Are you sure to block ${userData.username}?`,
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => {
                    if(userUid!==userData.uid){
                        let bodyData = {requesterUid:userUid, objectUid:userData.uid};
                        getPostRequest('blockUser', bodyData,
                            () => {
                                this.setState({isVisible:false, userData:{}, settingVisible:false});
                            },
                            (error) => {
                                console.log(error);
                                Alert.alert('error', error);
                            });
                    }

                    }, style:"destructive"},
            ]);
    }

    render() {
        //console.log(this.props);
        const { thisUserData, userData, userUid, isFriends, isVisible, requestMessage, loading, settingVisible}  = this.state;
        console.log(thisUserData, userData);
        return (
            <Overlay
                height={SCREEN_WIDTH-80}
                borderRadius={25}
                isVisible={isVisible}
                onBackdropPress={()=>this.setState({isVisible:false, userData:{}, settingVisible:false})}
            >
                {loading ?
                    <View/>
                    :
                    <View>
                        <View
                            style={{width:'90%', marginLeft:'5%', marginTop:30, marginBottom:30, flexDirection:'row', justifyContent:'space-between'}}
                        >
                            <View style={{width:180}}>
                                <Text style={{fontFamily:'bold', fontSize:26}}>{userData.username}</Text>
                                <Text style={{fontFamily:'regular', fontSize:20}}>{userData.location}</Text>

                            </View>

                            <TouchableOpacity
                                onPress={()=>this.props.showAvatarDisplay(userData.photoURL)}
                            >
                                <CacheImage
                                    style={{width:75, height:75, borderRadius:75/2}}
                                    preview={getAvatarPlaceholder}
                                    uri={userData.photoURL}
                                />
                            </TouchableOpacity>

                        </View>

                        {isFriends?
                            <Button
                                containerStyle={{marginTop:30}}
                                title='Message'
                                onPress={() => {
                                    getLength(this.state.userData.uid);
                                    DeviceEventEmitter.emit('updateCurrentOnSelectUser',{
                                        id:this.state.userData.uid
                                    });
                                    updateUnReadNum(1,this.state.userData.uid);
                                    this.state.navigation.navigate('PrivateChatPage', {
                                        avatar: userData.photoURL,
                                        name:userData.username,
                                        personId:userData.uid,
                                        myId:userUid
                                    });
                                    this.setState({isVisible:false, userData:{}})
                                }}
                            />
                            :
                            <View>
                                <Input
                                    placeholder={`I am ${thisUserData.username}`}
                                    onChangeText={(requestMessage) => this.setState({requestMessage})}
                                    value={requestMessage}
                                />
                                <Button
                                    containerStyle={{marginTop:10}}
                                    title='Add Friend'
                                    onPress={() => {
                                        this.sendNewFriendsRequest(userData.uid,0,requestMessage);
                                        //sendFriendRequest(userUid, userData.uid, 0, requestMessage);
                                        this.setState({isVisible:false, userData:{}});
                                    }}
                                />
                            </View>
                        }
                    <Entypo
                        name={'dots-three-horizontal'}
                        size={25}
                        color={'black'}
                        style={{position:'absolute', top:SCREEN_WIDTH-120, right:20}}
                        onPress={()=>this.setState({settingVisible:true})}
                    />
                    </View>
                }
                <Overlay
                    height={SCREEN_WIDTH-80}
                    borderRadius={25}
                    isVisible={settingVisible}
                    windowBackgroundColor={'transparent'}
                    containerStyle={{width:SCREEN_WIDTH-80, height:SCREEN_WIDTH-80}}
                    overlayStyle={{top:0, left:0}}
                    //onBackdropPress={()=>this.setState({isVisible:false, userData:{}})}
                >
                    <View>
                        <ListItem
                            title='Block'
                            titleStyle={{fontFamily:'regular', fontSize:20,}}
                            onPress={()=>this.blockUser()}
                        />
                        <ListItem
                            title='Cancel'
                            titleStyle={{fontFamily:'regular', fontSize:17,}}
                            onPress={()=>this.setState({settingVisible:false})}
                        />
                    </View>
                </Overlay>
            </Overlay>
        )
    }
}
