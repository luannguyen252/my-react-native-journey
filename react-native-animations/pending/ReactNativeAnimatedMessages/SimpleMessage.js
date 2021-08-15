import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class SimpleMessage extends PureComponent {
  render() {
    const { title, message } = this.props;

    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>{title}</Text>
        <Text style={styles.text}>{message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F51B5",
    marginBottom: 10,
    padding: 15,
  },
  text: {
    color: "white",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
});
