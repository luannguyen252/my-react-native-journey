import React from "react";
import { View, StatusBar } from "react-native";
import LottieView from "lottie-react-native";

export default class LottieAnimationRedirectScreen extends React.Component {
  componentDidMount() {
    this.anim.play();

    setTimeout(() => {
      this.props.navigation.navigate("Details", {
        paramName: "Lottie Animation Redirect Screen",
      });
    }, 3000);
  }

  render() {
    return (
      <View style={{}}>
        <StatusBar barStyle="light-content" backgroundColor="#161f3d" />
        <View style={{}}>
          <LottieView
            source={require("./assets/json_pin_jump.json")}
            style={{
              justifyContent: "center",
              alignSelf: "center",
              height: "100%",
              width: "100%",
            }}
            autoPlay={false}
            loop={false}
            speed={1}
            ref={(animation) => {
              this.anim = animation;
            }}
          />
        </View>
      </View>
    );
  }
}
