import React, { Component } from "react";
import { View, Image, StatusBar, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");

const styles = {
  wrapper: {
    // backgroundColor: '#f00'
  },
  slide: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
  },
  imgBackground: {
    width,
    height,
    backgroundColor: "transparent",
    position: "absolute",
  },
  image: {
    width,
    height,
  },
};

export default class Phone extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image
          source={require("./assets/phone_bg.jpg")}
          style={styles.imgBackground}
        />
        <Swiper
          style={styles.wrapper}
          dot={
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255,.3)",
                width: 13,
                height: 13,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: "#FFFFFF",
                width: 13,
                height: 13,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7,
              }}
            />
          }
          paginationStyle={{
            bottom: 70,
          }}
          loop={false}
        >
          <View style={styles.slide}>
            <Image
              style={styles.image}
              source={require("./assets/phone_1.jpg")}
              resizeMode="cover"
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.image}
              source={require("./assets/phone_2.jpg")}
              resizeMode="cover"
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.image}
              source={require("./assets/phone_3.jpg")}
            />
          </View>
        </Swiper>
      </View>
    );
  }
}
