import _ from 'lodash';
import React, { Component } from 'react';
import {StyleSheet, Text, View, ImageBackground, Dimensions, Alert, Platform , FlatList, TouchableWithoutFeedback, Image, Animated, TouchableOpacity, PanResponder} from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { MapView, Constants, Location, Permissions, GestureHandler  } from 'expo';
import GeoFire from 'geofire';
import firebase from 'firebase';
import 'firebase/firestore';
import {
    getStartTimeString,
    getPostTimeString,
    getImageSource,
    firestoreDB,
    getUserDataFromDatabase, getAvatarPlaceholder, getCoverImagePlaceholder
} from "../../modules/CommonUtility";
import { Header } from 'react-navigation';
import {Image as CacheImage} from "react-native-expo-image-cache";
import {getData, updateUserInfo} from "../../modules/ChatStack";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const {ScrollView, PanGestureHandler} = GestureHandler;
// import {
//     PanGestureHandler,
//     TapGestureHandler,
//     PinchGestureHandler,
//     ScrollView,
//     State,
//     FlatList
// } from 'react-native-gesture-handler';

var geofireRef;
var onKeyEnteredRegistration;

export default class DiscoverScreen extends Component {

    // _panResponder = {};
    // //_previousLeft = 0;
    // _previousTop = 0;
    // _circleStyles = {};
    // _minTop = 0;
    // _maxTop = 0;



    //static navigationOptions = {title: 'Discover', headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0, boarderBottomWidth: 0,shadowColor: 'transparent', elevation:0, shadowOpacity: 0 }};
    static  navigationOptions = {header:null};
    constructor(props) {
        super(props);
        //console.log(props)
        this.state = {
            location: {
                lat: 40.7589,
                lng: -73.9851,
            },
            meets: [],
            selectedMeetData:null,
            containerHeight: SCREEN_HEIGHT,
            yOriginal:0,
            yOffset:0,
            yOldOffset:0,
            flatListHeight:0,
            yOnScrollOffset:0,
            listHeight: 135,
            marginBottomValue:5,
            //flatListScrollEnabled:false,
            locationLoadingDone:false,
            showRedoSearchButton:false,
            currentRegion:null,
            firstTimeLoadingDone:false,
            redoSearching:false,
        }
        this.processSelectedMeet=this.processSelectedMeet.bind(this);

    }


    componentWillMount() {
        //this._initPanResponder();
        geofireRef = new GeoFire(firebase.database().ref("Meets"));
        // if (Platform.OS === 'android' && !Constants.isDevice) {
        //     this.setState({
        //         errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        //     });
        // } else {
        //
        // }
        this._getLocationAsync();


    }

    componentDidMount() {

        //this._updateNativeStyles();
        this.props.screenProps.getDiscoverRef(this);
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            Alert.alert('Error', 'Please grant Location Permission to use this feature.')
        }
        console.log('before location await');
        //Location.setApiKey('AIzaSyCw_VwOF6hmY5yri8OpqOr9sCzTTT7JKiU');
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        let locationDic={
            lat:location.coords.latitude,
            lng: location.coords.longitude,
        };
        this.setState({
            locationLoadingDone:true,
            location: locationDic,
            currentRegion:{
                latitude:locationDic.lat,
                longitude:locationDic.lng
            }
        });

