import React from "react";
import { StyleSheet, View } from "react-native";

export default class BatteryLevel extends React.Component<{ nb: number }> {
  render() {
    return (
      <View
        style={[
          styles.batteryLevel,
          {
            height: (this.props.nb / 100) * 272,
            backgroundColor:
              this.props.nb > 80
                ? "#46cf73"
                : this.props.nb > 60
                ? "#6dcc00"
                : this.props.nb > 40
                ? "#fccf00"
                : this.props.nb > 20
                ? "#fea000"
                : "#ff3c42",
          },
        ]}
      ></View>
    );
  }
}

const styles = StyleSheet.create({
  batteryLevel: {
    width: 152,
    margin: 2,
    borderRadius: 15,
    position: "absolute",
    bottom: 0,
  },
});
