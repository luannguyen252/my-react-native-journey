import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../assets/styles/globalStyles";
import colors from "../../assets/styles/colors";
import styles from "./styles";
import { Button } from "../../components";

export default function FifthScreen() {
  const navigation = useNavigation();

  return (
    <View
      style={[globalStyles.container, { backgroundColor: colors.coolGray50 }]}
    >
      <SafeAreaView>
        <StatusBar style="auto" />
        <Text style={globalStyles.title}>Khác</Text>
        <View style={styles.container}>
          {/* BEGIN: Call To Action */}
          <Button
            title="Xem chi tiết"
            onPress={() =>
              navigation.navigate("Details", {
                paramName: "Thông tin chi tiết",
              })
            }
          />
          {/* BEGIN: Call To Action */}
        </View>
      </SafeAreaView>
    </View>
  );
}
