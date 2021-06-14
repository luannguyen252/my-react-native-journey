import { SharedElement } from "react-native-shared-element";
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

const items = [
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

export default function SharedElementExample({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{}}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate("Shared Element Example Details", { item });
            }}
          >
            <SharedElement id={`${item.color}`}>
              <Animatable.View
                animation="fadeInUp"
                delay={index * 1000}
                style={[styles.item, { backgroundColor: item.color }]}
              >
                <SharedElement id={`${item.name}`}>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "700",
                    }}
                  >
                    {item.name}
                  </Text>
                </SharedElement>
              </Animatable.View>
            </SharedElement>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACING },
  item: {
    width: 300,
    height: 100,
    borderRadius: 8,
    marginBottom: SPACING,
    justifyContent: "center",
    alignItems: "center",
  },
});
