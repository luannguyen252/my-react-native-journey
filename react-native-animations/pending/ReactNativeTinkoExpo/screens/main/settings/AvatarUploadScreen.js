import React from 'react';
import {
    ActivityIndicator,
    Button,
    Clipboard,
    Image,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert, Platform
} from 'react-native';
import {Constants, ImageManipulator, ImagePicker, Permissions} from 'expo';
import uuid from 'uuid';
import * as firebase from 'firebase';
import {ifIphoneX} from "react-native-iphone-x-helper";
import {Header} from "react-native-elements";
import {firestoreDB, getFromAsyncStorage} from "../../../modules/CommonUtility";
import { Image as CacheImage } from 'react-native-expo-image-cache';


console.disableYellowBox = true;

const url =
    'https://firebasestorage.googleapis.com/v0/b/blobtest-36ff6.appspot.com/o/Obsidian.jar?alt=media&token=93154b97-8bd9-46e3-a51f-67be47a4628a';



export default class AvatarUploadScreen extends React.Component {

    static navigationOptions = {header:null};


    constructor(props){
        super(props);
        let user = firebase.auth().currentUser;
        this.state={
            userUid:user.uid,
            userData:{},
            image: null,
            uploading: false,
        };
        getFromAsyncStorage('ThisUser').then((userData) => {
            if(userData) {
                this.setState({userData:userData, image:userData.photoURL})
            }
        });
    }




    render() {
        let { image } = this.state;

        return (
            <View style={{ flex: 1 , backgroundColor:'white'}}>
                <Header
                    leftComponent={{ icon: 'chevron-left', color: '#fff', onPress:()=>this.props.navigation.goBack()}}
                    centerComponent={{ text: 'Avatar', style: { fontSize:18, fontFamily:'regular', color: '#fff' } }}
                    outerContainerStyles={Platform.OS === 'android'? {height:68} : ifIphoneX({height:88})}
                />

                <View style={{flex:1, alignItems:'center'}}>
                    {this._maybeRenderImage()}

                    <Button
                        onPress={this._pickImage}
                        title="Pick an image from camera roll"
                    />

                    <Button onPress={this._takePhoto} title="Take a photo" />


                    {this._maybeRenderUploadingOverlay()}

                    <StatusBar barStyle="default" />
                </View>

            </View>
        );
    }

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
            return (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    ]}>
                    <ActivityIndicator color="#fff" animating size="large" />
                </View>
            );
        }
    };

    _maybeRenderImage = () => {
        let { image } = this.state;
        if (!image) {
            return;
        }

        return (
            <View
                style={{
                    marginTop: 30,
                    width: 250,
                    borderRadius: 3,
                    elevation: 2,
                }}>
                <View
                    style={{
                        borderTopRightRadius: 3,
                        borderTopLeftRadius: 3,
                        shadowColor: 'rgba(0,0,0,1)',
                        shadowOpacity: 0.2,
                        shadowOffset: { width: 4, height: 4 },
                        shadowRadius: 5,
                        overflow: 'hidden',
                    }}>
                    <CacheImage uri={image} style={{ width: 250, height: 250, borderRadius:25 }} />
                </View>
            </View>
        );
    };

    // _share = () => {
    //     Share.share({
    //         message: this.state.image,
    //         title: 'Check out this photo',
    //         url: this.state.image,
    //     });
    // };



    _takePhoto = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status !== 'granted') {
            Alert.alert('Error', 'Please grant Camera Permission to use this feature.')
        }
        let { status2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // if (status2 !== 'granted') {
        //     Alert.alert('Error', 'Please grant Camera Roll Permission to use this feature.')
        // }
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        this._handleImagePicked(pickerResult);
    };

    _pickImage = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            Alert.alert('Error', 'Please grant Camera Roll Permission to use this feature.')
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async pickerResult => {
        const { userUid } = this.state;
        try {
            this.setState({ uploading: true });

            if (!pickerResult.cancelled) {
                let uri;
                if (pickerResult.width < 1000){
                    uri = pickerResult.uri;
                    console.log('pickerResult width < 1000')
                } else {
                    console.log('pickerResult manipResult');
                    const manipResult = await ImageManipulator.manipulate(pickerResult.uri,[{resize:{width:1000}}], {compress:0.5});
                    uri = manipResult.uri;
                }
                let uploadUrl = await uploadImageAsync(uri, userUid);
                let userRef = firestoreDB().collection('Users').doc(userUid);
                userRef.update({photoURL:uploadUrl}).then(()=>{
                    this.setState({ image: uploadUrl });
                    this.props.navigation.state.params.getThisUserData();
                    this.props.navigation.state.params.setPhotoURL(uploadUrl);
                }).catch((error)=>{
                    Alert.alert('Error', error);
                })

            }
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false });
        }
    };
}

async function uploadImageAsync(uri, userUid) {
    console.log(userUid);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
        .storage()
        .ref()
        .child('Users').child('Avatar').child('avatar'+userUid);

    const snapshot = await ref.put(blob);
    return snapshot.downloadURL;
}