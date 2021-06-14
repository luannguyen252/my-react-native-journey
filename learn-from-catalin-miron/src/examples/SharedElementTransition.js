import * as Animatable from "react-native-animatable";
import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("screen");
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

const fruits = [
  {
    name: "Apple",
    color: "#EF4444",
  },
  {
    name: "Orange",
    color: "#F97316",
  },
  {
    name: "Banana",
    color: "#EAB308",
  },
  {
    name: "Pineapple",
    color: "#F59E0B",
  },
  {
    name: "Strawberry",
    color: "#E11D48",
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

      <View style={{}}>
        {fruits.map((fruit, index) => (
          <Animatable.View
            animation="fadeInUp"
            delay={index * 1000}
            key={index}
            style={[styles.fruit, { backgroundColor: fruit.color }]}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700" }}>
              {fruit.name}
            </Text>
          </Animatable.View>
        ))}
      </View>
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
  fruit: {
    width: 300,
    height: 100,
    borderRadius: 8,
    marginBottom: SPACING,
    justifyContent: "center",
    alignItems: "center",
  },
});
