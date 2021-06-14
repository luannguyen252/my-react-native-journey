import { SharedElement } from "react-native-shared-element";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

const { width, height } = Dimensions.get("screen");
const SPACING = 16;
const buttons = ["Get a free service", "Save 10% and buy now"];
const colors = ["red", "green", "blue", "black", "yellow", "orange"];

export default function SharedElementTransitionReactNavigationDetails({
  route,
}) {
  const navigation = useNavigation();
  const { item } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text>Back</Text>
      </TouchableOpacity>
      <SharedElement id={`item.${item.key}.image`}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </SharedElement>
      <View style={styles.meta}>
        <SharedElement id={`item.${item.key}.name`}>
          <Text style={styles.name}>{item.name}</Text>
        </SharedElement>
        <SharedElement id={`item.${item.key}.description`}>
          <Text style={styles.description}>{item.description}</Text>
        </SharedElement>
      </View>
      <ScrollView
        horizontal
        style={{ flexGrow: 0 }}
        contentContainerStyle={{ padding: SPACING }}
        showsHorizontalScrollIndicator={false}
      >
        {colors.map((color, index) => {
          return (
            <View
              key={index}
              style={[styles.switch, { backgroundColor: color }]}
            />
          );
        })}
      </ScrollView>
      {buttons.map((text, index) => {
        return (
          <TouchableOpacity onPress={() => {}} key={index}>
            <Text>{text}</Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width * 2.1,
    height: width,
    resizeMode: "contain",
  },
  meta: {
    position: "absolute",
    top: SPACING * 4,
    left: SPACING,
    width: width * 0.6,
  },
  name: {
    fontSize: 22,
  },
  description: { fontSize: 12 },
  switch: { width: 48, height: 48 },
});

SharedElementTransitionReactNavigationDetails.sharedElement = (
  route,
  otherRoute,
  showing
) => {
  const { item } = route.params;

  return [
    {
      id: `item.${item.key}.image`,
    },
    {
      id: `item.${item.key}.name`,
    },
    {
      id: `item.${item.key}.description`,
    },
  ];
};
