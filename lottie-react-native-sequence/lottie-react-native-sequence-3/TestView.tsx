import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
interface Props {}
interface State {}
export default class TestView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the TestView component</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
