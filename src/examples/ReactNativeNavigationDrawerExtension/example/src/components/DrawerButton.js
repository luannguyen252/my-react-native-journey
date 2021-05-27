import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import { RNNDrawer } from "react-native-navigation-drawer-extension";

let lastPageName = "HomePage";
const CurrentComponentName = "CustomDrawer";

Navigation.events().registerComponentDidAppearListener((event) => {
  if (event.componentName !== CurrentComponentName) {
    lastPageName = event.componentName;
  }
});

const DrawerButton = ({ name, component, parentComponentId }) => {
  const handleOpenPage = () => {
    RNNDrawer.dismissDrawer();

    if (lastPageName === component) {
      return;
    }

    Navigation.push(parentComponentId, {
      component: {
        name: component,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleOpenPage}>
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#44475a",
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});

export default DrawerButton;
