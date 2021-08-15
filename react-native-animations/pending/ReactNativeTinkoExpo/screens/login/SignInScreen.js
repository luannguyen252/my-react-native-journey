import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    TouchableWithoutFeedback,
    Alert,
    DeviceEventEmitter,
    Platform
} from 'react-native';
import { Input, Button } from 'react-native-elements'

import {Facebook, Font,Constants} from 'expo';
import firebase from "firebase";
import { NavigationActions } from 'react-navigation';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {firestoreDB, getPostRequest, writeInAsyncStorage ,updateDeviceId} from "../../modules/CommonUtility";
import registerForPushNotificationsAsync from '../../api/registerForPushNotificationsAsync';
import {initChatTable, insertChatSql} from "../../modules/ChatStack";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../assets/images/bg_screen1.jpg');


export default class SignInScreen extends Component {
    //static navigationOptions = {headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0, borderBottomWidth: 0,borderBottomColor: 'transparent',shadowColor: 'transparent', elevation:0, shadowOpacity: 0 }};
    static navigationOptions = {header:null};

    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            email: '',
            email_valid: true,
            password: '',
            login_failed: false,
            showLoading: false
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'georgia': require('../../assets/fonts/Georgia.ttf'),
            'regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
            'light': require('../../assets/fonts/Montserrat-Light.ttf'),
            'bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
        });

        this.setState({ fontLoaded: true });
    }

    submitLoginCredentials() {
        this.setState({ showLoading: true });
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then((user)=>{
                console.log('SignIn:==================== ', user);
                let uid = firebase.auth().currentUser.uid;
                // updateDeviceId(uid,Constants.deviceId);
                // this.listener =DeviceEventEmitter.addListener('mySendBox',(msg)=>{
                //     msg = msg.msg;
                //     let data = JSON.parse(msg);
                //     if (data.type!==999&&data.type!==1){
                //         insertChatSql(uid,data,0);
                //     }
                // });
                this.props.screenProps.handleUserLoggedIn();
            })
            .catch((error) => {
                Alert.alert("Error", error.message);
                this.setState({ showLoading: false});
            });
    }


    resetNavigation(targetRoute, email) {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: targetRoute, params: {email: email} }),
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }


    initializeNewUser = async (token, uid, expires) => {
        const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,friends,location,gender,picture`
        );
        //const responseJSON = JSON.stringify(await response.json());
        var dict = await response.json();
        console.log(dict);
        dict.uid = uid;
        dict.fbToken = token;
        dict.fbTokenExpires = expires;
        console.log(dict);
        const {email} = dict;
        console.log(email);

        this.resetNavigation('Register', email);
        getPostRequest('initializeNewUser', dict,
            ()=>{},
            (error)=>Alert.alert('Error', error));
    };

    async logInFirebase(token, expires){
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase.auth().signInWithCredential(credential).then((user) => {
            console.log("Login: ", user);
            const { a, b } = user.metadata;
            console.log(a, b); //a = creationTime, b = lastSignInTime

            writeInAsyncStorage('fbToken', token);
            writeInAsyncStorage('fbTokenExpires', expires);

            //this.resetNavigation('Register', '');
            //this.initializeNewUser(token, user.uid, expires);
            if(a===b){ //first time login
                this.initializeNewUser(token, user.uid, expires);
            } else {
                console.log('goingToMain');
                console.log("=========================",user.id);
                let secretsRef = firestoreDB().collection('Users').doc(user.uid).collection('Settings').doc('secrets');
                secretsRef.update({fbToken:token, fbTokenExpires:expires})
                    .catch((error)=>{
                        console.log(error);
                    });
                this.props.screenProps.handleUserLoggedIn();
            }
        }).catch((error) => {
            console.log(error);
            this.setState({showLoading:false});
            Alert.alert('Error', error);
        })
    }

    async logInFB() {
        this.setState({showLoading:true});
        const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync('765640913609406', {
            permissions: ['public_profile', 'email', 'user_friends', 'user_location'],
        });
        if (type === 'success') {
            console.log(token,expires);
            this.logInFirebase(token, expires);
        } else{
            this.setState({showLoading:false})
        }

    }

    render() {
        const { email, password, email_valid, showLoading } = this.state;

        return (
            <View style={styles.container}>
                <ImageBackground
                    source={BG_IMAGE}
                    style={styles.bgImage}
                >
                    { this.state.fontLoaded ?
                        <View style={styles.loginView}>
                            <View style={styles.loginTitle}>
                                <Text style={styles.travelText}>TINKO</Text>
                            </View>
                            <View style={styles.loginInput}>
                                <View style={{marginVertical: 10}}>
                                    <Input
                                        containerStyle={{width:250}}
                                        onChangeText={email => this.setState({email})}
                                        value={email}
                                        inputContainerStyle={{borderBottomColor:'white'}}
                                        inputStyle={{color: 'white'}}
                                        keyboardAppearance="light"
                                        placeholder="Email"
                                        autoFocus={false}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                        ref={ input => this.emailInput = input }
                                        onSubmitEditing={() => {
                                            this.passwordInput.focus();
                                        }}
                                        blurOnSubmit={false}
                                        placeholderTextColor="white"
                                        // displayError={!email_valid}
                                        // errorStyle={{textAlign: 'center', fontSize: 12}}
                                        // errorMessage="Please enter a valid email address"
                                    />
                                </View>
                                <View style={{marginVertical: 10}}>
                                    <Input
                                        containerStyle={{width:250}}
                                        onChangeText={(password) => this.setState({password})}
                                        value={password}
                                        inputContainerStyle={{borderBottomColor:'white'}}
                                        inputStyle={{color: 'white'}}
                                        secureTextEntry={true}
                                        keyboardAppearance="light"
                                        placeholder="Password"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="default"
                                        returnKeyType="done"
                                        ref={ input => this.passwordInput = input}
                                        blurOnSubmit={true}
                                        placeholderTextColor="white"
                                        // displayError={false}
                                        // errorStyle={{textAlign: 'center', fontSize: 12}}
                                        // errorMessage="The email and password you entered did not match out records. Please try again!"
                                    />
                                </View>
                            </View>
                            <View style={styles.loginButton}>
                                <Button
                                    title ='LOG IN'
                                    activeOpacity={1}
                                    underlayColor="transparent"
                                    onPress={this.submitLoginCredentials.bind(this)}
                                    loading={showLoading}
                                    loadingProps={{size: 'small', color: 'white'}}
                                    disabled={ !email_valid && password.length < 8}
                                    buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'white', borderRadius: 30}}
                                    containerStyle={{marginVertical: 30}}
                                    titleStyle={{fontWeight: 'bold', color: 'white'}}
                                />
                            </View>
                            <View style={styles.footerView}>
                                <Text style={{color: '#D0D3D4'}}
                                      onPress={() => this.props.navigation.navigate('TinkoWebView',{uri:'https://gotinko.com/web/password?token=iVXCFqgJHdEnMuV3RMjpH25kxug2pJ11'})}>
                                    Find My Password
                                </Text>
                                <Button
                                    title="Sign In with Facebook"
                                    clear
                                    activeOpacity={0.5}
                                    titleStyle={{color: 'white', fontSize: 18}}
                                    containerStyle={{marginTop: 10}}
                                    onPress={() => this.logInFB()}
                                />
                                <Button
                                    title="Sign Up with Email"
                                    clear
                                    activeOpacity={0.5}
                                    titleStyle={{color: 'white', fontSize: 18}}
                                    containerStyle={{marginTop: -10}}
                                    onPress={() => this.props.navigation.navigate('Register',{email:'',signUpWithEmail:true})}
                                />

                            </View>
                        </View> :
                        <Text>Loading...</Text>
                    }
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginView: {
        marginTop: 0,
        backgroundColor: 'transparent',
        width: 250,
        height: 350,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginTitle: {
        flex: 1,
    },
    travelText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'bold'
    },
    plusText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'regular'
    },
    loginInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
        flex: 1,
    },
    footerView: {
        marginTop: 20,
        flex: Platform.OS==='android'?1:0.5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});