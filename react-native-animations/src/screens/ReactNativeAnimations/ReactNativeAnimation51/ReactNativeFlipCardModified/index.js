import * as Animatable from "react-native-animatable";
import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
// import FlipCard from "react-native-flip-card";
import FlipCard from "./FlipCard";
import BlurBackground from "../../../../components/BlurBackground";

const { width, height } = Dimensions.get("screen");

export default class ReactNativeFlipCardModified extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flip: false,
    };
  }

  render() {
    return (
      <BlurBackground>
        <FlipCard friction={6} style={[styles.card, { marginTop: 120 }]}>
          <View
            style={[
              styles.face,
              {
                height: 320,
                justifyContent: "space-evenly",
                alignItems: "center",
              },
            ]}
          >
            <View
              style={{
                width: 140,
                height: 140,
                borderRadius: 140 / 2,
                backgroundColor: "rgba(0,0,0,0.25)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../../assets/memoji/emo-memoji-1.png")}
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: "contain",
                  borderRadius: 120 / 2,
                }}
              />
            </View>
            <Text style={[styles.title, {}]}>Okayyyyyy</Text>
          </View>
          <View
            style={[
              styles.back,
              {
                height: 320,
                justifyContent: "space-evenly",
                alignItems: "center",
              },
            ]}
          >
            <View
              style={{
                width: 140,
                height: 140,
                borderRadius: 140 / 2,
                backgroundColor: "rgba(0,0,0,0.25)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../../assets/memoji/emo-memoji-2.png")}
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: "contain",
                  borderRadius: 120 / 2,
                }}
              />
            </View>
            <Text style={[styles.title, {}]}>Nopeeeeee</Text>
          </View>
        </FlipCard>

        <FlipCard
          style={[styles.card, {}]}
          flip={this.state.flip}
          friction={6}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          clickable={true}
          alignHeight={true}
          alignWidth={true}
          onFlipEnd={(isFlipEnd) => {
            console.log("isFlipEnd", isFlipEnd);
          }}
        >
          <View
            style={[
              styles.face,
              {
                height: 240,
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
                justifyContent: "space-between",
              },
            ]}
          >
            <View style={{}}>
              <Text
                style={[
                  styles.subtitle,
                  {
                    paddingTop: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                  },
                ]}
              >
                Name
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingBottom: 16,
                  },
                ]}
              >
                Nguyen Thanh Luan
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#6B21A8",
                height: 72,
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
              }}
            ></View>
          </View>
          <View
            style={[
              styles.back,
              {
                height: 240,
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: 0,
                justifyContent: "space-between",
              },
            ]}
          >
            <View style={{}}>
              <Text
                style={[
                  styles.subtitle,
                  {
                    paddingTop: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                  },
                ]}
              >
                Account Number
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingBottom: 16,
                  },
                ]}
              >
                1234 5678 9101 1213
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#3730A3",
                height: 72,
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
              }}
            ></View>
          </View>
        </FlipCard>
      </BlurBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 8,
    paddingBottom: 8,
  },
  card: {
    width: width - 32,
  },
  face: {
    backgroundColor: "#9333EA",
    borderRadius: 16,
    paddingTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 32,
  },
  back: {
    backgroundColor: "#4F46E5",
    borderRadius: 16,
    paddingTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)",
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "400",
    textTransform: "uppercase",
    color: "rgba(255, 255, 255, 0.8)",
  },
});
