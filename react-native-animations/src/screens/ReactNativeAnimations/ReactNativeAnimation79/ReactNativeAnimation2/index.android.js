/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
  PanResponder
} from 'react-native';

let drawerMotion;

export default class drawer extends Component {

  componentWillMount(){
    this._panResponder = PanResponder.create({

      onStartShouldSetPanResponder: (e, gestureState) => {
        return true;
        //alert(JSON.stringify(gestureState))
      },

      onMoveShouldSetPanResponder: (e, gestureState) => {
        //this.state.animation.setOffset({x:this.state.animation.x._value, y:this.state.animation.y._value})
        return true;
      },

      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        //alert(JSON.stringify(this.state.pan.x))
        if(drawerMotion==200){
          this.state.animation.setOffset({x:this.state.animation.x._value})
        }else{
          this.state.animation.setOffset({x:gestureState.dx})
        }
        //this.state.pan.setValue({x: 0, y: 0});
        //alert(JSON.stringify(this.state.pan))
      },

      onPanResponderRelease: (e, gestureState) => {
        //alert('gestureRelease')
        //alert(JSON.stringify(gestureState))
        // if(gestureState.dx>100){
        //   alert('>100')
        //   Animated.timing(
        //     this.state.animation.x,
        //     {
        //       toValue:200,
        //       duration:500
        //     }
        //   )
        // }
        if(gestureState.dx<100 && gestureState.dx > 0){
          //alert("<125")
           Animated.timing(
             this.state.animation,
             {
               toValue:-(gestureState.dx),
               duration:500,
               //useNativeDriver:true
             }
           ).start(
             //()=>this.state.animation.flattenOffset()
           )
           //this.state.animation.flattenOffset();
        }else if(gestureState.dx <= 0){
          //alert(JSON.stringify(gestureState))
          Animated.timing(
             this.state.animation,
             {
               toValue:-(200),
               duration:1000,
               //useNativeDriver:true
             }
           ).start(
             //()=>this.state.animation.flattenOffset()
             )
           //this.state.animation.flattenOffset();
        }
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.animation.x},
      ])
    })
  }

  

  state={
    animation : new Animated.ValueXY()
  }

  render() {
      drawerMotion = this.state.animation.x.interpolate({
      inputRange: [0,100],
      outputRange:[-200,0],
      extrapolate:'clamp',
      useNativeDriver:true
    })
    return (
      <View style={{flex:1,backgroundColor:'yellowgreen'}} {...this._panResponder.panHandlers}>
        
        <Animated.View style={{backgroundColor:'cyan',flex:1,width:200,transform:[{translateX:drawerMotion}]}}>
          <Text>Hello</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('drawer', () => drawer);
