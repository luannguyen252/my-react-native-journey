import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "./styles";

const Input: React.FC<{
  name: string;
}> = ({ name }) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default Input;
