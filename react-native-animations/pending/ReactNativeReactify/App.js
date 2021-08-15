import React, { Component } from 'react';
import { StyleSheet,  Text, View, AsyncStorage } from 'react-native';
import InstaFeed from './src/screens/InstaFeed';
import Authenticate from './src/screens/Authenticate';
import ImagePicker from './src/screens/ImagePicker';
import BaseComponent from './src/component/BaseComponent';
import Profile from './src/screens/Profile';
import { createStackNavigator, createBottomTabNavigator, TabBarBottom } from 'react-navigation'
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import config, { printLog } from './src/config';
import auth, { isSignedIn } from './src/auth'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class App extends BaseComponent {

    LoginStack = createStackNavigator({
        start: Authenticate,
    });

  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {

    isSignedIn().then(res => {
      this.setState({
        signedIn: res,
        checkedSignIn: true
      })
    }).catch(
      err => alert("An error occurred")
    );
  }

  render() { 

    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    if (signedIn) {
      return <this.TabStack />
    } else {
      return <this.LoginStack />
    }
  }
}

//// Saves to storage as a JSON-string
// AsyncStorage.setItem('key', JSON.stringify(false))

//// Retrieves from storage as boolean
// AsyncStorage.getItem('key', (value) => {
//     JSON.parse(value) // boolean false
// })
