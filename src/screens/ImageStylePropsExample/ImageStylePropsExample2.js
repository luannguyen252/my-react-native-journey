import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const ImageStylePropsExample2 = () => (
  <View style={styles.container}>
    <View>
      <Image
        style={{
          borderTopRightRadius: 20,
          height: 100,
          width: 200,
        }}
        source={require("@expo/snack-static/react-native-logo.png")}
      />
      <Text>borderTopRightRadius</Text>
    </View>
    <View>
      <Image
        style={{
          borderBottomRightRadius: 20,
          height: 100,
          width: 200,
        }}
        source={require("@expo/snack-static/react-native-logo.png")}
      />
      <Text>borderBottomRightRadius</Text>
    </View>
    <View>
      <Image
        style={{
          borderBottomLeftRadius: 20,
          height: 100,
          width: 200,
        }}
        source={require("@expo/snack-static/react-native-logo.png")}
      />
      <Text>borderBottomLeftRadius</Text>
    </View>
    <View>
      <Image
        style={{
          borderTopLeftRadius: 20,
          height: 100,
          width: 200,
        }}
        source={require("@expo/snack-static/react-native-logo.png")}
      />
      <Text>borderTopLeftRadius</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    textAlign: "center",
  },
});

export default ImageStylePropsExample2;
