import React, { Component } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import colors from "../../colors";
import * as Animatable from "react-native-animatable";
import coinImg from "../../images/splashScreenCoin.png";
import strings from "../../strings";

const height = Dimensions.get("window").height;

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 2500);
  }

  render() {
    return (
      <LinearGradient
        colors={[colors.light, colors.primary, colors.dark]}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Animatable.View
          animation="slideInRight"
          duration={700}
          style={{
            height: height * 0.2,
            width: height * 0.2,
            alignItems: "center"
          }}
        >
          <Image source={coinImg} style={{ height: "80%", width: "80%" }} />
        </Animatable.View>
        <Animatable.View animation="slideInLeft" duration={700}>
          <Text style={{ color: "#fff", fontSize: 30 }}>{strings.title}</Text>
        </Animatable.View>
      </LinearGradient>
    );
  }
}
