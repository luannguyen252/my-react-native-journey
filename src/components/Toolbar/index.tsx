import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

interface Props {
  onPress: Function;
  name: string;
}

const Toolbar: React.FC<Props> = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={() => props.onPress()}>
        <Text>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Toolbar;
