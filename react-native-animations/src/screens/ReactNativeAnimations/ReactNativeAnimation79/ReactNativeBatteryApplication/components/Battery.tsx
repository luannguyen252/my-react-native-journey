import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import BatteryLevel from "./BatteryLevel";

export default class Battery extends React.Component<
  { nb: number; batteryState: number },
  { isTouch: number }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      isTouch: 0,
    };
  }

  render() {
    return (
      <View
        style={[styles.container]}
        onTouchStart={() => this.setState({ isTouch: 1 })}
        onTouchEnd={() => this.setState({ isTouch: 0 })}
      >
        <View style={[styles.topBattery]}></View>
        <View style={[styles.battery]}>
          <BatteryLevel nb={this.props.nb}></BatteryLevel>
          {this.props.batteryState == 2 && this.state.isTouch == 0 ? (
            <Feather name="battery-charging" size={70} color="black" />
          ) : (
            <View></View>
          )}
          {this.state.isTouch == 1 ? (
            <Text style={[styles.nbBattery]}>{this.props.nb + "%"}</Text>
          ) : (
            <View></View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  battery: {
    width: 160,
    height: 280,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  topBattery: {
    width: 75,
    height: 13,
    backgroundColor: "black",
    marginBottom: 3,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  container: {
    alignItems: "center",
  },
  nbBattery: {
    fontSize: 60,
    marginBottom: 8,
  },
});
