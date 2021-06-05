import React from "react";
import { View, Text, SafeAreaView, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

export default function FirstScreen() {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.container}>
      <SafeAreaView>
        <StatusBar style="auto" />
        <Text style={globalStyles.title}>First Screen</Text>
        <Button
          title="Details With Passing Parameters"
          onPress={() =>
            navigation.navigate("Details", {
              paramName: "Hello World!",
            })
          }
        />
        <Button
          title="Reanimated"
          onPress={() => navigation.navigate("Reanimated")}
        />
      </SafeAreaView>
    </View>
  );
}
