/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  Easing,
  Image,
  ScrollView
} from 'react-native';

const SCREENHEIGHT = Dimensions.get('window').height;
const SCREENWIDTH = Dimensions.get('window').width;
const DRAWER_WIDTH = SCREENWIDTH/1.5

let drawerMotion;

export default class drawer extends Component {

  componentWillMount(){
    this._panResponder = PanResponder.create({

      onStartShouldSetPanResponder: (e, gestureState) => true,

      onMoveShouldSetPanResponder: (e, gestureState) => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.animation.setOffset(this.state.animation._value);
      },

      onPanResponderRelease: (e, gestureState) => {
        if(gestureState.dx>100){
          this.state.animation.flattenOffset()
        }
        if(gestureState.dx < 0){
          Animated.timing(
              this.state.animation,
              {
                toValue:-(DRAWER_WIDTH - gestureState.dx),
                duration:500
              }
          ).start( () => this.state.animation.flattenOffset())
        }
        if(gestureState.dx<100 && gestureState.dx > 0){
           Animated.timing(
             this.state.animation,
             {
               toValue:-(gestureState.dx),
               duration:500
             }
           ).start(()=>this.state.animation.flattenOffset())
        }else if(gestureState.dx == 0){
            Animated.timing(
                this.state.animation,
                {
                    toValue:-(DRAWER_WIDTH - gestureState.dx),
                    duration:500
                }
            ).start( () => this.state.animation.flattenOffset())
        }
        
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.animation},
      ])
    })
  }

  state={
    animation : new Animated.Value(0)
  }

  render() {
      drawerMotion = this.state.animation.interpolate({
      inputRange: [0,100],
      outputRange:[-DRAWER_WIDTH,0],
      extrapolate:'clamp'
    })
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <Animated.View style={{height:SCREENHEIGHT ,width:DRAWER_WIDTH,transform:[{translateX:drawerMotion}]}}>
          <View style={styles.drawerUpperView}>
              <View style={styles.imageViewStyles}>
                <Image source={require('./images/man_utd.jpg')} style={styles.imageStyles} />
              </View>
              <View style={styles.userInfoView}>
                <Text style={styles.userInfoContent}>Shubhnik Singh</Text>
                <Text style={styles.userInfoContent}>Chandigarh, India</Text>
                <Text style={styles.userInfoContent}>Manchester United</Text>
              </View>
          </View>
          <View style={styles.drawerList}>
              <ScrollView>
                <View style={styles.listItem}>
                    <Text>REACT-NATIVE</Text>
                </View>
                <View style={styles.listItem}>
                    <Text>REDUX</Text>
                </View>
                <View style={styles.listItem}>
                    <Text>REACT</Text>
                </View>
                <View style={styles.listItem}>
                    <Text>GraphQL</Text>
                </View>
              </ScrollView>
          </View>
        </Animated.View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#ffa07a', 
    justifyContent:'center'
  },
  drawerUpperView:{
    flex:1,
    backgroundColor:"#e0ffff"
  },
  imageViewStyles:{
    flex:3,
    justifyContent:'flex-end',
    alignItems:'center'
  },
  imageStyles:{
    height:130,
    width:130, 
    borderRadius:65
  },
  userInfoView:{
    flex:1, 
    alignItems:'center', 
    justifyContent:'center'
  },
  userInfoContent:{
    color:'#2e8b57', 
    fontWeight:'500'
  },
  drawerList:{
    flex:1, 
    backgroundColor:'#fffacd'
  },
  listItem:{
    height:75,
    paddingLeft:10, 
    justifyContent:'center'
  }
}); 

AppRegistry.registerComponent('drawer', () => drawer);