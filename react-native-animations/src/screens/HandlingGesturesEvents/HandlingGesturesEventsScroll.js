import React, { PureComponent } from "react";
import { StyleSheet, View, Animated, ScrollView } from "react-native";

export default class HandlingGesturesEventsScroll extends PureComponent {
  componentWillMount() {
    this._animatedValue = new Animated.Value(0);
  }

  render() {
    const interpolatedColor = this._animatedValue.interpolate({
      inputRange: [0, 5000],
      outputRange: ["rgba(255, 255, 255, 1)", "rgba(51, 156, 177, 1)"],
      extrapolate: "clamp",
    });

    const event = Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            y: this._animatedValue,
          },
        },
      },
    ]);

    return (
      <View style={styles.container}>
        <ScrollView
          style={{ flex: 1 }}
          onScroll={event}
          scrollEventThrottle={16}
        >
          <Animated.View
            style={{ height: 5000, backgroundColor: interpolatedColor }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
