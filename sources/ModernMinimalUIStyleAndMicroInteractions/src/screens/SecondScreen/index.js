import React from "react";
import { View, Text, SafeAreaView, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

export default function SecondScreen() {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.container}>
      <SafeAreaView>
        <StatusBar style="auto" />
        <Text style={globalStyles.title}>Second Screen</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 16,
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 16,
          }}
        >
          <Button
            title="Details With Passing Parameters"
            onPress={() =>
              navigation.navigate("Details", {
                paramName: "Hello World!",
              })
            }
          />
          <Button
            title="Lottie React Native"
            onPress={() => navigation.navigate("Lottie React Native")}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
