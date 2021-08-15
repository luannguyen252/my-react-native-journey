import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import globalStyles from "../assets/styles/globalStyles";

export default function CellNavigation({ route, name }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate(route)}
      style={{
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
      }}
    >
      <Text style={globalStyles.bodyText}>{name} →</Text>
    </TouchableOpacity>
  );
}
