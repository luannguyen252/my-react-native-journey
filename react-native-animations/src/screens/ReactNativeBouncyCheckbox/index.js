// https://github.com/WrathChaos/react-native-bouncy-checkbox
import React from "react";
import { View } from "react-native";
import styles from "./styles";

export default function ReactNativeBouncyCheckbox() {
  return (
    <View style={styles.container}>
      <BouncyCheckbox onPress={(isChecked) => {}} />
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        text="Custom Checkbox"
        iconStyle={{ borderColor: "red" }}
        textStyle={{ fontFamily: "JosefinSans-Regular" }}
        onPress={(isChecked) => {}}
      />
    </View>
  );
}
