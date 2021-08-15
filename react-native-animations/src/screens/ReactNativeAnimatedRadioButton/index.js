import RadioButton from "./RadioButton";
import React from "react";
import { View } from "react-native";
import styles from "./styles";

export default function ReactNativeAnimatedRadioButton() {
  return (
    <View style={styles.container}>
      <RadioButton
        style={{
          marginTop: 32,
          borderRadius: 16,
          borderWidth: 3,
          borderColor: "#328da8",
        }}
        innerBackgroundColor="#328da8"
        innerContainerStyle={{ height: 35, width: 35, borderRadius: 10 }}
        onPress={(isActive) => console.log("isActive: ", isActive)}
      />
      <RadioButton
        onPress={(isActive) => console.log("RadioButton isActive: ", isActive)}
      />
    </View>
  );
}
