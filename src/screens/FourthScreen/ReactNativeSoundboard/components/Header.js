import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const WIDTH = Dimensions.get("window").width;

const Header = ({ text }) => {
  return (
    <View style={styles.headerContainer}>
      <Icon style={styles.icon} name="music-note" size={40} color="#000000" />
      <Text style={styles.headerText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#98ffcc",
    width: WIDTH,
    height: 100,
    justifyContent: "space-evenly",
    borderColor: "black",
    borderBottomWidth: 2,
    elevation: 10,
    marginBottom: 20,
    flexDirection: "row",
  },
  headerText: {
    color: "black",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 30,
    textDecorationLine: "underline",
  },
  icon: {
    alignSelf: "center",
  },
});

export default Header;
