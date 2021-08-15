import React, { Component } from 'react';
import {
    View, StyleSheet, Text, Button, Image, TouchableOpacity, TextInput, ScrollView,
    AsyncStorage
} from 'react-native';
import InstaPost from "./InstaPost";
import config, { printLog } from "../config"
import picker from 'react-native-image-picker'
import { uploadUserReactionImage, saveUserReaction } from '../firebase/fireConfig'
import moment from 'moment'
import ProgressComponent from '../component/ProgressComponent';
import StatusBarComponent from '../component/StatusBarComponent';

export default class ImagePicker extends Component {

    state = {
        reactionConfig: "",
        message: "",
        isLoading: false
    };

    constructor(props) {
        super(props)
        sendReactionToFirebase = this.sendReactionToFirebase.bind(this)
    }

    static navigationOptions = ({ navigation }) => {
        isIconShow = navigation.state.params ? navigation.state.params.isIconShow : false
        if (!isIconShow) {
            return {
                // title: `${config.constants.imagePickerTitle}`,
                headerTitle: `${config.constants.imagePickerTitle}`,
                // headerTitleStyle: {
                //     textAlign: 'center', alignSelf: 'center', fontStyle: 'normal',
                //     fontSize: 18, color: "black", fontFamily: "roboto"
                // },
                // headerStyle: {
                //     backgroundColor: 'white',
                // },
                headerRight: (
                    <TouchableOpacity >
                        <Image source={config.images.sendIcon} style={styles.navSendDisabled} />
                    </TouchableOpacity>
                ),
            }
        } else {
            return {
                // title: `${config.constants.imagePickerTitle}`,
                headerTitle: `${config.constants.imagePickerTitle}`,
                // headerTitleStyle: {
                //     textAlign: 'center', alignSelf: 'center', fontStyle: 'normal',
                //     fontSize: 18, color: "black", fontFamily: "roboto"
                // },
                // headerStyle: {
                //     backgroundColor: 'white',
                // },
                headerRight: (
                    <TouchableOpacity onPress={() => { this.sendReactionToFirebase() }} >
                        <Image source={config.images.sendIcon} style={styles.navSendActive} />
                    </TouchableOpacity>
                ),
            }
        }
    };

    sendReactionToFirebase = () => {

        this.setState({
            isLoading: true,
        });

        AsyncStorage.getItem(config.constants.LOGIN).then((login) => {
            var loginInfo = JSON.parse(login)
            printLog(loginInfo)
            var reaction = {
                reactionMsg: this.state.message,
                reactionConfig: this.state.reactionConfig,
                reactionId: loginInfo.id,
                reactionName : loginInfo.name,
                reactionDate: moment(),
                reactionLikes: 0,
                reactionImage: "",
                likeOwner: 0,
            }

            uploadUserReactionImage(reaction).then(reaction => {
                saveUserReaction(reaction).then(reaction => {
                    this.props.navigation.setParams({ isIconShow: false });
                    this.setState({
                        reactionConfig: "",
                        message: "",
                        isLoading: false,
                    });
                    this.props.navigation.navigate("home") 
                })
            })
        })
    }

    showDialog() {

        // IMAGE
        // const options = {
        //     quality: 1.0,
        //     maxWidth: 500,
        //     maxHeight: 500,
        //     storageOptions: {
        //       skipBackup: true
        //     }
        //   };

        // VIDEO
        // const options = {
        //     title: 'Video Picker',
        //     takePhotoButtonTitle: 'Take Video...',
        //     mediaType: 'video',
        //     videoQuality: 'medium'
        //   };

        var options = {
            title: 'Choose your Reaction',
            // customButtons: [
            //     { name: 'fb', title: 'Choose Photo from Facebook' },
            // ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        picker.showImagePicker(options, (response) => {
            printLog('Response = ', response);

            if (response.didCancel) {
                printLog('User cancelled image picker');
            }
            else if (response.error) {
                printLog('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                printLog('User tapped custom button: ', response.customButton);
            }
            else {

                this.setState({
                    isLoading: false,
                    reactionConfig: response
                });

                this.props.navigation.setParams({ isIconShow: true });

                // this.navigator.setButtons({
                //     leftButtons:[],
                //     rightButtons: []
                // });
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            }
        });
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View>
                    <StatusBarComponent/>
                    <ProgressComponent />
                </View>
            );
        } else {

            if (this.state.reactionConfig.uri != undefined) {
                return (
                    <ScrollView style={styles.parent}>
                        <View >
                            <StatusBarComponent/>
                            <TouchableOpacity onPress={this.showDialog.bind(this)}>
                                <Image style={styles.pickerView} source={{ uri: this.state.reactionConfig.uri }} />
                            </TouchableOpacity>
                            <TextInput
                                placeholder={'Share your thoughts here...'}
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                multiline={true}
                                style={styles.textInput}
                                blurOnSubmit={false}
                                editable={true}
                                maxLength={10000}
                                onChangeText={(txt) => {
                                    this.state.message = txt
                                }}
                                onSubmitEditing={() => {

                                }}
                            />
                        </View>
                    </ScrollView>
                );
            } else {
                return (
                    <ScrollView style={styles.parent}>
                        <View >
                            <StatusBarComponent/>
                            <TouchableOpacity onPress={this.showDialog.bind(this)}>
                                <View style={styles.pickerView}>
                                    <Image style={styles.pickerImageEmpty} source={config.images.fireIcon} />
                                </View>
                            </TouchableOpacity>
                            <TextInput
                                placeholder={'Share your thoughts here...'}
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                multiline={true}
                                style={styles.textInput}
                                blurOnSubmit={false}
                                editable={true}
                                maxLength={10000}
                                onChangeText={(txt) => {
                                    this.state.message = txt
                                }}
                                onSubmitEditing={() => {

                                }}
                            />
                        </View>
                    </ScrollView>
                );
            }
        }
        // else {
        //     return (
        //         <TouchableOpacity onPress={this.showDialog.bind(this)}>
        //             <View style={styles.emptyView}>
        //                 <Image style={styles.userPic} source={config.images.fireIcon} />
        //                 <Text style={styles.emptyText}>Click Here</Text>
        //             </View>
        //         </TouchableOpacity>
        //     );
        // }
    }
}

const styles = StyleSheet.create({
    parent: {
        width: 100 + "%",
        height: 100 + "%",
        backgroundColor: config.colors.appBgColor
    },

    emptyView: {
        width: 100 + "%",
        height: 100 + "%",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },

    emptyText: {
        color: config.colors.black,
        fontSize: 16,
        marginTop: config.constants.padding10
    },

    pickerView: {
        height: 250,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        borderColor: "red",
        margin: config.constants.defaultPadding,
        backgroundColor: "whitesmoke",
    },

    pickerImageEmpty: {
        height: 40,
        width: 40,
        margin: config.constants.defaultPadding,
    },

    textInput: {
        padding: config.constants.defaultPadding,
        marginHorizontal: config.constants.defaultPadding,
        marginBottom: config.constants.padding30,
        fontSize: 20,
    },

    navSendActive: {
        width: 24,
        height: 24,
        tintColor: 'white',
        marginRight: config.constants.defaultPadding
    },

    navSendDisabled: {
        width: 24,
        height: 24,
        tintColor: config.colors.tabBgColor,
        marginRight: config.constants.defaultPadding
    },

    userPic: {
        width: 60,
        height: 60,
        borderRadius: 20
    },
})