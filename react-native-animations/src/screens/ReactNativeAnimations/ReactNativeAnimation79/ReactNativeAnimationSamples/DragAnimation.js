import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';

class DragAnimation extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.ValueXY(0, 0);
    this._value = { x: 0, y: 0 };
    this.animatedValue.addListener(v => this._value = v);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.animatedValue.setOffset({
          x: this._value.x,
          y: this._value.y,
        });
        this.animatedValue.setValue({ x:0, y:0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.animatedValue.x, dy: this.animatedValue.y },
      ]),
      onPanResponderRelease: (e, gestureState) => {
        console.log( 'vx: ' + gestureState.vx + ', vy: ' + gestureState.vy);
        this.animatedValue.flattenOffset();
        Animated.decay(this.animatedValue, {
          deceleration: 0.997,
          velocity: { x: gestureState.vx, y: gestureState.vy },
        }).start();
      },
    });
  }

  render() {

    // getTranslateTransform(): Array<{[key: string]: AnimatedValue}> {
    //   return [{translateX: this.x}, {translateY: this.y}];
    // }
    const animatedStyle = {
      transform: this.animatedValue.getTranslateTransform(),
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.box, animatedStyle]} {...this.panResponder.panHandlers}>
          <Text>Drag Me</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DragAnimation;
