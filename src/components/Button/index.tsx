import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

interface Props {
  onPress: Function;
  name: string;
}

function Button(props: Props) {
  return (
    <View>
      <TouchableOpacity onPress={() => props.onPress()}>
        <Text>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Button;
