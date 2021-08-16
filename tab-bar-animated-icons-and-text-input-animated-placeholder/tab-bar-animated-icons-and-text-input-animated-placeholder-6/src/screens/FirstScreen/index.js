import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import colors from "../../assets/styles/colors";
import styles from "./styles";

export default function FirstScreen() {
  return (
    <View
      style={[globalStyles.container, { backgroundColor: colors.coolGray50 }]}
    >
      <SafeAreaView>
        <StatusBar style="auto" />
        <Text style={globalStyles.title}>Trang chủ</Text>
        <View style={styles.container}></View>
      </SafeAreaView>
    </View>
  );
}
