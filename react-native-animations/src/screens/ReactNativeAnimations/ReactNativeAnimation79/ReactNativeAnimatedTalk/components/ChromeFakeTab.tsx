import React, { FunctionComponent } from "react";
import { View, StyleSheet, Text } from "react-native";
type Props = {
  index: number;
};
const FakeTab: FunctionComponent<Props> = ({ index }) => {
  return (
    <View style={[styles.container]} pointerEvents="none">
      <View style={[styles.url]}>
        <Text>{index} - http://instagram.com/ankeetmaini</Text>
      </View>
      <View style={styles.body}>
        <Text style={{ fontSize: 50 }}>{index}</Text>
      </View>
    </View>
  );
};

export default FakeTab;

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
    margin: 40
  },
  url: {
    borderColor: "#afafaf",
    borderWidth: 1,
    height: 30,
    padding: 8
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
