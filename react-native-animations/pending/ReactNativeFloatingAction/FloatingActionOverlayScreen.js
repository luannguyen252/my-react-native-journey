import React, { PureComponent } from "react";
import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import { FloatingAction } from "./FloatingAction"; // eslint-disable-line import/no-unresolved

import Property from "./components/Property";

class FloatingActionOverlayScreen extends PureComponent {
  static navigationOptions = {
    title: "Change overlay screen",
  };

  render() {
    const actions = [
      {
        text: "Accessibility",
        icon: require("./assets/ic_accessibility_white.png"),
        name: "bt_accessibility",
        position: 2,
      },
      {
        text: "Language",
        icon: require("./assets/ic_language_white.png"),
        name: "bt_language",
        position: 1,
      },
      {
        text: "Location",
        icon: require("./assets/ic_room_white.png"),
        name: "bt_room",
        position: 3,
      },
      {
        text: "Video",
        icon: require("./assets/ic_videocam_white.png"),
        name: "bt_videocam",
        position: 4,
      },
    ];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Property
            propertyName="overlayColor"
            propertyValue="rgba(255, 255, 255, 1)"
            defaultValue="rgba(68, 68, 68, 0.6)"
          />
          <FloatingAction
            actions={actions}
            overlayColor="rgba(255, 255, 255, 1)"
            onPressItem={(name) => {
              Alert.alert("Icon pressed", `the icon ${name} was pressed`);
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default FloatingActionOverlayScreen;
