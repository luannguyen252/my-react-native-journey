import * as React from "react";
import { Button, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Details() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

export default Details;
