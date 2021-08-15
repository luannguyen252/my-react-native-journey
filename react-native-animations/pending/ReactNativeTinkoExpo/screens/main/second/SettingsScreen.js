import React from 'react';
import {Alert, View, StyleSheet, Text, Switch, ScrollView, Dimensions, Platform} from "react-native";
import firebase from "firebase";
import {Avatar, Header, ListItem, Button} from 'react-native-elements';
import {
    firestoreDB,
    getAvatarPlaceholder,
    getFromAsyncStorage,
    getPostRequest,
    writeInAsyncStorage,
    logoutFromNotification
} from "../../../modules/CommonUtility";
import {ifIphoneX} from "react-native-iphone-x-helper";
import {Image as CacheImage} from "react-native-expo-image-cache";
import {DisconnectFromServer} from '../../../modules/SocketModule';
import {Entypo, SimpleLineIcons} from '@expo/vector-icons';
import {Facebook} from "expo";

let app = require('../../../app.json')

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SettingsScreen extends React.Component {
    static navigationOptions = ({
        header:null,
    });

    constructor(props){
        super(props);
        let user = firebase.auth().currentUser;
        this.state={
            userUid:user.uid,
            userData:{},
        };
        this.getThisUserDataForSetting();
    }

    getThisUserDataForSetting(){
        getFromAsyncStorage('ThisUser').then((userData) => {
            if(userData) {
                console.log(userData);
                this.setState({userData});
            }
        });
    }

    onLogoutButtonPressed(){
        Alert.alert("Alert", "Are you sure to logout?",
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => {
                        DisconnectFromServer();
                        logoutFromNotification(this.state.userUid);
                        firebase.auth().signOut()
                            .then(console.log('after signout'))
                            .catch((error) => {
                                console.log(error);
                                Alert.alert("Error", error.message);
                            });
                    }, style:"destructive"},
            ]);

    }

    setPhotoURL(photoURL){
        this.setState((state) => {
            let userData = state.userData;
            userData.photoURL = photoURL;
            return {userData};
        })
    }

    setUsername(username){
        this.setState((state) => {
            let userData = state.userData;
            userData.username = username;
            return {userData};
        })
    }

    setLocation(location){
        this.setState((state) => {
            let userData = state.userData;
            userData.location = location;
            return {userData};
        })
    }

    onFBAutoAddSwitchChanged(fbAutoAdd){
        this.setState((state)=>{
            let userData = state.userData;
            userData.fbAutoAdd = fbAutoAdd;
            return {userData};
        });
        let userRef = firestoreDB().collection('Users').doc(this.state.userUid);
        userRef.update({fbAutoAdd:fbAutoAdd}).then(()=>{
            this.props.navigation.state.params.getThisUserData();
        }).catch((error)=>{
            Alert.alert('Error', error);
        })
    }
    //onPress={() => this.onLogoutButtonPressed()}

    getAndSetNewUserData(){
        this.props.navigation.state.params.getThisUserDataAndReturn().fork(
            (error) => {
                console.log(error);
            },
            (userData) => {
                this.setState({userData},()=>console.log('getAndSetNewUserData',userData));
            }
        );;
    }

    async linkFacebook(){
        const { userData, userUid } = this.state;
        const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync('765640913609406', {
            permissions: ['public_profile', 'email', 'user_friends', 'user_location'],
        });
        if (type === 'success') {
            console.log('facebook login success', token,expires);
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().currentUser.linkWithCredential(credential).then(async (user) => {
                console.log("Account linking success", user);
                const response = await fetch(
                    `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,friends,location,gender,picture`
                );
                //const responseJSON = JSON.stringify(await response.json());
                var dict = await response.json();
                console.log(dict);
                dict.uid = userUid;
                dict.fbToken = token;
                dict.fbTokenExpires = expires;
                dict.linkFacebookMode = true;
                dict.userData = userData;
                console.log(dict);
                getPostRequest('initializeNewUser', dict,
                    ()=>{
                    this.getAndSetNewUserData();
                    },
                    (error)=>Alert.alert('Error', error));
            }, function(error) {
                console.log("Account linking error", error);
                Alert.alert("Account linking error", error.message);
            });
        }
    }


    render() {
        const {userData} = this.state;
        //console.log(userData);
        return (
            <View style={{flex:1}}>
                <Header
                    leftComponent={{ icon: 'chevron-left', color: '#fff', onPress:()=>this.props.navigation.goBack()}}
                    centerComponent={{ text: 'Settings', style: { fontSize:18, fontFamily:'regular', color: '#fff' } }}
                    outerContainerStyles={Platform.OS === 'android'? {height:68} : ifIphoneX({height:88})}
                />
                <ScrollView>
                    {/*<Button*/}
                        {/*title={'test'}*/}
                        {/*onPress={()=>this.getAndSetNewUserData()}*/}
                    {/*/>*/}
                    <ListItem
                        title='Avatar'
                        titleStyle={styles.titleStyle}
                        chevron
                        chevronColor={'black'}
                        rightElement={
                            <CacheImage
                                preview={getAvatarPlaceholder}
                                uri={userData.photoURL}
                                style={{width:50, height:50}}
                            />
                        }
                        onPress={()=> this.props.navigation.navigate('AvatarUpload',{
                            getThisUserData:this.props.navigation.state.params.getThisUserData,
                            setPhotoURL:this.setPhotoURL.bind(this)
                        })}
                    />
                    <ListItem
                        title='Username'
                        titleStyle={styles.titleStyle}
                        chevron
                        chevronColor={'black'}
                        rightElement={
                            <Text>{userData.username}</Text>
                        }
                        onPress={()=>this.props.navigation.navigate('UpdateUsername',{
                            getThisUserData:this.props.navigation.state.params.getThisUserData,
                            setUsername:this.setUsername.bind(this),
                            username:userData.username
                        })}
                    />
                    <ListItem
                        title='Location'
                        titleStyle={styles.titleStyle}
                        chevron
                        chevronColor={'black'}
                        rightElement={
                            <Text>{userData.location}</Text>
                        }
                        onPress={() => this.props.navigation.navigate('GooglePlacesAutocomplete', {
                            getThisUserData:this.props.navigation.state.params.getThisUserData,
                            setLocation: this.setLocation.bind(this),
                            citySearchMode:true
                        })}
                    />
                    <ListItem
                        title='Email'
                        titleStyle={styles.titleStyle}
                        rightElement={
                            <Text>{userData.email}</Text>
                        }
                    />

                    {(userData.phoneNumber && userData.phoneNumber!=={}) ?
                    <ListItem
                        title='Phone Number'
                        titleStyle={styles.titleStyle}
                        rightElement={
                            <Text>{userData.phoneNumber.number}</Text>
                        }
                    />
                        :

                        <ListItem
                            chevron
                            chevronColor={'black'}
                            rightElement={
                                <SimpleLineIcons
                                    name={'screen-smartphone'}
                                    size={40}
                                    color={'#145A32'}
                                />
                            }
                            title={'Link Phone Number'}
                            titleStyle={styles.titleStyle}
                            onPress={() => this.props.navigation.navigate('LinkPhoneNumber',{successReturnFunction:this.getAndSetNewUserData.bind(this)})}
                        />

                    }

                    {userData.facebookId && userData.facebookId!=='' &&
                    <ListItem
                        title='Add Facebook Friends'
                        titleStyle={{fontFamily:'regular', fontSize:17,}}
                        rightElement={
                            <Switch
                                value={userData.fbAutoAdd}
                                onValueChange={(fbAutoAdd) => this.onFBAutoAddSwitchChanged(fbAutoAdd)}
                            />
                        }
                    />
                    }


                    {(!userData.facebookId || userData.facebookId==='') &&
                    <ListItem
                        chevron
                        chevronColor={'black'}
                        rightElement={
                            <Entypo
                                name={'facebook-with-circle'}
                                size={35}
                                color={'#3B5998'}
                            />
                        }
                        title={'Link Facebook'}
                        titleStyle={styles.titleStyle}
                        onPress={() => this.linkFacebook()}
                    />
                    }

                    <ListItem
                        title='Privacy Policy'
                        titleStyle={styles.titleStyle}
                        containerStyle={{marginTop:20}}
                        chevron
                        chevronColor={'black'}
                        onPress={()=>this.props.navigation.navigate('TinkoWebView',{title:'Privacy Policy', uri:'https://termsfeed.com/privacy-policy/11f395148fd94535328c9cda80d1ca86'})}
                    />
                    <ListItem
                        title='Services Terms'
                        titleStyle={styles.titleStyle}
                        chevron
                        chevronColor={'black'}
                        onPress={()=>this.props.navigation.navigate('TinkoWebView',{title:'Services Terms', uri:'https://termsfeed.com/terms-conditions/5f13460a2ff8f4a683d5ee096fa3a5f1'})}
                    />

                    <ListItem
                        title='Submit your Advice'
                        titleStyle={{fontFamily:'regular', fontSize:18}}
                        containerStyle={{marginTop:20}}
                        chevron
                        chevronColor={'black'}
                        //onPress={()=>this.props.navigation.navigate('TinkoWebView',{title:'Privacy Policy', uri:'https://termsfeed.com/privacy-policy/11f395148fd94535328c9cda80d1ca86'})}
                    />
                    <ListItem
                        title='Black List'
                        titleStyle={{fontFamily:'regular', fontSize:18}}
                        chevron
                        chevronColor={'black'}
                        onPress={()=>this.props.navigation.navigate('BlackListScreen')}
                    />
                    <ListItem
                        title='Current Version'
                        titleStyle={{fontFamily:'regular', fontSize:18}}
                        //containerStyle={{marginTop:20}}
                        rightElement={
                            <Text>{app.expo.version}</Text>
                        }
                        />
                    <ListItem
                        title='Logout'
                        titleStyle={{fontFamily:'regular', fontSize:18}}
                        containerStyle={{marginTop:20}}
                        onPress={()=>this.onLogoutButtonPressed()}
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: 'white',
    // },
    // listStyle:{
    //     // borderTopWidth: 0,
    //     // borderBottomWidth:0,
    //     // borderBottomColor:'#F8F9F9',
    //     paddingLeft:0,
    //     paddingRight:0,
    // },
    titleStyle:{
        fontFamily:'regular',
        fontSize:20,
    }

});