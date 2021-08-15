import * as React from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import TextAnimator from "./TextAnimator";
import colors from "../../../../assets/styles/colors";

export default function AnimatedSentence({ content }) {
  const _onFinish = () => {
    console.log("Animation", "It is done!");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextAnimator
        content={content}
        textStyle={styles.textStyle}
        style={styles.containerStyle}
        duration={500}
        onFinish={_onFinish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.coolGray50,
  },
  containerStyle: {},
  textStyle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    color: colors.coolGray900,
  },
});
