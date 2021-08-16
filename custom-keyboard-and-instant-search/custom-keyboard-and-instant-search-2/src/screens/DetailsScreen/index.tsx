import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

export default function DetailsScreen({ route }) {
  const { paramName } = route.params;

  return (
    <View style={globalStyles.container}>
      <StatusBar style="auto" />
      <Text style={globalStyles.bodyText}>{paramName}</Text>
    </View>
  );
}
