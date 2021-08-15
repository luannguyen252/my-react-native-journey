import React, { Component } from 'react';
import {StyleSheet, Text, View, ImageBackground, Dimensions, TouchableWithoutFeedback, Alert} from 'react-native';
import { Input, Button } from 'react-native-elements'

import {Facebook, Font} from 'expo';
import firebase from "firebase";
import {firestoreDB} from "../../modules/CommonUtility";
//import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../assets/images/bg_screen1.jpg');


export default class RegisterScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            //headerRight:(<Button title='SKIP' buttonStyle={{backgroundColor: 'transparent', borderWidth: 0,}} onPress={params.skip}/>),
            headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0, borderBottomWidth: 0,borderBottomColor: 'transparent',}
        };
    };



    constructor(props) {
        super(props);
        console.log(props);
        let signUpWithEmail = props.navigation.state.params.signUpWithEmail;
        this.state = {
            email: props.navigation.state.params.email,
            password: '',
            login_failed: false,
            showLoading: false,
            repeatPassword: '',
            signUpWithEmail:signUpWithEmail
        };
    }

    skipRegister(){
        this.props.screenProps.handleUserLoggedIn();
    }

    async componentDidMount() {
        this.props.navigation.setParams({skip:this.skipRegister.bind(this)});
    }



    onRegisterButtonPressed(){
        //console.log('onRegisterButtonPressed')
        this.setState({ showLoading: true });
        const {email, password, repeatPassword} = this.state;
        if(password.length<8){
            this.setState({ showLoading: false });
            Alert.alert('Error', 'Password should be at least 8 characters');
            return;
        }
        if(password.localeCompare(repeatPassword)!==0){
            this.setState({ showLoading: false });
            Alert.alert('Error', 'Password are not same');
            return;
        }
        if(this.state.signUpWithEmail){
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user)=>{
                    console.log('Email Register: ', user);
                    let uid = user.uid;
                    let emailSplit = email.split('@');
                    let username = emailSplit[0];
                    let photoURL = 'https://firebasestorage.googleapis.com/v0/b/tinko-64673.appspot.com/o/Users%2FAvatar%2Favatar-placeholder.png?alt=media&token=68f12225-4266-4888-8aaa-98315112c2ed';
                    let userData = {
                        email:email,
                        photoURL:photoURL,
                        uid:uid,
                        username:username,
                        gender:'',
                        location:'',
                        fbAutoAdd:false,
                        facebookId:'',
                    }
                    firestoreDB().collection('Users').doc(uid).set(userData)
                        .then(()=>{
                            console.log('User Data susccefully added');
                            this.props.screenProps.handleUserLoggedIn();
                        }).catch((error)=>{
                            Alert.alert('Error',error.message);
                            this.setState({ showLoading: false });
                    })
                    //this.props.screenProps.handleUserLoggedIn();
                })
                .catch(function(error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                Alert.alert('Error', errorMessage);
                this.setState({ showLoading: false });
            });
        }else{
            let credential = firebase.auth.EmailAuthProvider.credential(email, password);
            firebase.auth().currentUser.linkWithCredential(credential)
                .then((user) => {
                    console.log("Account linking success", user);
                    this.props.screenProps.handleUserLoggedIn();
                }).catch((error) => {
                Alert.alert("Email Linking Failed", error);
                this.setState({ showLoading: false });
            });
        }
    }



    render() {
        const { email, password, showLoading, repeatPassword } = this.state;

        return (
            <View style={styles.container}>
                <ImageBackground
                    source={BG_IMAGE}
                    style={styles.bgImage}
                >
                    <View style={styles.loginView}>
                        <View style={styles.loginTitle}>
                            <Text style={styles.travelText}>REGISTRATION</Text>
                        </View>
                        <View style={styles.loginInput}>
                            <View style={{marginVertical: 10}}>
                                <Input
                                    containerStyle={{width:250}}
                                    onChangeText={email => this.setState({email})}
                                    value={email}
                                    inputStyle={{marginLeft: 10, color: 'white'}}
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
                                />
                            </View>
                            <View style={{marginVertical: 10}}>
                                <Input
                                    containerStyle={{width:250}}
                                    onChangeText={(password) => this.setState({password})}
                                    value={password}
                                    inputStyle={{marginLeft: 10, color: 'white'}}
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
                                />
                            </View>
                            <View style={{marginVertical: 10}}>
                                <Input
                                    containerStyle={{width:250}}
                                    onChangeText={(repeatPassword) => this.setState({repeatPassword})}
                                    value={repeatPassword}
                                    inputStyle={{marginLeft: 10, color: 'white'}}
                                    secureTextEntry={true}
                                    keyboardAppearance="light"
                                    placeholder="Repeat Password"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="default"
                                    returnKeyType="done"
                                    ref={ input => this.passwordInput = input}
                                    blurOnSubmit={true}
                                    placeholderTextColor="white"
                                />
                            </View>
                            <View style={{marginVertical: 10}}>
                                <Button
                                    title ='REGISTER'
                                    activeOpacity={1}
                                    underlayColor="transparent"
                                    onPress={() => this.onRegisterButtonPressed()}
                                    loading={showLoading}
                                    loadingProps={{size: 'small', color: 'white'}}
                                    buttonStyle={{height: 50, width: 250, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'white', borderRadius: 30}}
                                    containerStyle={{marginVertical: 10}}
                                    titleStyle={{fontWeight: 'bold', color: 'white'}}
                                />
                                <View style={styles.footerView}>
                                    <Text
                                        style={{color: 'white'}}
                                        numberOfLines={10}
                                    >
                                        By pressing 'REGISTER' button means you are agree to our
                                        <Text
                                            style={{color:'#cceeff'}}
                                            onPress={()=>this.props.navigation.navigate('TinkoWebView',{title:'Privacy Policy', uri:'https://termsfeed.com/privacy-policy/11f395148fd94535328c9cda80d1ca86'})}
                                        > Privacy Policy </Text>
                                         and
                                        <Text
                                            style={{color:'#cceeff'}}
                                            onPress={()=>this.props.navigation.navigate('TinkoWebView',{title:'Services Terms', uri:'https://termsfeed.com/terms-conditions/5f13460a2ff8f4a683d5ee096fa3a5f1'})}
                                        > Service Terms</Text>
                                        .
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
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
        //flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});