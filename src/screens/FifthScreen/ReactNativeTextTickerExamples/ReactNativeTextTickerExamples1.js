import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import TextTicker from "react-native-text-ticker";

export default class ReactNativeTextTickerExamples1 extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <TextTicker
          style={{ fontSize: 24 }}
          duration={3000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={1000}
        >
          Super long piece of text is long. The quick brown fox jumps over the
          lazy dog.
        </TextTicker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
