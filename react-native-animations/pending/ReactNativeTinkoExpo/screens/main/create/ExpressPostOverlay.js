import React, {
    Component
} from 'react'
import {
    Text, Image, AsyncStorage, DeviceEventEmitter, Platform, Alert, TouchableOpacity, ActivityIndicator,
    Dimensions
} from 'react-native';
import {Button, Header, Avatar, Overlay, Input} from 'react-native-elements'
import {firestoreDB, getMeetAvatarUri, getTagName} from "../../../modules/CommonUtility";
import {getLength,updateUnReadNum} from "../../../modules/ChatStack";
import {createMeet, sendFriendRequest} from "../../../modules/SocketClient";
import {Image as CacheImage} from 'react-native-expo-image-cache';

import {
    View
} from 'react-native'
import firebase from "firebase";
import {Ionicons} from '@expo/vector-icons'
import {Constants, Location, Permissions, SQLite} from "expo";

const db = SQLite.openDatabase('db.db');

const allTagsList = ['#party', '#sports', '#food', '#shopping', '#movie', '#bar', '#travel', '#study', '#esports'];
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class ExpressPostOverlay extends Component{

    static navigationOptions = {header:null};

    constructor(props){
        super(props);
        props.onRef(this);
        this.showExpressPostOverlay=this.showExpressPostOverlay.bind(this);
        let userUid = firebase.auth().currentUser.uid;
        this.state={
            userUid:userUid,
             isVisible:false,
            placeName:'',
            placeAddress:'',
            placeCoordinate:'',
            placeId:'',
            selectedFriendsList:[],
            activityIndicatorVisible:false,
        };

    }

    showExpressPostOverlay(){
        this.setState({isVisible:true})
    }

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            Alert.alert('Error', 'Permission to access location was denied')
        }

        let location = await Location.getCurrentPositionAsync({});
        //this.setState({ location });
        //console.log(this.state.location);
        //console.log(this.state.location.coords.latitude);
        await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&rankby=distance&key=AIzaSyCw_VwOF6hmY5yri8OpqOr9sCzTTT7JKiU`)
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson.results[0]);
                let myPlace = responseJson.results[0];
                let placeCoverPhotoReference = '';
                if(myPlace.photos && myPlace.photos[0].photo_reference){
                    placeCoverPhotoReference=myPlace.photos[0].photo_reference;
                }
                console.log('placeCoverPhotoReference', placeCoverPhotoReference);
                this.setState({placeName: myPlace.name,
                    placeAddress: myPlace.vicinity,
                    placeCoordinate: myPlace.geometry.location,
                    placeId: myPlace.place_id,
                    placeCoverPhotoReference:placeCoverPhotoReference,
                })
            }).catch((error) => {
            console.error(error);
        });
    };

    getSql(){
        return new Promise((resolve, reject) => {
            const { userUid } = this.state;
            db.transaction(
                tx => {
                    tx.executeSql('select * from friend_list'+userUid, [], (_, { rows }) => {
                        let dataArr =  rows['_array'],
                            rtnArr = [];
                        for (let i = 0; i <dataArr.length;i++){
                            rtnArr.push(dataArr[i].userId);
                        }
                        this.setState({ selectedFriendsList: rtnArr });
                        resolve(rtnArr);

                    });
                },
                (error) => {
                    console.log(error);
                    reject(error);
                },
                null
            )
        });
    }


    async createExpressMeet(tagName){
        this.setState({activityIndicatorVisible:true});
        await this.getLocationAsync();
        await this.getSql()
            .then((selectedFriendsList) => {
                this.postMeet(tagName);
            })
            .catch((error) => {
                Alert.alert('Error', error);
            });


    }

    postMeet(tagName){
        const{placeName, placeAddress, placeCoordinate, placeId, selectedFriendsList, userUid, placeCoverPhotoReference} = this.state;
        console.log(this.state);

        let tagsCategory={};
        tagsCategory[tagName]=true;

        let startTime = new Date();
        startTime.setTime((startTime.getTime()+10*60*1000));
        let durationTS = 3*60*60*1000;
        let endTime = new Date();
        endTime.setTime(startTime.getTime()+durationTS);

        let placeObj = {
            name: placeName,
            address: placeAddress,
            coordinate: placeCoordinate,
            placeId: placeId,
        };

        let statusTimeObj = {
            status: true,
            startTime: startTime,
            postTime: new Date(),
        };

        let participatingUsersListObj= {};
        participatingUsersListObj[userUid] = statusTimeObj;

        var selectedFriendsListObj = {};
        selectedFriendsListObj[userUid] = statusTimeObj;
        selectedFriendsList.map((l,i) => {
            selectedFriendsListObj[l] = statusTimeObj;
        });

        var docData = {
            title:getTagName(tagName)+', Right Here Right Now!',
            creator: userUid,
            tagsList:[tagName],
            tagsCategory: tagsCategory,
            startTime: startTime,
            postTime:new Date(),
            endTime: endTime,
            duration: durationTS,
            allFriends: true,
            allowPeopleNearby: true,
            allowParticipantsInvite: true,
            maxNo: 1,
            description: '',
            place: placeObj,
            placeCoverPhotoReference:placeCoverPhotoReference,
            participatingUsersList: participatingUsersListObj,
            participatingUsersArray:[userUid],
            selectedFriendsList: selectedFriendsListObj,
            status: true,
        };

        firestoreDB().collection("Meets").add(docData)
            .then((meetRef) => {
                console.log("Document written with ID: ", meetRef.id);
                createMeet(userUid, meetRef.id);
                this.props.tinkoGetMeets();
                this.setState({activityIndicatorVisible:false,isVisible:false})
            })
            .catch((error) => {
                console.log("Error adding document: ", error);
                this.setState({activityIndicatorVisible:false});
                Alert.alert('Error', error);
            });


    }

    render() {
        const {isVisible, activityIndicatorVisible} = this.state;
        return (
            <Overlay
                height={350}
                borderRadius={25}
                isVisible={isVisible}
                overlayBackgroundColor='rgba(255, 255, 255, 0.9)'
                onBackdropPress={()=>this.setState({isVisible:false})}
            >

                <View>
                    {_.chunk(allTagsList, 3).map((chunk, chunkIndex) => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }} key={chunkIndex}>
                            {chunk.map(tagName => (
                                <TouchableOpacity
                                    onPress={() => this.createExpressMeet(tagName)}
                                    key={tagName}
                                    style = {{width:75}}>
                                    <CacheImage
                                        style={{width:75, height:75, borderRadius:75/2}}
                                        uri={getMeetAvatarUri(tagName)}
                                    />
                                    {/*<Avatar*/}
                                        {/*size='large'*/}
                                        {/*rounded*/}
                                        {/*source={{ uri: getMeetAvatarUri(tagName) }}*/}
                                        {/*title='TK'*/}
                                    {/*/>*/}
                                    <Text
                                        style={{marginTop:3,color:'#626567', textAlign: 'center'}}
                                    >{tagName}</Text>
                                </TouchableOpacity>

                            ))}
                        </View>
                    ))}
                    {activityIndicatorVisible &&
                    <ActivityIndicator style={{position:'absolute', marginTop:'50%', marginLeft:SCREEN_WIDTH/2-60}} size='large' color = '#0000ff'/>
                    }
                </View>
            </Overlay>

        )
    }
}
