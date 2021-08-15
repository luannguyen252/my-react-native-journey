import _ from 'lodash';
import React from 'react';
import {
    View,
    Alert,
    TouchableWithoutFeedback,
    Image,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    InteractionManager,
    BackHandler,
    ActivityIndicator,
    Share
} from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import Swiper from 'react-native-swiper';
import {
    getStartTimeString,
    getDurationString,
    getUserData,
    getImageSource,
    getUserDataFromDatabase,
    firestoreDB,
    getAvatarPlaceholder,
    getCoverImagePlaceholder
} from "../../../modules/CommonUtility";
import {MapView, SQLite} from 'expo';
import { Ionicons, MaterialIcons, Entypo, MaterialCommunityIcons, Feather  } from '@expo/vector-icons';
import { Avatar, Button, Header, Overlay} from 'react-native-elements';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { getPostRequest,getListWhoParticipatedInMeetsByMeetId } from "../../../modules/CommonUtility";
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';
import SocketIOClient from "socket.io-client";
import {quitMeet,joinMeet,dismissMeet} from "../../../modules/SocketClient";
import { NavigationActions } from 'react-navigation';
import {CacheManager, Image as CacheImage} from "react-native-expo-image-cache";
import ReportOverlay from '../second/ReportOverlay';

const db = SQLite.openDatabase('db.db');

const SCREEN_WIDTH = Dimensions.get('window').width;

