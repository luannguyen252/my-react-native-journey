import React from "react";
import { Button, View, Platform } from "react-native";
import * as ScreenCapture from "expo-screen-capture";
import * as MediaLibrary from "expo-media-library";

export default class ScreenCaptureFunctionExample extends React.Component {
  async componentDidMount() {
    // This permission is only required on Android
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      ScreenCapture.addScreenshotListener(() => {
        alert("Thanks for screenshotting my beautiful app 😊");
      });
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Button title="Activate" onPress={this._activate} />
        <Button title="Deactivate" onPress={this._deactivate} />
      </View>
    );
  }

  _activate = async () => {
    await ScreenCapture.preventScreenCaptureAsync();
  };

  _deactivate = async () => {
    await ScreenCapture.allowScreenCaptureAsync();
  };
}
