import React, { Component } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";

import { State, ForceTouchGestureHandler } from "react-native-gesture-handler";

import { USE_NATIVE_DRIVER } from "../config";

export default class Example extends Component {
  force = new Animated.Value(0);
  _onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          force: this.force,
        },
      },
    ],
    { useNativeDriver: USE_NATIVE_DRIVER }
  );
  _onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.force.setValue(0);
    }
  };
  render() {
    return (
      <View style={styles.view}>
        <Text style={{ textAlign: "center", width: "80%" }}>
          {" "}
          Force touch works only on some Apple devices (iPhones 6s+ excluding
          XR) and should be used only as a supportive one{" "}
        </Text>
        <ForceTouchGestureHandler
          feedbackOnActivation
          onGestureEvent={this._onGestureEvent}
          onHandlerStateChange={this._onHandlerStateChange}
        >
          <Animated.View
            style={[
              styles.box,
              { transform: [{ scale: Animated.add(1, this.force) }] },
            ]}
          />
        </ForceTouchGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 150,
    height: 150,

    backgroundColor: "mediumspringgreen",
    margin: 10,
    zIndex: 200,
  },
});
