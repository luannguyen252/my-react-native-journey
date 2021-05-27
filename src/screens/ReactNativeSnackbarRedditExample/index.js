import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Snackbar } from "react-native-snackbar-reddit";

export default class ReactNativeSnackbarRedditExample extends Component {
  handleInfoSnackbar = () => {
    Snackbar.info({
      content: "Info Snackbar Content",
    });
  };

  handleErrorSnackbar = () => {
    Snackbar.error({
      content: "Error Snackbar Content",
      duration: 5,
      action: {
        onPress: () => console.warn("Action Pressed"),
        label: "Action",
      },
      onClose: () => console.warn("Snackbar close"),
      darkTheme: true,
      aboveTabBar: true,
    });
  };

  handleSuccessSnackbar = () => {
    Snackbar.success({
      content: "Success Snackbar Content",
    });
  };

  handleWarningSnackbar = () => {
    Snackbar.warning({
      content: "Warning Snackbar Content",
    });
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.handleInfoSnackbar}>
          <Text>Info Snack</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleErrorSnackbar}>
          <Text>Error Snack</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleSuccessSnackbar}>
          <Text>Success Snack</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleWarningSnackbar}>
          <Text>Warning snack</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
