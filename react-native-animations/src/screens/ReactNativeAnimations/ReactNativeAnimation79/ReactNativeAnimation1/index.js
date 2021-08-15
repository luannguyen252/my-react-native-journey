import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Dimensions,
  Easing,
} from "react-native";

const crossViewX = 162.5;
const crossViewY = 607;

import EIcon from "react-native-vector-icons/Entypo";

const ScreenHeight = Dimensions.get("window").height;

export default class removeView extends Component {
  state = {
    backOpacity: 1,
    showCross: false,
    showView: true,
    animation: new Animated.ValueXY(),
    crossX: 0,
    crossY: 0,
    crossScaleAnimation: new Animated.Value(0.8),
    viewScaleAnimation: new Animated.Value(1),
  };

  asyncCall(e, gestureState) {
    if (gestureState.moveX < crossViewX || gestureState.moveY < crossViewY) {
      Animated.parallel([
        Animated.spring(this.state.crossScaleAnimation, {
          toValue: 0.8,
          easing: Easing.back,
        }),
        Animated.spring(this.state.viewScaleAnimation, {
          toValue: 1,
          easing: Easing.back,
        }),
      ]).start();
    }

    if (gestureState.moveX >= crossViewX && gestureState.moveY >= crossViewY) {
      Animated.parallel([
        Animated.timing(this.state.crossScaleAnimation, {
          toValue: 1.2,
          duration: 100,
        }),
        Animated.timing(this.state.viewScaleAnimation, {
          toValue: 0.6,
          duration: 100,
        }),
      ]).start();
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,

      onMoveShouldSetResponder: (e, gestureState) => true,

      onMoveShouldSetResponderCapture: () => true,

      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        //console.log("********" + JSON.stringify(gestureState))
        this.setState({ showCross: true, backOpacity: 0.8 }, () => {
          this.state.animation.setOffset({
            x: this.state.animation.x._value,
            y: this.state.animation.y._value,
          }),
            this.state.animation.setValue({ x: 0, y: 0 });
        });
      },

      onPanResponderRelease: (e, gestureState) => {
        if (
          gestureState.moveX > crossViewX &&
          gestureState.moveX < crossViewX + 50 &&
          gestureState.moveY > crossViewY &&
          gestureState.moveY < crossViewY + 50
        ) {
          this.setState({ showView: false }, () =>
            alert("dummy chathead dismissed")
          );
        }
        this.setState({ showCross: false, backOpacity: 1 }, () => {
          this.state.animation.flattenOffset();
        });
      },

      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: this.state.animation.x,
            dy: this.state.animation.y,
            useNativeDriver: true,
          },
        ],
        { listener: this.asyncCall.bind(this) }
      ),
    });
  }

  render() {
    return (
      <View style={[styles.container, { opacity: this.state.backOpacity }]}>
        {this.state.showView ? (
          <Animated.View
            style={[
              styles.circularView,
              {
                transform: [
                  { translateX: this.state.animation.x },
                  { translateY: this.state.animation.y },
                  { scaleX: this.state.viewScaleAnimation },
                  { scaleY: this.state.viewScaleAnimation },
                ],
              },
            ]}
            {...this._panResponder.panHandlers}
          />
        ) : null}
        {this.state.showCross ? (
          <Animated.View
            style={[
              styles.crossView,
              {
                transform: [
                  { scaleX: this.state.crossScaleAnimation },
                  { scaleY: this.state.crossScaleAnimation },
                ],
              },
            ]}
          >
            <EIcon
              name="circle-with-cross"
              size={50}
              style={{ color: "white" }}
            />
          </Animated.View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "indigo",
  },

  circularView: {
    zIndex: 100,
    height: 60,
    position: "absolute",
    width: 60,
    borderRadius: 30,
    backgroundColor: "yellowgreen",
  },

  crossView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    position: "absolute",
    marginTop: ScreenHeight - 60,
  },
});

AppRegistry.registerComponent("removeView", () => removeView);
