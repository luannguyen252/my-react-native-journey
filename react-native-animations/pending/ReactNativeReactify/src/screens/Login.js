import React, { Component } from 'react'
import { Input, Item, Label } from 'native-base'
import { Image, StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native'
import config, { printLog } from '../config'

export default class Login extends Component {

    // static navigationOptions = { header: null };

    static navigationOptions = ({ navigation }) => ({
        title: `${config.constants.appName}`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    onLoginPress = (username, password) => {
        // this.props.navigation.navigate("feed")

        firebase.auth.signInWithEmailAndPassword(username, password)
            .then(() => {
                this.props.navigation.navigate("feed")
            }).catch((error) => {

            })
    }

    render() {
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
                            <Input />
                        </Item>

                        <Item floatingLabel style={{ marginTop: config.constants.padding20, }}>
                            <Label style={styles.password}>Password</Label>
                            <Input />
                        </Item>

                        <TouchableOpacity
                            onPress={this.onLoginPress}
                            style={styles.loginButton} >
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    parent: {
        width: 100 + "%",
        height: 100 + "%",
        flexDirection: "column",
        position: 'absolute'
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