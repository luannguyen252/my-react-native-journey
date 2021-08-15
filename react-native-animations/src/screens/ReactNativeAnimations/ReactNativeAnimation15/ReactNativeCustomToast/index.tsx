import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Toast from "./Toast";

export default class ReactNativeCustomToast extends PureComponent {
  constructor(props) {
    super(props);
  }

  showDefaultToast() {
    this.refs.defaultToast.showToast("Default Toast...");
  }

  showCustomToast() {
    this.refs.customToast.showToast("Custom Toast...", 5000);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.showDefaultToast.bind(this)}
          activeOpacity={0.8}
          style={styles.showToastBtn}
        >
          <Text style={styles.btnText}>Show Default Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.showCustomToast.bind(this)}
          activeOpacity={0.8}
          style={styles.showToastBtn}
        >
          <Text style={styles.btnText}>Show Custom Toast</Text>
        </TouchableOpacity>

        <Toast ref="defaultToast" />
        <Toast ref="customToast" backgroundColor="#28a745" position="top" />
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

  showToastBtn: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignSelf: "stretch",
    marginHorizontal: 25,
    marginVertical: 10,
  },

  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
});
