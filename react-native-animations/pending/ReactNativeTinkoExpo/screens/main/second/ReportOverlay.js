import React, {
    Component
} from 'react'
import {
    Text, Image, AsyncStorage, DeviceEventEmitter, Platform, Alert, TouchableOpacity, ActivityIndicator,
    Dimensions
} from 'react-native';
import {Button, Header, Avatar, Overlay, Input} from 'react-native-elements';
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
        this.showReportOverlay=this.showReportOverlay.bind(this);
        let userUid = firebase.auth().currentUser.uid;
        this.state={
            userUid:userUid,
            isVisible:false
        };

    }

    showReportOverlay(){
        this.setState({isVisible:true})
    }






    render() {
        const {isVisible} = this.state;
        return (
            <Overlay
                height={600}
                borderRadius={8}
                isVisible={isVisible}
                overlayBackgroundColor='rgba(255, 255, 255, 1.0)'
                onBackdropPress={()=>this.setState({isVisible:false})}
            >

                <View>
                    <Text
                        style={{marginTop:30,fontSize:35}}
                    >REPORT</Text>
                </View>
            </Overlay>

        )
    }
}
