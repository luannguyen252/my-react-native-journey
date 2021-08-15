import React, {Component} from 'react';
import {WebView, View, Alert, Platform} from 'react-native';
import {ifIphoneX} from "react-native-iphone-x-helper";
import {Header} from 'react-native-elements';
import {getPostRequest} from "../../../modules/CommonUtility";
import firebase from "firebase/index";

const patchPostMessageJsCode = `(${String(function() {
    var originalPostMessage = window.postMessage
    var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer)
    }
    patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
    }
    window.postMessage = patchedPostMessage
})})();`


export default class LinkPhoneNumber extends Component {
    static navigationOptions = {header:null};

    onMessage(dataString){
        //let data = JSON.parse(dataString);

        let data = JSON.parse(dataString);
        console.log(data);
        var credential = firebase.auth.PhoneAuthProvider.credential(data.verificationId, data.code);
        console.log(credential);
        firebase.auth().currentUser.linkWithCredential(credential).then(async (user) => {
            console.log("Account linking success", user);
            let dict = {
                uid : firebase.auth().currentUser.uid,
                phoneNumber: data.phoneNumber,
                countryCode: "+1"
            };
            Alert.alert("Success", "Account linking Success");
            this.props.navigation.goBack();
            getPostRequest('linkPhoneNumber', dict,
                ()=>{
                    this.props.navigation.state.params.successReturnFunction();
                },
                (error)=>Alert.alert('Error', error));
        }, function(error) {
            console.log("Account linking error", error);
            Alert.alert("Account linking error", error.message);
        });
    }

    render() {

        return (
            <View style={{flex:1}}>
                <Header
                    leftComponent={{ icon: 'chevron-left', color: '#fff', onPress:()=>this.props.navigation.goBack()}}
                    centerComponent={{ text: 'Link Phone Number', style: { fontSize:18, fontFamily:'regular', color: '#fff' } }}
                    outerContainerStyles={Platform.OS === 'android'? {height:68} : ifIphoneX({height:88})}
                />
                <WebView
                    ref = { ref => this.webview = ref}
                    source={{uri: 'https://gotinko.com/web/linkWithPhoneNumber?token=iIffDYaLhlnaZ6QXR8Bq6nwCCy0JTqUn'}}
                    javaScriptEnabled
                    injectedJavaScript={patchPostMessageJsCode}
                    onMessage={(e) => this.onMessage(e.nativeEvent.data)}
                    thirdPartyCookiesEnabled={true}
                />
            </View>
        );
    }
}