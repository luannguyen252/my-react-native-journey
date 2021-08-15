import AnimateLoadingButton from "./AnimateLoadingButton";
import React, { PureComponent } from "react";
import { View } from "react-native";
import colors from "../../assets/styles/colors";
import styles from "./styles";

export default class ReactNativeAnimateLoadingButton extends PureComponent {
  _onPressHandler() {
    this.loadingButton.showLoading(true);
    // Mock
    setTimeout(() => {
      this.loadingButton.showLoading(false);
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <AnimateLoadingButton
          ref={(c) => (this.loadingButton = c)}
          width={300}
          height={50}
          title="Click Me"
          titleFontSize={16}
          titleWeight={"700"}
          titleColor={colors.white}
          backgroundColor={colors.orange600}
          borderRadius={4}
          onPress={this._onPressHandler.bind(this)}
        />
      </View>
    );
  }
}
