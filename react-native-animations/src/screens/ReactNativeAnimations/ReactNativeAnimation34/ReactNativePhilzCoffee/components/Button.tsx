import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

interface ButtonProps {
  label: string;
  bgBtnColor: string;
  name: string;
}

const width = (Dimensions.get("window").width - 64) / 2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#432406",
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 27,
    height: 54,
    width: width,
  },
  label: {
    color: "white",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    alignSelf: "center",
  },
});

const Button = ({ name, label, bgBtnColor }: ButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => alert(`Try ${name}`)}>
      <View style={[styles.container, { backgroundColor: bgBtnColor }]}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