@connectActionSheet
export default class TinkoDetailScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        const { allowParticipantsInvite, identity, threeDots } = params;

        return {
            headerLeft:(<Ionicons.Button
                name="ios-arrow-back" size={20} color="white" style={{marginLeft:26}} backgroundColor="transparent"
                onPress={() => navigation.goBack(null)}/>),
            headerRight:(
                <View style={{flexDirection:'row'}}>

                    {/*{(allowParticipantsInvite || identity===1) &&*/}
                    {/*<Entypo.Button*/}
                        {/*name="share-alternative" size={20} color="white" backgroundColor="transparent"*/}
                        {/*onPress = {() => console.log('share')}/>*/}
                    {/*}*/}

                    {/*{identity===3 &&*/}
                    {/*<Entypo.Button*/}
                        {/*name="add-user" size={20} color="white" backgroundColor="transparent"*/}
                        {/*onPress = {() => console.log('invite')}/>*/}
                    {/*}*/}

                    <Entypo.Button
                        name="dots-three-vertical" size={20} color="white" style={{marginRight:26}} backgroundColor="transparent"
                        onPress = {threeDots}/>
                </View>
                ),
            headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0, borderBottomWidth: 0,borderBottomColor: 'transparent',elevation:0},
        };
    };

    constructor(props){
        super(props);
        console.log(props);
        console.log('called from constructor');
        let user = firebase.auth().currentUser;
        this.onJoinButtonPressed = this.onJoinButtonPressed.bind(this);
        this.renderActivityBar = this.renderActivityBar.bind(this);
        this.state={
            meet:{},
            userUid:user.uid,
            meetId: this.props.navigation.state.params.meetId,
            allFriends: false,
            allowParticipantsInvite:false,
            allowPeopleNearby:false,
            creatorUid:'',
            description:'',
            duration:1,
            endTime:null,
            maxNo:0,
            participatingUsersList:[],
            placeAddress:'',
            placeName:'',
            placeCoordinate:{
                lat:0,
                lng:0,
            },
            placeId:'',
            postTime:null,
            selectedFriendsList:[],
            startTime:new Date(),
            status:false,
            tagsList:[],
            title:'',
            creatorData:{},
            placePhotos:[],
            participatingUsersData:[],
            creatorLoadingDone:false,
            placePhotosLoadingDone:false,
            usersDataLoadingDone:false,
            buttonShowLoading:false,
            unsubscribe:null,
            identity:1,
            showMap:false,
            quit:false,
            dismissed:false,
            loadingVisible:false,
            userUploadedImages:[],
            userImagesLoadingDone:false,
            swiperImages:[],
            //identity: 0: not joined
            //          1: creator
            //          2: joined cannot invite
            //          3: joined can invite
        };
    }

    setNavigationParams(){
        const{allowParticipantsInvite, identity} = this.state;
        this.props.navigation.setParams({allowParticipantsInvite:allowParticipantsInvite, identity:identity});
    }

    componentDidMount(){
        console.log('componentDidMount called');
        this.getMeetDataFromSql();
        this.setMeetDataListener();
        this.props.navigation.setParams({threeDots:this.onOpenThreeDotsActionSheet.bind(this)});
        this.setNavigationParams();
        // this.timer = TimerMixin.setTimeout(() => {
        //     this.setState({ showMap: true });
        // }, 250);
        InteractionManager.runAfterInteractions(() => {
            this.setState({showMap:true});
        });
        BackHandler.addEventListener('androidBackPress', this.androidBackHandler.bind(this));
    }


    componentWillUnmount(){
        this.unsubscribe();
        this.updateMeetDataToSql();
        BackHandler.removeEventListener('androidBackPress', this.androidBackHandler.bind(this));
    }

    androidBackHandler(){
        if(this.props.navigation.state.routeName==='TinkoDetail'){
            this.props.navigation.goBack(null);
            return true;
        }
        return false;
    }

    updateMeetDataToSql(){
        const { meetId, meet, creatorData, placePhotos, participatingUsersData } = this.state;
        //console.log(this.state);
        let meetDataString = JSON.stringify(meet);
        let creatorDataString = JSON.stringify(creatorData);
        let placePhotosDataString = JSON.stringify(placePhotos);
        let participatingUsersDataString = JSON.stringify(participatingUsersData);
        //console.log('updateMeetDataToSql', meetDataString, creatorDataString, placePhotosDataString, participatingUsersDataString);
        db.transaction(
            tx => {
                tx.executeSql(
                    `INSERT OR REPLACE INTO meet${this.state.userUid} (meetId, meetData,creatorData,placePhotoData, participatingUsersData) 
                        VALUES (?,?,?,?,?)`,
                    [meetId, meetDataString, creatorDataString, placePhotosDataString, participatingUsersDataString]);
            }
            ,
            (error) => console.log("updateMeetData" + error),
            () => console.log('updateMeetData complete')
        );
    }

    getMeetDataFromSql(){
        const{userUid, meetId} = this.state;
        getListWhoParticipatedInMeetsByMeetId(meetId);
        db.transaction(
            tx => {
                tx.executeSql(`select * from meet${userUid} WHERE meetId = '${meetId}'`, [], (_, { rows }) => {
                    let data =  rows['_array'];
                    console.log('sqlite meetData', data);
                    if(data.length > 0){
                        let meetDataString = data[0].meetData;
                        let meet = JSON.parse(meetDataString);
                        console.log('meet',meet);

                        let userUploadedImages = meet.userUploadedImages;
                        if(!userUploadedImages){
                            userUploadedImages=[];
                        }
                        this.setState({userUploadedImages, userImagesLoadingDone:true});

                        let creatorDataString = data[0].creatorData;
                        let placePhotoDataString = data[0].placePhotoData;
                        let participatingUsersDataString = data[0].participatingUsersData;


                        if(creatorDataString){
                            let creatorData = JSON.parse(creatorDataString);
                            this.setState({creatorData:creatorData, creatorLoadingDone:true});
                        }

                        if(placePhotoDataString){
                            let placePhotoData = JSON.parse(placePhotoDataString);
                            this.setState({placePhotos: placePhotoData, placePhotosLoadingDone: true});
                        }

                        if(participatingUsersDataString){
                            let participatingUsersData = JSON.parse(participatingUsersDataString);
                            this.setState({participatingUsersData});
                        }

                        this.processMeet(meet, false);
                    }else {
                        console.log('No this meet in sql');
                    }
                });
            },
            null,
            null
        )
    }

    setMeetDataListener(){
        console.log('I called processMeet');
        const { meetId, userUid } = this.state;
        let firestoreDb = firestoreDB();
        var meetRef = firestoreDb.collection("Meets").doc(meetId);
        this.unsubscribe = meetRef.onSnapshot((meetDoc) => {
            if (meetDoc.exists) {
                //console.log("Document data:", meetDoc.data());
                let meet = meetDoc.data();
                this.processMeet(meet, true);
                //console.log(this.state);
                //this.marker.showCallout()
            } else {
                console.log("No such document!");
                Alert.alert('Sorry','This Tinko is not available anymore')
            }
        });
    }

    processMeet(meet, fromFirebase){

        const {meetId,userUid}=this.state;

        meet['meetId'] = meetId;
        console.log('fromFirebase', fromFirebase, meet);

        const endTimeTS = meet.endTime;
        const postTimeTS = meet.postTime;
        const startTimeTS = meet.startTime;

        console.log('processMeet',fromFirebase, postTimeTS, typeof(postTimeTS));

        let endTime;
        let postTime;
        let startTime;

        console.log('postTime seconds', postTimeTS.seconds);

        if(fromFirebase){
            endTime = endTimeTS.toDate();
            postTime = postTimeTS.toDate();
            startTime = startTimeTS.toDate();
        } else{
            const date = new Date(null);
            endTime = new Date(endTimeTS.seconds*1000);
            postTime = new Date(postTimeTS.seconds*1000);
            startTime = new Date(startTimeTS.seconds*1000);
        }
        //console.log('processMeet',fromFirebase, postTime, typeof(postTimeTS));


        let allFriends = meet.allFriends,
            allowParticipantsInvite = meet.allowParticipantsInvite,
            allowPeopleNearby = meet.allowPeopleNearby,
            creatorUid = meet.creator,
            description = meet.description,
            duration = meet.duration,
            //endTime = endTimeTS.toDate(),
            maxNo = meet.maxNo,
            participatingUsersList = meet.participatingUsersArray,
            placeAddress = meet.place.address,
            placeName = meet.place.name,
            placeCoordinate = meet.place.coordinate,
            placeId = meet.place.placeId,
            //postTime = meet.postTime.toDate(),
            selectedFriendsList = Object.keys(meet.selectedFriendsList),
            //startTime = meet.startTime.toDate(),
            status = meet.status,
            title = meet.title,
            dismissed = meet.dismissed;

        let userUploadedImages = meet.userUploadedImages;
        if(!userUploadedImages){
            userUploadedImages=[];
        }
        let tagsList;
        if(meet.tagsList){
            tagsList=meet.tagsList;
        }else{
            tagsList=[];
        }

        var identity;
        if(userUid === creatorUid){
            identity=1;//创佳人
        } else {
            let isJoined = _.includes(participatingUsersList, userUid);
            if(isJoined){
                if(allowParticipantsInvite){
                    identity=3;//参加，可邀请
                }else{
                    identity=2;//参加，不可邀请
                }
            }else{
                identity=0;//游客
            }

        }

        const {creatorData, placePhotos, participatingUsersData, quit}=this.state;
        if(fromFirebase){
            //console.log('fromFirebase', meet);
            if(!quit && identity === 0 &&(!meet.status || meet.dismissed)){
                Alert.alert('Whops','This Tinko is not available anymore',
                    [
                        {text: 'OK', onPress: () => {
                                this.props.navigation.goBack(null);
                                if(this.props.navigation.state.params.comeFromTinkoScreen){
                                    this.props.navigation.state.params.getMeets();
                                }
                            }},
                    ],
                    { cancelable: false });
            }

            if(!placePhotos || placePhotos.length===0 || placeId !== this.state.placeId){
                this.getPlacePhotos(placeId);
            }

            //this.getPlacePhotos(placeId);
            this.updateParticipatingUsersData(participatingUsersList);
        }



        if(!creatorData || creatorUid !== this.state.creatorUid){
            this.getCreatorData(creatorUid);
        }

        // if(!participatingUsersData){
        //     this.updateParticipatingUsersData(participatingUsersList);
        // }
        // this.getCreatorData(creatorUid);
        // this.getPlacePhotos(placeId);


        this.setState({
            meet,
            allFriends,
            allowParticipantsInvite,
            allowPeopleNearby,
            creatorUid,
            description,
            duration,
            endTime,
            maxNo,
            participatingUsersList,
            placeAddress,
            placeName,
            placeCoordinate,
            placeId,
            postTime,
            selectedFriendsList,
            startTime,
            status,
            tagsList,
            title,
            identity,
            dismissed,
            userUploadedImages,
            userImagesLoadingDone:true,
        },()=>console.log('participatingUsersList',this.state.participatingUsersList));
        this.setNavigationParams();
    }

    getParticipatingUsersList(){
        return this.state.participatingUsersList;
    }

    getCreatorData(creatorUid){
        getUserDataFromDatabase(creatorUid,
            (userData) => {
                this.setState({creatorData:userData, creatorLoadingDone:true});
            },
            (error) => {
                Alert.alert('Error', error);
            })

    }

    getPlacePhotos(placeId){
        try {
            fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=AIzaSyCw_VwOF6hmY5yri8OpqOr9sCzTTT7JKiU`)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('getPlacePhotos',responseJson);
                    console.log('getPlacePhotos');
                    let photos = responseJson.result.photos;
                    if(!photos){
                        photos=[];
                    }
                    this.setState({placePhotos: photos, placePhotosLoadingDone: true});

                }).catch((error) => {
                console.error(error);
            });
        } catch (error) {
            console.error(error);

        }

    }

    async updateParticipatingUsersData(participatingUsersList){
        var participatingUsersData = [];
        await participatingUsersList.reduce((p,e,i) => p.then(async ()=> {
            //console.log(p, e, i);
            let userUid = e;

            await getUserDataFromDatabase(userUid,
                (userData) => {
                    //console.log(userData);
                    participatingUsersData.push(userData);
                },
                (error) => {
                    Alert.alert('Error', error);
                });
        }),Promise.resolve());

        this.setState({participatingUsersData});

    }

    onJoinButtonPressed(){
        this.setState({buttonShowLoading:true});
        const { userUid, meetId, meet,participatingUsersList } = this.state;
        participatingUsersList.push(userUid);
        let timeStatusDic = meet.participatingUsersList[meet.creator];
        let meetRef = firestoreDB().collection("Meets").doc(meetId);
        meetRef.update({
            [`participatingUsersList.${userUid}`]:timeStatusDic,
            participatingUsersArray:participatingUsersList
        }).then(()=>{
            this.setState({buttonShowLoading:false});
            joinMeet(userUid,meetId);
            let bodyData ={meetId:meetId};
            getPostRequest('checkMeetStatus', bodyData,
                () => {
                },
                (error) => {
                    console.log(error);
                    Alert.alert('error', error);
                });
        }).catch((error)=>{
            this.setState({buttonShowLoading:false});
            Alert.alert('Error', error);
        });
    }

    onQuitMeetButtonPressed(){
        const { userUid, meetId,participatingUsersList } = this.state;
        _.pull(participatingUsersList,userUid);
        this.setState({quit:true});
        let meetRef = firestoreDB().collection("Meets").doc(meetId);
        meetRef.update({
            [`participatingUsersList.${userUid}`]:firebase.firestore.FieldValue.delete(),
            participatingUsersArray:participatingUsersList
        }).then(()=>{
            this.props.navigation.goBack(null);
            let bodyData ={meetId:meetId};
            quitMeet(userUid,meetId);
            getPostRequest('checkMeetStatus', bodyData,
                () => {
                },
                (error) => {
                    console.log(error);
                    Alert.alert('error', error);
                });
        }).catch((error)=>{
            this.setState({quit:false});
            Alert.alert('Error', error);
        });
    }

    onDismissMeetButtonPressed(){
        this.setState({loadingVisible:true});
        const { userUid, meetId } = this.state;
        let meetRef = firestoreDB().collection("Meets").doc(meetId);
        meetRef.update({dismissed:true}).then(()=>{

            let bodyData ={meetId:meetId};

            dismissMeet(userUid,meetId);
            getPostRequest('checkMeetStatus', bodyData,
                () => {
                    this.props.navigation.goBack(null);
                    if(this.props.navigation.state.params.comeFromTinkoScreen){
                        console.log('before getMeets called');
                        this.props.navigation.state.params.getMeets();
                        console.log('after getMeets called');
                    }
                    this.setState({loadingVisible:false});
                },
                (error) => {
                    console.log(error);
                    this.setState({loadingVisible:false});
                    Alert.alert('error', error);
                });
        }).catch((error)=>{
            this.setState({loadingVisible:false});
            Alert.alert('Error', error);
        });
    }

    onOpenThreeDotsActionSheet = () => {
        const { identity,dismissed } = this.state;
        var options;
        var destructiveButtonIndex;
        var cancelButtonIndex;
        if(dismissed){
            options = ["Cancel"];
            cancelButtonIndex = 0;
        } else {
            switch (identity){
                case 0:
                    options = ["Report", "Cancel"];
                    //destructiveButtonIndex = 0;
                    cancelButtonIndex = 1;
                    break;
                case 1:
                    options = ["Edit","Dismiss", "Cancel"];
                    destructiveButtonIndex = 1;
                    cancelButtonIndex = 2;
                    break;
                case 2:
                case 3:
                    options = ["Report", "Quit", "Cancel"];
                    destructiveButtonIndex = 1;
                    cancelButtonIndex = 2;
                    break;
                default:
                    options = ["Cancel"];
                    //destructiveButtonIndex = 0;
                    cancelButtonIndex = 0;
            }
        }

        this.props.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                destructiveButtonIndex,
            },
            buttonIndex => {
                console.log(buttonIndex);
                if(options[buttonIndex] === 'Quit'){
                    //this.onQuitMeetButtonPressed();
                    Alert.alert("Alert", "Are you sure to Quit?",
                        [
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'Yes', onPress: () => this.onQuitMeetButtonPressed(), style:"destructive"},
                        ]);
                } else if(options[buttonIndex] === 'Edit') {
                    this.props.navigation.navigate('Create',{meet:this.state.meet, getParticipatingUsersList:this.getParticipatingUsersList.bind(this)});
                } else if(options[buttonIndex] === 'Dismiss'){
                    Alert.alert("Alert", "Are you sure to Dismiss the Group?",
                        [
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'Yes', onPress: () => this.onDismissMeetButtonPressed(), style:"destructive"},
                        ]);
                } else if(options[buttonIndex] === 'Report'){
                    this.reportOverlay.showReportOverlay();
                }
            }
        );
    };

    onShareButtonPressed(){
        Share.share({
            title:'Check This Tinko',
            message:`Come join me. https://gotinko.com/activity?id=${this.state.meetId}`,
            url:`https://gotinko.com/web/activity?id=${this.state.meetId}`
        },{
            subject:'Check This Tinko',
            dialogTitle:'Check This Tinko'
        })
    }

    render() {
        const { creatorLoadingDone, placePhotosLoadingDone, userUid, creatorUid, identity,
            creatorData, title, placePhotos, startTime, allowPeopleNearby, participatingUsersList,
            maxNo, description, duration, participatingUsersData, placeName, placeCoordinate, placeAddress, placeId, tagsList, showMap, meet, loadingVisible, userUploadedImages, userImagesLoadingDone } = this.state;



        let headerSwiper = userUploadedImages.concat(placePhotos);
        console.log(headerSwiper);

        let tagsString='';
        for(let i=0; i<tagsList.length; i++){
            tagsString += ' ' + tagsList[i];
        }

        return (
            <View style={styles.container}>
                <ScrollView>

                    <View style={{height:SCREEN_WIDTH/2}}>


                        {(userImagesLoadingDone && userUploadedImages.length!==0) || (userImagesLoadingDone && placePhotosLoadingDone) ?
                            <Swiper
                                loop={false}
                                showsPagination = {false}
                            >

                                {headerSwiper.length !== 0 ?
                                    headerSwiper.map((l,i) => (
                                    <CacheImage
                                        resizeMethod={'auto'}
                                        style={{width:SCREEN_WIDTH, height:SCREEN_WIDTH/2}}
                                        key = {i}
                                        preview = {getCoverImagePlaceholder}
                                        uri = {l.photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${Math.ceil(SCREEN_WIDTH)}&photoreference=${l.photo_reference}&key=AIzaSyCw_VwOF6hmY5yri8OpqOr9sCzTTT7JKiU` : l}
                                        //source={{uri:l.photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${Math.ceil(SCREEN_WIDTH)}&photoreference=${l.photo_reference}&key=AIzaSyCw_VwOF6hmY5yri8OpqOr9sCzTTT7JKiU` : l}}
                                    />


                                    ))

                                    :
                                    <Image
                                        resizeMethod={'auto'}
                                        style={{width:SCREEN_WIDTH, height:SCREEN_WIDTH/2}}
                                        key = {'placePhoto'}
                                        source={getImageSource(tagsList[0])}/>
                                }


                            </Swiper>
                            :
                            <Image
                                resizeMethod={'auto'}
                                style={{width:SCREEN_WIDTH, height:SCREEN_WIDTH/2}}
                                source={require('../../../assets/images/placeholder-big.jpg')}/>
                        }


                    </View>


                    <View style={{flexDirection: 'row', alignItems:'center', position:'absolute', marginTop:SCREEN_WIDTH/2-60, right:0}}>
                        <Text
                            onPress={() => this.props.screenProps.showThisUser(creatorUid, this.props.navigation)}
                            style={{marginRight:30, color:'white', fontSize: 18, fontWeight:'bold'}}>{creatorData.username}</Text>
                        <TouchableOpacity
                            onPress={() => this.props.screenProps.showThisUser(creatorUid, this.props.navigation)}
                        >
                            <CacheImage
                                style={{width:80, height:80, marginRight:15, borderWidth:1.5, borderColor:'white'}}
                                preview={getAvatarPlaceholder}
                                uri={creatorData.photoURL}
                                />
                        </TouchableOpacity>
                    </View>

                    <View style={{margin:26}}>
                        <Text style={{marginTop: 20, fontSize:25, fontFamily:'bold', color:'#1C2833'}}>{title}</Text>
                        <Text style={{marginTop:10, fontSize:20, fontFamily:'regular', color:'#2C3E50'}}>{placeName}</Text>

                        <View style={{marginTop:30, flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <Entypo name="calendar" size={26} color="#1C2833" />
                                <Text style={{marginLeft: 5, fontSize:19, fontFamily:'regular', color:'#2C3E50'}}>{getStartTimeString(startTime)}</Text>
                            </View>

                            <View style={{flex:1, flexDirection:'row'}}>
                                <Entypo name="time-slot" size={26} color="#1C2833" />
                                <Text style={{marginLeft: 5, fontSize:20, fontFamily:'regular', color:'#2C3E50'}}>{getDurationString(duration)}</Text>
                            </View>

                        </View>
                        <View style={{flexDirection:'row', justifyContent:"space-between", marginTop:10}}>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <Ionicons name="ios-heart" size={26} color="#1C2833" />
                                <Text style={{marginLeft: 5, fontSize:20, fontFamily:'regular', color:'#2C3E50'}}>{`Status: ${participatingUsersList.length} / ${maxNo===1 ? '∞' : maxNo}`}</Text>
                            </View>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <MaterialIcons name="group" size={26} color="#1C2833" />
                                <Text style={{marginLeft: 5, fontSize:20, fontFamily:'regular', color:'#2C3E50'}}>{allowPeopleNearby? "Public" : "Private"}</Text>
                            </View>

                        </View>
                        <Text style={{marginTop:30, fontFamily:'regular', fontSize:17, color:'#212F3C'}}>{tagsString}</Text>
                        <Text style={{marginTop:15, fontSize:17, fontFamily:'regular', color:'#566573'}}>{description}</Text>
                        <View style={{marginTop:30}}>
                            {_.chunk(participatingUsersData, 3).map((chunk, chunkIndex) => (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }} key={chunkIndex}>
                                    {chunk.map(userData => (
                                        <TouchableOpacity
                                            key={userData.uid}
                                            style = {{width:75}}
                                            onPress={() => {
                                                this.props.screenProps.showThisUser(userData.uid, this.props.navigation)
                                            }}
                                        >
                                            {/*<Avatar*/}
                                                {/*size='large'*/}
                                                {/*rounded*/}
                                                {/*source={userData.photoURL ? { uri: userData.photoURL } : null}*/}
                                                {/*title='TK'*/}
                                                {/*key={userData.uid}*/}
                                                {/*//onPress={() => this.props.screenProps.showThisUser(userData.uid, this.props.navigation)}*/}
                                            {/*/>*/}
                                            <CacheImage
                                                key={userData.uid}
                                                preview={getAvatarPlaceholder}
                                                //onPress={() => console.log('avatar pressed')}
                                                uri={userData.photoURL ? userData.photoURL : null}
                                                style={{width:75, height:75, borderRadius:37.5}}
                                            />
                                            <Text
                                                //onPress={() => this.props.screenProps.showThisUser(userData.uid, this.props.navigation)}
                                                textAlign={'center'}
                                                numberOfLines={2}
                                                style={{marginTop:3,color:'#626567', width:75}}
                                            >{userData.username}</Text>
                                        </TouchableOpacity>

                                    ))}
                                </View>
                            ))}
                        </View>
                        {/*<List style={{marginTop:30, borderBottomColor:'#F2F4F4'}}>*/}
                        {/**/}
                        {/*</List>*/}
                    </View>

                    {showMap &&
                    <TouchableOpacity>
                        <MapView
                            rotateEnabled={false}
                            scrollEnabled={false}
                            style={{marginTop:30, width:SCREEN_WIDTH, height: SCREEN_WIDTH*2/3 }}
                            //showsUserLocation
                            region={{
                                latitude: placeCoordinate.lat,
                                longitude: placeCoordinate.lng,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            onRegionChangeComplete={() => this.marker.showCallout()}
                        >

                            <MapView.Marker
                                coordinate={{
                                    latitude: placeCoordinate.lat,
                                    longitude: placeCoordinate.lng,
                                }}
                                title={placeName}
                                description={placeAddress}
                                key={placeId}
                                ref={ref => { this.marker = ref; }}
                            />
                            <MapView.Callout/>
                        </MapView>
                    </TouchableOpacity>
                    }



                </ScrollView>
                <this.renderActivityBar />


                <Overlay
                    height={100}
                    width={100}
                    borderRadius={25}
                    isVisible={loadingVisible}
                    windowBackgroundColor={'transparent'}
                    overlayBackgroundColor="#F2F3F4"
                    overlayStyle={{justifyContent:'center', alignItems:'center'}}
                    //onBackdropPress={()=>this.setState({loadingVisible:false})}
                >

                    <ActivityIndicator size={'large'}/>


                </Overlay>
                <ReportOverlay
                    onRef={ref => this.reportOverlay = ref}
                />

            </View>

        );
    }

    renderActivityBar(){
        const {buttonShowLoading, identity, allowParticipantsInvite, meetId,dismissed} = this.state;

        return(
            <Header
            outerContainerStyles = {{backgroundColor: '#FFFCF6', borderBottomColor:'transparent', borderBottomWidth:0, paddingTop:0, ...ifIphoneX({height:78}, {height:50})}}
            innerContainerStyles = {{ alignItems: 'flex-start'}}
            leftComponent={
                <TouchableWithoutFeedback
                    onPress={()=>{
                        if(this.props.navigation.state.params.comeFromMessaging){
                            this.props.navigation.goBack();
                        }else{
                            this.props.navigation.navigate('TinkoDetailChat');
                        }
                    }}
                    style={{flex:1}}>
                    <View style={{flexDirection:'row', height:50, alignItems:'center', }}>
                        <MaterialCommunityIcons name='pencil' size={20} color={'black'} backgroundColor={'transparent'}/>
                        <Text style={{marginLeft:10}}>Discuss..</Text>
                    </View>


                </TouchableWithoutFeedback>
            }
            rightComponent={
                dismissed ?
                    null
                    :
                <View style={{flexDirection:'row', height:50, alignItems:'center'}}>
                    {(allowParticipantsInvite || identity===1) &&
                    <Entypo.Button
                        name="share-alternative" size={20} color="black" backgroundColor="transparent"
                        onPress = {() => this.onShareButtonPressed()}/>
                    }

                    {identity===3 &&
                    <Feather.Button
                        name="user-plus" size={24} color="black" backgroundColor="transparent"
                        onPress = {() => this.props.navigation.navigate('ParticipantsInvite',{meetId:meetId})}/>
                    }
                    {identity === 0 &&
                    <Button
                        onPress={() => this.onJoinButtonPressed()}
                        loading={buttonShowLoading}
                        loadingProps={{size: 'small', color: 'white'}}
                        title={"Join"}
                        containerViewStyle={{ flex:1, marginRight:0}}
                        buttonStyle={{borderRadius:0, height:50, width:SCREEN_WIDTH*2/5}}/>
                    }

                </View>

            }
        />);
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    wrapper: {

    },
    title:{
        fontSize:25, fontFamily:'bold', color:'#1C2833'
    }

});