        this.getGeoFireMeets(locationDic.lat, locationDic.lng);


    };

    getGeoFireMeets(lat, lng){
        this.setState({meets:[], selectedMeetData:null});

        var geoQuery = geofireRef.query({
            center: [lat, lng],
            radius: 11
        });

        onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location, distance) {
            //console.log(key + " entered query at " + location + " (" + distance + " km from center)");
            let firestoreDb  = firestoreDB();
            let meetRef = firestoreDb.collection("Meets").doc(key);
            meetRef.get().then((meetDoc) => {
                if (meetDoc.exists) {
                    //console.log("Document data:", meetDoc.data());
                    let meet = meetDoc.data();
                    let tagsList=[];
                    if(meet.tagsList){
                        tagsList=meet.tagsList;
                    }
                    let userUploadedImages = meet.userUploadedImages;
                    let coverImageUri = null;
                    if(userUploadedImages && userUploadedImages.length>0){
                        coverImageUri = userUploadedImages[0];
                    }else if(meet.placeCoverPhotoReference && meet.placeCoverPhotoReference!==''){
                        coverImageUri = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${Math.ceil(SCREEN_WIDTH)}&photoreference=${meet.placeCoverPhotoReference}&key=AIzaSyCw_VwOF6hmY5yri8OpqOr9sCzTTT7JKiU`;
                    }
                    let meetDic = {
                        LatLng: {
                            latitude: location[0],
                            longitude: location[1],
                        },
                        title: meet.title,
                        startTime: getStartTimeString(meet.startTime.toDate()),
                        postTime: getPostTimeString(meet.postTime.toDate()),
                        placeName: meet.place.name,
                        creatorUid:meet.creator,
                        tags:tagsList,
                        key: meetDoc.id,
                        coverImageUri:coverImageUri,
                    };
                    this.setState((state) => {
                        let meets = state.meets;
                        meets.push(meetDic);
                        if(meets.length===1){
                            this.processSelectedMeet(meetDic);
                        }
                        return {meets, redoSearching:false};
                    });

                    // let creatorUid = meet.creator;
                    // let userRef = firestoreDb.collection("Users").doc(creatorUid);
                    // userRef.get().then((userDoc) => {
                    //     if (userDoc.exists) {
                    //         //console.log("Document data:", userDoc.data());
                    //         let creator = userDoc.data();
                    //
                    //         let tagsList=[];
                    //         if(meet.tagsList){
                    //             tagsList=meet.tagsList;
                    //         }
                    //
                    //         let meetDic = {
                    //             LatLng: {
                    //                 latitude: location[0],
                    //                 longitude: location[1],
                    //             },
                    //             title: meet.title,
                    //             startTime: getStartTimeString(meet.startTime.toDate()),
                    //             postTime: getPostTimeString(meet.postTime.toDate()),
                    //             placeName: meet.place.name,
                    //             creator: {
                    //                 name: creator.username,
                    //                 photoURL: creator.photoURL,
                    //             },
                    //             tags:tagsList,
                    //             key: meetDoc.id,
                    //         };
                    //         this.setState((state) => {
                    //             let meets = state.meets;
                    //             meets.push(meetDic);
                    //             return {meets, redoSearching:false};
                    //         }, () => this._setMaxTop(this.state.meets.length));
                    //
                    //
                    //     } else {
                    //         console.log("No such document!");
                    //     }
                    // }).catch((error) => {
                    //     console.log("Error getting document:", error);
                    // });

                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }.bind(this));
    }

    async processSelectedMeet(meetDic){
        console.log(meetDic);
        meetDic.creator={
            username:'',
            photoURL:''
        }
        this.setState({selectedMeetData:meetDic})
        await getUserDataFromDatabase(meetDic.creatorUid,
            (userData) => {
                meetDic.creator = userData;
                this.setState({selectedMeetData:meetDic})
            },
            (error) => {
                console.log("error");
            });
    }

    onRedoSearchButtonPressed(){
        onKeyEnteredRegistration.cancel();
        const { currentRegion } = this.state;
        this.setState({showRedoSearchButton:false, redoSearching:true});
        this.getGeoFireMeets(currentRegion.latitude, currentRegion.longitude);

    }



    render() {
        const { redoSearching, firstTimeLoadingDone, showRedoSearchButton, locationLoadingDone, location, meets, selectedMeetData, containerHeight, yOffset, yOriginal, yOnGoing, yOldOffset, yOnScrollOffset,flatListHeight, listHeight,currentRegion } = this.state;
        let marginBottomValue = this.state.marginBottomValue;
        let flatListMarginTopHeight = containerHeight-listHeight-marginBottomValue-yOffset-yOldOffset;
        //console.log(flatListMarginTopHeight);
        if(Platform.OS === 'android'){
            marginBottomValue=0;
        }
        return (
            <View
                style = {styles.container}
                onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
            >

                {showRedoSearchButton ?
                    <View style={{ width:SCREEN_WIDTH, position:'absolute', zIndex:50 , top:Header.HEIGHT+10, flexDirection:'row', justifyContent:'center'}}>
                        <Button
                            title='Redo Search In This Area'
                            onPress = {() => this.onRedoSearchButtonPressed()}
                        />
                    </View>
                    :
                    null
                }


                {locationLoadingDone ?
                    <MapView
                        style={{ flex: 1 }}
                        showsUserLocation
                        initialRegion={{
                            latitude: location.lat,
                            longitude: location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onRegionChangeComplete={(region) => {
                            console.log(region);
                            this.setState({
                                currentRegion:region,
                            });
                            if(firstTimeLoadingDone){
                                this.setState({showRedoSearchButton:true})
                            } else {
                                this.setState({firstTimeLoadingDone:true});
                            }
                        }}
                    >
                        {meets.map((meet,i) => (
                            <MapView.Marker
                                coordinate={meet.LatLng}
                                title={meet.title}
                                description={meet.startTime}
                                key={meet.key}
                                identifier={meet.key}
                                onPress={async ()=>{
                                    await this.processSelectedMeet(meet);
                                    // this.setState((state) => {
                                    //     let meets = state.meets;
                                    //     let originalMeet = meets[0];
                                    //     meets.splice(0, 1, meets[i]);
                                    //     meets.splice(i, 1, originalMeet);
                                    //     return {meets};
                                    // })
                                }}
                                onCalloutPress={()=>this.props.screenProps.navigation.navigate('TinkoDetail', {meetId:meet.key})}
                            >
                            </MapView.Marker>
                        ))}
                    </MapView>
                    :
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text>Please Enable Location Services to use this feature</Text>
                        <Button
                            title={'RELOAD'}
                            onPress={()=>this._getLocationAsync()}
                        />
                    </View>
                }

                {selectedMeetData ? //&& !redoSearching ?
                    <TouchableWithoutFeedback
                        style={Platform.OS === 'android' ?
                            {}
                            :
                            {position:'absolute', zIndex:100, top: containerHeight-listHeight-marginBottomValue, width: SCREEN_WIDTH, height:listHeight}
                        }
                        onPress={() => (this.props.screenProps.navigation.navigate('TinkoDetail', {meetId:selectedMeetData.key}))}
                    >

                        <View
                            style={Platform.OS === 'android' ?
                                {width: SCREEN_WIDTH, height:listHeight, justifyContent: 'flex-start', alignItems: 'center'}
                                :
                                {position:'absolute', zIndex:100, top: containerHeight-listHeight-marginBottomValue, width: SCREEN_WIDTH, height:listHeight, justifyContent: 'flex-start', alignItems: 'center'}
                            }
                        >
                            {selectedMeetData.coverImageUri ?
                                <CacheImage
                                    //resizeMethod={'auto'}
                                    style={Platform.OS === 'android' ?
                                        { width: SCREEN_WIDTH, height: listHeight }
                                        :
                                        { borderRadius:10, width: SCREEN_WIDTH-10, height: listHeight }}
                                    //preview={getCoverImagePlaceholder()}
                                    uri={selectedMeetData.coverImageUri}
                                />
                                :
                                <Image
                                    resizeMethod={'auto'}
                                    source={getImageSource(selectedMeetData.tags[0])}
                                    style={Platform.OS === 'android' ?
                                        { width: SCREEN_WIDTH, height: listHeight }
                                        :
                                        { borderRadius:10, width: SCREEN_WIDTH-10, height: listHeight }}
                                />
                            }
                            <View
                                style={styles.headerTop}
                            >
                                <Text style={styles.meetTitle} numberOfLines={1}>{selectedMeetData.title}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <CacheImage
                                        //preview={require('../../assets/images/avatar-placeholder.png')}
                                        uri={selectedMeetData.creator.photoURL}
                                        style={styles.userPic}/>
                                    <View style={{marginTop:10, maxWidth:SCREEN_WIDTH-85}}>

                                        <Text style={styles.userName}>{selectedMeetData.creator.username}</Text>
                                        <Text style={styles.startTime}>{selectedMeetData.startTime}</Text>
                                        <Text style={styles.meetPlaceName}>{selectedMeetData.placeName}</Text>
                                        <Text style={styles.postTime}>{selectedMeetData.postTime}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    :
                    <TouchableWithoutFeedback
                        style={Platform.OS === 'android' ?
                            {}
                            :
                            {position:'absolute', zIndex:100, top: containerHeight-listHeight-marginBottomValue, width: SCREEN_WIDTH, height:listHeight+marginBottomValue}
                        }
                        onPress={() => {
                            if(locationLoadingDone){
                                this.props.screenProps.navigation.navigate('Create',{location:currentRegion})
                            }
                        }}
                    >

                        <View
                            style={Platform.OS === 'android' ?
                                {width: SCREEN_WIDTH, height:listHeight, justifyContent: 'flex-start', alignItems: 'center'}
                                :
                                {position:'absolute', zIndex:100, top: containerHeight-listHeight-marginBottomValue, width: SCREEN_WIDTH, height:listHeight+marginBottomValue, justifyContent: 'flex-start', alignItems: 'center'}
                            }
                        >
                            <Image
                                resizeMethod={'auto'}
                                source={getImageSource('default')}
                                style={Platform.OS === 'android' ?
                                    { width: SCREEN_WIDTH, height: listHeight }
                                    :
                                    { borderRadius:10, width: SCREEN_WIDTH-10, height: listHeight }}
                            />
                            <View
                                style={styles.headerTop}
                            >
                                <View style={{marginTop:10}}>
                                    <Text style={styles.meetTitle}>Post The First Tinko In This Area</Text>
                                    <Text style={styles.userName}>Make Happiness everywhere to anyone</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                }

                {/*<View*/}
                    {/*ref={ref => {*/}
                        {/*this.circle = ref;*/}
                    {/*}}*/}
                    {/*{...this._panResponder.panHandlers}*/}
                    {/*style = {{position:'absolute', zIndex:100 }} >*/}
                    {/*<ScrollView*/}
                        {/*style={{flex:1}}*/}
                        {/*scrollEnabled={false}*/}
                    {/*>*/}
                        {/*{meets.map((meet) => (*/}
                            {/*<TouchableWithoutFeedback*/}
                                {/*key = {meet.key}*/}
                                {/*onPress={() => (this.props.screenProps.navigation.navigate('TinkoDetail', {meetId:meet.key}))}*/}
                                {/*>*/}

                                {/*<View*/}
                                    {/*style={{flex:1, width: SCREEN_WIDTH, height:listHeight+marginBottomValue, justifyContent: 'flex-start', alignItems: 'center',}}*/}
                                {/*>*/}
                                    {/*<Image*/}
                                        {/*resizeMethod={'auto'}*/}
                                        {/*source={getImageSource(meet.tags[0])}*/}
                                        {/*style={{ borderRadius:10, width: SCREEN_WIDTH-10, height: listHeight }}*/}
                                    {/*/>*/}
                                    {/*<View*/}
                                        {/*style={styles.headerTop}*/}
                                    {/*>*/}
                                        {/*<Text style={styles.meetTitle} numberOfLines={1}>{meet.title}</Text>*/}
                                        {/*<View style={{flexDirection:'row'}}>*/}
                                            {/*<Image*/}
                                                {/*source={{ uri: meet.creator.photoURL }}*/}
                                                {/*style={styles.userPic}/>*/}
                                            {/*<View style={{marginTop:10}}>*/}

                                                {/*<Text style={styles.userName}>{meet.creator.name}</Text>*/}
                                                {/*<Text style={styles.startTime}>{meet.startTime}</Text>*/}
                                                {/*<Text style={styles.meetPlaceName}>{meet.placeName}</Text>*/}
                                                {/*<Text style={styles.postTime}>{meet.postTime}</Text>*/}
                                            {/*</View>*/}
                                        {/*</View>*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                            {/*</TouchableWithoutFeedback>*/}
                        {/*))}*/}
                    {/*</ScrollView>*/}

                {/*</View>*/}
            </View>

        );
    }


    find_dimesions(layout){
        const { height } = layout;
        console.log('ScreenHeight:', SCREEN_HEIGHT, 'containerHeight:', height);
        this.setState({containerHeight: height});
        // const { containerHeight, listHeight, marginBottomValue } = this.state;
        // let listTopHeight = height-listHeight-marginBottomValue;
        // this._previousTop = listTopHeight;
        // this._circleStyles.style.top = listTopHeight;
        // this._updateNativeStyles();
        // this._minTop=listTopHeight;

    }


    // find_dimesions(layout){
    //     const { height } = layout;
    //     console.log('ScreenHeight:', SCREEN_HEIGHT, 'containerHeight:', height);
    //     this.setState({containerHeight: height});
    //     const { containerHeight, listHeight, marginBottomValue } = this.state;
    //     let listTopHeight = height-listHeight-marginBottomValue;
    //     this._previousTop = listTopHeight;
    //     this._circleStyles.style.top = listTopHeight;
    //     this._updateNativeStyles();
    //     this._minTop=listTopHeight;
    //
    // }
    //
    // _setMaxTop(lengthOfMeet){
    //     const { containerHeight, listHeight, marginBottomValue } = this.state;
    //     this._maxTop = containerHeight - (listHeight+marginBottomValue)*lengthOfMeet;
    // }
    //
    // _initPanResponder() {
    //     const { containerHeight, listHeight, marginBottomValue } = this.state;
    //     let listTopHeight = containerHeight-listHeight-marginBottomValue;
    //     this._panResponder = PanResponder.create({
    //         onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
    //         onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
    //         onPanResponderGrant: this._handlePanResponderGrant,
    //         onPanResponderMove: this._handlePanResponderMove,
    //         onPanResponderRelease: this._handlePanResponderEnd,
    //         onPanResponderTerminate: this._handlePanResponderEnd,
    //     });
    //     //this._previousLeft = 0;
    //     this._previousTop = listTopHeight;
    //     this._circleStyles = {
    //         style: {
    //             left: this._previousLeft,
    //             top: this._previousTop,
    //         },
    //     };
    // }
    //
    // _updateNativeStyles = () => {
    //     this.circle && this.circle.setNativeProps(this._circleStyles);
    // };
    //
    // _handleStartShouldSetPanResponder = (e, gestureState) => {
    //     // Should we become active when the user presses down on the circle?
    //     return true;
    // };
    //
    // _handleMoveShouldSetPanResponder = (e, gestureState) => {
    //     // Should we become active when the user moves a touch over the circle?
    //     return true;
    // };
    //
    // _handlePanResponderGrant = (e, gestureState) => {
    //
    // };
    //
    // _handlePanResponderMove = (e, gestureState) => {
    //     //console.log(e, gestureState);
    //     //this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    //     let dy = gestureState.dy;
    //     let top =  this._previousTop + dy;
    //     let fullView = top <= this._maxTop;
    //     let minView = top >= this._minTop;
    //     //let partialView = !fullView && !minView;
    //
    //     // if((fullView && dy>0) || (minView && dy<0) || partialView){
    //     //     this._circleStyles.style.top = this._previousTop + gestureState.dy;
    //     // }
    //
    //
    //     if(top<=this._minTop && this._maxTop<=top){
    //         this._circleStyles.style.top = this._previousTop + gestureState.dy;
    //         this._updateNativeStyles();
    //     }
    //
    // };
    //
    // _handlePanResponderEnd = (e, gestureState) => {
    //     this._previousTop += gestureState.dy;
    // };

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        //alignItems:'center'
    },
    itemList:{

    },
    headerTop: {
        //flexDirection: 'row',
        //padding: 5,
        marginLeft:10,
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 100,
    },
    userPic: {
        height: 45,
        width: 45,
        borderRadius: 22,
        marginRight: 10,
        marginTop:10,
    },
    userName: {
        fontSize: 20,
        color:'white',
        fontWeight: 'bold',
    },
    postTime:{
        color:'white',
    },
    meetTitle:{
        fontSize: 25,
        color:'white',
        fontWeight:'bold',
    },
    startTime:{
        fontSize:18,
        color:'white',
        fontWeight:'bold',
    },
    meetPlaceName:{
        fontSize:16,
        color:'white',
        fontWeight:'bold',
    },
    footer:{
        flex:1,
        backgroundColor: 'transparent',
        padding: 5,
        paddingRight: 9,
        paddingLeft: 9,
        zIndex: 50,
        position: 'absolute',
        bottom: 0

    },
    circle: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        zIndex: 100,
        position:'absolute'
    },
});
