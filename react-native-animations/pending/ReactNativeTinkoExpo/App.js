import React from 'react';
import {DeviceEventEmitter, Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading, Asset, Font, SQLite,Constants} from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import firebase from "firebase";
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';
import {updateDeviceId} from "./modules/CommonUtility";
import { Root } from "native-base";
import {initSocketModule} from "./modules/SocketModule";
import {initChatTable, insertChatSql} from "./modules/ChatStack";
import Sentry from 'sentry-expo';

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = true;

Sentry.config('https://166a6ee91b35412593b46d5b1b2d841d@sentry.io/1231209').install();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    loggedIn:false,
      firstTimeLoading:true

  };


  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (

          <View style={styles.container}>
              {/*{Platform.OS === 'ios' && <StatusBar barStyle="default" />}*/}
              {/*{Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}*/}
              <Root>
                  <ActionSheetProvider>
                      <RootNavigation
                          loggedIn={this.state.loggedIn}
                          handleUserLoggedIn={this.handleUserLoggedIn.bind(this)}/>
                  </ActionSheetProvider>
              </Root>


          </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
          require('./assets/images/tagsTheme/leaves.jpg'),
          require('./assets/images/tagsTheme/StaindGlass.jpg'),
          require('./assets/images/bg_screen1.jpg'),
          require('./assets/images/placeholder-big.jpg'),
          require('./assets/images/tagsTheme/esports.jpg'),
          require('./assets/images/tagsTheme/sports.jpg'),
          require('./assets/images/tagsTheme/food.png'),
          require('./assets/images/tagsTheme/shopping.jpg'),
          require('./assets/images/tagsTheme/cinema.jpg'),
          require('./assets/images/tagsTheme/bar.jpg'),
          require('./assets/images/tagsTheme/travel.jpg'),
          require('./assets/images/avatar-placeholder.png'),

      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in . Feel free
        // to remove this if you are not using it in your app
          'georgia': require('./assets/fonts/Georgia.ttf'),
          'regular': require('./assets/fonts/Montserrat-Regular.ttf'),
          'light': require('./assets/fonts/Montserrat-Light.ttf'),
          'bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
      let config = {
          apiKey: "AIzaSyCSDDrtqnaP6YkRHQqZZ3Bd8BSGvANDPDA",
          authDomain: "tinko-64673.firebaseapp.com",
          databaseURL: "https://tinko-64673.firebaseio.com",
          projectId: "tinko-64673",
          storageBucket: "tinko-64673.appspot.com",
          messagingSenderId: "793640773525"
      };
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
            if(this.state.firstTimeLoading){
                this.setState({firstTimeLoading:false, isLoadingComplete: true, loggedIn:true});
            }
        } else {
            this.setState({firstTimeLoading:false, isLoadingComplete: true, loggedIn:false});
        }
      });
      // ErrorUtils.setGlobalHandler((error, isFatal) => {
      //     // do something with the error
      // });
  };

  handleUserLoggedIn(){
      initSocketModule(firebase.auth().currentUser.uid);
      initChatTable(firebase.auth().currentUser.uid);
      updateDeviceId(firebase.auth().currentUser.uid,Constants.deviceId);
      this.listener =DeviceEventEmitter.addListener('mySendBox',(msg)=>{
          msg = msg.msg;
          let data = JSON.parse(msg);
          if (data.type!==999&&data.type!==1){
              insertChatSql(firebase.auth().currentUser.uid,data,0);
              // this.insertChatSql(uid,data,0);
          }
      });
      this.signOutListener =  DeviceEventEmitter.addListener('signOut',()=>{
          this.listener.remove();
          this.signOutListener.remove();
      });
      this.setState({loggedIn:true});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
