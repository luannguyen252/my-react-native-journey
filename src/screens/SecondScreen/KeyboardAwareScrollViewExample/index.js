import React, { PureComponent } from "react";
import { View, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class KeyboardAwareScrollViewExample extends PureComponent {
  render() {
    return (
      <KeyboardAwareScrollView>
        <View>
          <TextInput />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
