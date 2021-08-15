import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

export default function DetailsScreen({ route }) {
  const { paramName } = route.params;

  return (
    <View style={[globalStyles.container, styles.container]}>
      <StatusBar style="auto" />
      <Text style={globalStyles.title}>{paramName}</Text>
    </View>
  );
}
