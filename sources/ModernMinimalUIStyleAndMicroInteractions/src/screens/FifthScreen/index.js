import React from "react";
import { View, Text, SafeAreaView, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

export default function FifthScreen() {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.container}>
      <SafeAreaView>
        <StatusBar style="auto" />
        <Text style={globalStyles.title}>Fifth Screen</Text>
        <Button
          title="Details With Passing Parameters"
          onPress={() =>
            navigation.navigate("Details", {
              paramName: "Hello World!",
            })
          }
        />
      </SafeAreaView>
    </View>
  );
}
