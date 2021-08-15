import * as Animatable from "react-native-animatable";
import * as React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import colors from "../../../assets/styles/colors";

const colorTypes = [
  {
    name: colors.red500,
  },
  {
    name: colors.green500,
  },
  {
    name: colors.blue500,
  },
  {
    name: colors.orange500,
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
    color: colors.red500,
  },
  {
    name: "Orange",
    color: colors.orange500,
  },
  {
    name: "Banana",
    color: colors.yellow500,
  },
  {
    name: "Kiwi",
    color: colors.green500,
  },
  {
    name: "Blueberry",
    color: colors.purple500,
  },
];

export default function SharedElementTransition() {
  return (
    <View style={styles.container}>
      <View style={styles.colorContainer}>
        {colorTypes.map((color, index) => (
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
          animation="fadeInDown"
          delay={index * 1000}
          key={index}
          style={styles.name}
        >
          {person.name}
        </Animatable.Text>
      ))}

      <View style={{ flexDirection: "column" }}>
        {fruits.map((fruit, index) => (
          <Animatable.View
            animation="fadeInUp"
            delay={index * 1000}
            key={index}
            style={[styles.fruit, { backgroundColor: fruit.color }]}
          >
            <Text style={styles.fruitName}>{fruit.name}</Text>
          </Animatable.View>
        ))}
      </View>
    </View>
  );
}
