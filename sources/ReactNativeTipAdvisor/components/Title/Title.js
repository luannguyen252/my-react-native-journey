import React, { Component } from "react";
import { View, Image } from "react-native";
import mapImg from "../../images/mapBlurred.png";
import styles from "./styles";

/**
 * Just an image that appears at the top of the background of every screen
 */
export default class Title extends Component {
  render() {
    const sizeAdjustedStyles = styles;
    return (
      <View style={sizeAdjustedStyles.titleWrapper}>
        <Image
          source={mapImg}
          style={sizeAdjustedStyles.map}
          resizeMode="cover"
        />
      </View>
    );
  }
}
