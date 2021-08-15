import BouncyView from "./BouncyView";
import React from "react";
import { View } from "react-native";
import styles from "./styles";

export default function ReactNativeBouncyTouchable() {
  return (
    <View style={styles.container}>
      <BouncyView
        delay={60} // Animation delay in miliseconds
        scale={1.1} // Max scale of animation
        style={styles.button}
        onPress={this.props.onPress}
      >
        <Text style={styles.buttonText}>{this.props.children}</Text>
      </BouncyView>
    </View>
  );
}
