import * as Animatable from "react-native-animatable";
import TouchableScaleFeedback from "./TouchableScaleFeedback";
import React from "react";
import {
  View,
  Text,
  LogBox,
  Dimensions,
  StatusBar,
  StyleSheet,
} from "react-native";
import styles from "./styles";
import colors from "../../../../assets/styles/colors";
import { isIphoneX, ifIphoneX } from "../../../../helpers/iPhoneXHelper";
import { BlurView } from "expo-blur";
import AnimatedLottieView from "./AnimatedLottieView";

LogBox.ignoreAllLogs();

const { width: WIDTH_SCREEN, height: HEIGHT_SCREEN } = Dimensions.get("screen");
const ANIMATION_DELAY = 500;
const s = StyleSheet.create({
  button: {
    width: WIDTH_SCREEN - 48,
    height: 56,
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EE0033",
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: colors.white,
  },
});
const COMPONENTS = [
  {
    name: "Paid search",
    color: colors.violet600,
    delay: 100,
  },
  {
    name: "Search engine optimization",
    color: colors.orange600,
    delay: 200,
  },
  {
    name: "Content, email, mobile, social media marketing",
    color: colors.pink600,
    delay: 300,
  },
  {
    name: "Marketing automation",
    color: colors.rose600,
    delay: 400,
  },
];

export default function TouchableScaleFeedbackUI() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: colors.purple600,
      }}
    >
      <StatusBar barStyle="light-content" />

      <View
        style={{
          flex: 1.5,
          backgroundColor: colors.purple600,
          width: WIDTH_SCREEN,
          height: HEIGHT_SCREEN / 2,
        }}
      >
        <Animatable.View animation="fadeInUp" delay={ANIMATION_DELAY + 1500}>
          <AnimatedLottieView
            viewStyle={{
              width: WIDTH_SCREEN - 48,
              height: WIDTH_SCREEN,
              ...ifIphoneX(
                {
                  paddingTop: 56,
                },
                {
                  paddingTop: 16,
                }
              ),
            }}
          />
        </Animatable.View>
      </View>

      <Animatable.View
        animation="fadeInUp"
        delay={ANIMATION_DELAY}
        style={{
          flex: 1.5,
          justifyContent: "space-between",
          backgroundColor: colors.white,
          // borderTopRightRadius: 24,
          // shadowColor: colors.black,
          // shadowOffset: {
          //   width: 0,
          //   height: -4,
          // },
          // shadowOpacity: 0.15,
          // shadowRadius: 12,
          // elevation: 5,
          paddingTop: 24,
          paddingLeft: 24,
          paddingRight: 24,
          ...ifIphoneX(
            {
              paddingBottom: 50,
            },
            {
              paddingBottom: 16,
            }
          ),
        }}
      >
        <View style={{ paddingBottom: 40 }}>
          <Animatable.Text
            animation="fadeInUp"
            delay={ANIMATION_DELAY + 250}
            style={{
              fontSize: 32,
              lineHeight: 40,
              fontWeight: "700",
              textAlign: "left",
              color: colors.coolGray900,
              paddingBottom: 8,
            }}
          >
            Digital Marketing
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            delay={ANIMATION_DELAY + 500}
            style={{
              fontSize: 16,
              lineHeight: 22,
              fontWeight: "400",
              textAlign: "left",
              color: colors.coolGray400,
            }}
          >
            Build your own digital marketing strategy to optimize advertising
            through online channels.
          </Animatable.Text>
          <Animatable.View style={{ paddingTop: 16 }}>
            {COMPONENTS.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Animatable.View
                  animation="bounceIn"
                  delay={ANIMATION_DELAY + 750 + item.delay}
                  style={{
                    backgroundColor: item.color,
                    width: 32,
                    height: 32,
                    borderRadius: 32 / 2,
                  }}
                />
                <Animatable.Text
                  animation="fadeInRight"
                  delay={ANIMATION_DELAY + 750 + item.delay}
                  style={{
                    fontSize: 14,
                    lineHeight: 20,
                    fontWeight: "500",
                    color: colors.coolGray900,
                    paddingLeft: 16,
                  }}
                >
                  {item.name}
                </Animatable.Text>
              </View>
            ))}
          </Animatable.View>
        </View>

        <TouchableScaleFeedback
          inactiveScale={1}
          activeScale={0.9}
          onPress={() => console.log("Create a Campaign Now!")}
        >
          <Animatable.View
            animation="bounceIn"
            delay={ANIMATION_DELAY + 2000}
            style={[
              s.button,
              { marginBottom: 16, backgroundColor: colors.purple600 },
            ]}
          >
            <Text style={s.buttonText}>Create a Campaign Now</Text>
          </Animatable.View>
        </TouchableScaleFeedback>
      </Animatable.View>
    </View>
  );
}
