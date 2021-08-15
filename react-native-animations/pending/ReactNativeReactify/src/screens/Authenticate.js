import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native'
import config, { printLog } from '../config'
import BaseComponent from "../component/BaseComponent"
import { GraphRequest, GraphRequestManager, AccessToken, GraphRequestCallback, LoginManager } from 'react-native-fbsdk'
import { registerUser } from '../firebase/fireConfig';
import ProgressComponent from '../component/ProgressComponent';

export default class Authenticate extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            postLogin: false
        };
        navigation = props.navigation;
    }

    static navigationOptions = { header: null };

    onFacebookLogin(navigation) {

        // this.props.navigation.navigate("login")
        LoginManager.logInWithReadPermissions(["public_profile", "email"])
            .then(function (result) {

                if (result.isCancelled) {
                    printLog("Login Cancelled");
                } else {
                    return AccessToken.getCurrentAccessToken();
                }
            })
            // .then((data) => {

            //     let accessToken = data.accessToken
            //     printLog(accessToken.toString());

            //     // Create a new Firebase credential with the token
            //     const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

            //     // Login with the credential
            //     return firebase.auth().signInAndRetrieveDataWithCredential(credential);
            // })
            .then((user) => {

                //Create response callback.
                const callback = responseInfoCallback = (error, result) => {
                    if (error) {
                        printLog('Error fetching data: ' + error.toString());
                    } else {
                        // alert('id: ' + result.id + '\n\nname: ' + result.name + '\n\nfirst_name: ' + result.first_name + '\n\nlast_name: '
                        //     + result.last_name + '\n\nemail: ' + result.email);

                        this.setState({ loading: true })
                        registerUser(result)
                            .then(res => {
                                this.setState({ loading: false })
                                AsyncStorage.setItem(config.constants.LOGIN, JSON.stringify(result),
                                    (response) => {
                                        printLog(response)
                                    })
                                // navigation.navigate("feed", { "isShow": false })

                                this.setState({
                                    loading: false,
                                    postLogin: true
                                })
                            })
                    }
                }

                // Create a graph request asking for user information with a callback to handle the response.
                const infoRequest = new GraphRequest(
                    '/me', {
                        accessToken: user.accessToken,
                        parameters: {
                            fields: {
                                string: 'email,name,first_name,last_name,birthday'
                            }
                        }
                    },
                    callback,
                );
                // Start the graph request.
                new GraphRequestManager().addRequest(infoRequest).start();
            })
            .catch((error) => {
                printLog(error);
                // For details of error codes, see the docs
                // The message contains the default Firebase string
                // representation of the error
            });
    }

    onGoogleLogin = (navigation) => {
        // navigation.navigate("feed", { "isShow": false })
        this.setState({
            loading: false,
            postLogin: true
        })
    }

    render() {

        // The application is initialising
        if (this.state.loading) {
            return (
                <View style={styles.progress}>
                    <ProgressComponent />
                </View>
            )
        } else if (this.state.postLogin) {
            return <this.TabStack />
        } else {

            return (
                <View style={styles.parent}>

                    <Image style={styles.parent}
                        source={config.images.background} />

                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={config.images.fireIcon} />
                    </View>

                    <View style={{ marginTop: config.constants.padding20 }}>
                        <Text style={styles.logoText}>{config.constants.appName}</Text>
                    </View>

                    <View style={styles.container}>
                        <TouchableOpacity
                            onPress={() => this.onFacebookLogin(navigation)}
                            style={styles.fbButton} >
                            <Text style={styles.loginText}>Facebook</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.onGoogleLogin(navigation)}
                            style={styles.googleButton} >
                            <Text style={styles.loginText}>Google</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    parent: {
        width: 100 + "%",
        height: 100 + "%",
        flexDirection: "column",
        backgroundColor: "white",
        position: 'absolute',
    },

    container: {
        width: 100 + "%",
        height: 100 + "%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: config.constants.defaultPadding,
        marginBottom: config.constants.padding120,
    },

    logoContainer: {
        width: 100 + "%",
        height: 100,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: config.constants.padding80,
    },

    logo: {
        width: 80,
        height: 80,
    },

    logoText: {
        color: "white",
        fontSize: 24,
        alignSelf: 'center',
        borderRadius: 10
    },

    username: {
        paddingBottom: config.constants.padding5
    },

    password: {
        marginTop: config.constants.defaultPadding,
        paddingBottom: config.constants.padding5
    },

    fbButton: {
        marginTop: config.constants.padding20,
        width: 50 + "%",
        backgroundColor: "rgb(59,89,152)",
        justifyContent: "center",
        borderRadius: 10,
        alignItems: "center",
        height: config.constants.buttonHeight,
    },

    googleButton: {
        marginTop: config.constants.padding20,
        width: 50 + "%",
        backgroundColor: "rgb(219, 68, 55)",
        justifyContent: "center",
        borderRadius: 10,
        alignItems: "center",
        height: config.constants.buttonHeight,
    },

    loginText: {
        color: "white",
        fontSize: 18,
        alignSelf: 'center',
        borderRadius: 10
    }
})