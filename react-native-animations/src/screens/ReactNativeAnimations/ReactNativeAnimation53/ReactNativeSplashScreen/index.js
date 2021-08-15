import * as Animatable from "react-native-animatable";
import React, { PureComponent } from "react";
import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import colors from "../../../../assets/styles/colors";

const ANIMATION_DELAY = 300;

class SplashScreen extends PureComponent {
  render() {
    const viewStyles = [
      styles.container,
      { backgroundColor: colors.coolGray900 },
    ];

    const textStyles = {
      color: colors.coolGray100,
      fontSize: 40,
      lineHeight: 48,
      fontWeight: "900",
    };

    return (
      <Animatable.View style={viewStyles}>
        <StatusBar hidden />
        <Animatable.Text
          animation="bounceIn"
          delay={ANIMATION_DELAY + 150}
          style={textStyles}
        >
          Splash Screen
        </Animatable.Text>
      </Animatable.View>
    );
  }
}

export default class ReactNativeSplashScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { isLoading: true };
  }

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve("result");
      }, 2000)
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }

    return (
      <Animatable.View animation="fadeInUp" style={styles.container}>
        <Animatable.View
          animation="bounceIn"
          delay={ANIMATION_DELAY}
          style={styles.avatarContainer}
        >
          <Animatable.View animation="bounceIn" delay={ANIMATION_DELAY + 150}>
            <Image
              source={require("../../../../assets/memoji/memoji-5.png")}
              style={styles.avatar}
            />
          </Animatable.View>
        </Animatable.View>
        <Animatable.Text
          animation="fadeInUp"
          delay={ANIMATION_DELAY + 150}
          style={styles.welcome}
        >
          Welcome, Luan!
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInUp"
          delay={ANIMATION_DELAY + 250}
          style={styles.instructions}
        >
          Reload the App to see a splash screen again
        </Animatable.Text>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.coolGray100,
  },
  welcome: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "900",
    textAlign: "center",
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 24,
    color: colors.coolGray900,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    textAlign: "center",
    color: colors.coolGray600,
  },
  avatarContainer: {
    backgroundColor: colors.coolGray400,
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
  },
});
