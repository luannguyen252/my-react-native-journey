import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import { addTimKiemToMemory } from "../FirstScreen/async_store";
import styles from "./styles";

export default function DetailsScreen({ route }) {
  const { paramName } = route.params;

  useEffect(() => {
    addTimKiemToMemory({ name: paramName, route: paramName });
  }, []);

  return (
    <View style={[globalStyles.container, styles.container]}>
      <StatusBar style="auto" />
      <Text style={globalStyles.title}>{paramName}</Text>
    </View>
  );
}
