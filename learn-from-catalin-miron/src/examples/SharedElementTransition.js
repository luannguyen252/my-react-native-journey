import * as Animatable from "react-native-animatable";
import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SPACING = 16;

const colors = [
  {
    name: "red",
  },
  {
    name: "green",
  },
  {
    name: "blue",
  },
  {
    name: "orange",
  },
];

const persons = [
  {
    name: "Luan Nguyen",
  },
  {
    name: "Steve Jobs",
  },
  {
    name: "Tim Cook",
  },
  {
    name: "Craig Federighi",
  },
];

export default function SharedElementTransition() {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          marginBottom: SPACING,
          justifyContent: "space-evenly",
        }}
      >
        {colors.map((color, index) => (
          <Animatable.View
            animation="bounceIn"
            delay={index * 1000}
            key={index}
            style={[styles.color, { backgroundColor: color.name }]}
          />
        ))}
      </View>

      {persons.map((person, index) => (
        <Animatable.Text
          animation="fadeInUp"
          delay={index * 1000}
          key={index}
          style={styles.name}
        >
          {person.name}
        </Animatable.Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACING },
  color: { width: 48, height: 48, borderRadius: 24 },
  name: {
    marginBottom: SPACING,
    fontSize: 16,
    fontWeight: "700",
  },
});
