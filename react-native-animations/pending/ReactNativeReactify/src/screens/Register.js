import React, { Component } from 'react'
import { Input, Item, Label } from 'native-base'
import { Image, StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import config, { printLog } from '../config' 

export default class Login extends Component {

    // static navigationOptions = { header: null };

    state = {
        email: "",
        password: "",
        authenticating: false
    } 

    static navigationOptions = ({ navigation }) => ({
        title: config.constants.appName,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    onLoginPress = () => {
        this.setState({
            authenticating: true
        })
          
    }

    renderScreenState() {
        if (this.state.authenticating) {
            return (
                <View style={styles.progress}>
                    <ActivityIndicator size="large" />
                </View>
            )
        } else {
            return (
                <ScrollView style={styles.parent}>
                    <View>

                        {/* <Image style={styles.parent}
                        source={config.images.background}/> */}

                        <View style={styles.logoContainer}>
                            <Image style={styles.logo} source={config.images.fireIcon} />
                        </View>

                        <View style={styles.container}>
                            <Item floatingLabel >
                                <Label style={styles.username}>Username</Label>
                                <Input onChangeText = {
                                    (text) => {
                                        this.setState({ email : text})
                                    }
                                }/>
                            </Item>

                            <Item floatingLabel style={{ marginTop: config.constants.padding20, }}>
                                <Label style={styles.password}>Password</Label>
                                <Input onChangeText = {
                                    (text) => {
                                        this.setState({ password : text})
                                    }
                                }/>
                            </Item>

                            <TouchableOpacity
                                onPress={this.onLoginPress}
                                style={styles.loginButton} >
                                <Text style={styles.loginText}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <View style={styles.parent}>
                {this.renderScreenState()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parent: {
        width: 100 + "%",
        height: 100 + "%",
        flexDirection: "column",
        position: 'absolute'
    },

    progress: {
        width: 100 + "%",
        height: 100 + "%",
        justifyContent: "center",
        alignItems: "center",
    },

    container: {
        width: 100 + "%",
        height: 100 + "%",
        flex: 1,
        padding: config.constants.defaultPadding,
        marginTop: config.constants.padding50,
    },

    logoContainer: {
        width: 100 + "%",
        height: 100,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: config.constants.padding70,
    },

    logo: {
        width: 80,
        height: 80,
        marginTop: config.constants.padding80,
    },

    username: {
        paddingBottom: config.constants.padding5
    },

    password: {
        paddingBottom: config.constants.padding5
    },

    loginButton: {
        marginTop: config.constants.padding50,
        width: 100 + "%",
        backgroundColor: "blue",
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