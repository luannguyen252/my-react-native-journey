import { SharedElement } from "react-native-shared-element";
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
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";

const { width, height } = Dimensions.get("screen");
const buttons = ["Get a free service", "Save 10% and buy now"];
const types = ["red", "green", "blue", "black", "yellow", "orange"];

export default function SharedElementTransitionReactNavigationDetails({
  route,
}) {
  const { item } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <SharedElement id={`item.${item.key}.image`}>
        <Image source={item.image} style={styles.image} />
      </SharedElement>
      <View style={styles.meta}>
        <SharedElement id={`item.${item.key}.name`}>
          <Text
            style={[globalStyles.title, { color: item.txtColor }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {item.name}
          </Text>
        </SharedElement>
        <SharedElement id={`item.${item.key}.description`}>
          <Text
            style={[
              globalStyles.bodyText,
              { color: item.txtColor, opacity: 0.8, paddingLeft: 16 },
            ]}
          >
            {item.description}
          </Text>
        </SharedElement>
      </View>
      <View style={styles.switchContainer}>
        {types.map((type, index) => {
          return (
            <View
              key={index}
              style={[styles.switchItem, { backgroundColor: type }]}
            />
          );
        })}
      </View>
      {buttons.map((text, index) => {
        return (
          <TouchableOpacity
            onPress={() => {}}
            key={index}
            style={styles.cellNavigation}
          >
            <Text
              style={[globalStyles.bodyText, { color: colors.coolGray900 }]}
            >
              {text} →
            </Text>
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
    top: 0,
    left: 0,
    width: width * 0.6,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  switchItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  cellNavigation: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
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
