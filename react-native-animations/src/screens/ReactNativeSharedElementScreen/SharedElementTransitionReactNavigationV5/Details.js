import * as Animatable from "react-native-animatable";
import { SharedElement } from "react-native-shared-element";
import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";

const { width, height } = Dimensions.get("screen");

export default function SharedElementTransitionReactNavigationV5Details({
  route,
}) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={{}}>
        <View style={styles.itemTitleAndDescriptionContainer}>
          <Animatable.View animation="fadeInUp" delay={100}>
            <SharedElement id={`item.${item.key}.name`}>
              <Text
                style={[
                  globalStyles.title,
                  { color: item.txtColor },
                  styles.itemTitle,
                ]}
              >
                {item.name}
              </Text>
            </SharedElement>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" delay={200}>
            <SharedElement id={`item.${item.key}.description`}>
              <Text
                style={[
                  globalStyles.bodyText,
                  styles.itemDescription,
                  { color: item.txtColor },
                ]}
              >
                {item.description}
              </Text>
            </SharedElement>
          </Animatable.View>
        </View>
        <Animatable.View
          animation="fadeInRight"
          delay={300}
          style={styles.itemPhotoContainer}
        >
          <SharedElement id={`item.${item.key}.image`}>
            <Image source={item.image} style={styles.itemPhoto} />
          </SharedElement>
        </Animatable.View>
      </View>

      <View style={{}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    width: width,
  },
  itemContainer: {
    height: height / 5,
  },
  itemBackground: {},
  itemTitleAndDescriptionContainer: {
    width: width / 1.5,
  },
  itemTitle: {},
  itemDescription: {
    paddingLeft: 16,
    paddingRight: 16,
    opacity: 0.6,
  },
  itemPhotoContainer: {
    resizeMode: "contain",
    position: "absolute",
    top: 16,
    right: -80,
    zIndex: 1,
  },
  itemPhoto: {
    width: width / 2,
    height: width / 2,
  },
});

SharedElementTransitionReactNavigationV5Details.sharedElements = (route) => {
  const { item } = route.params;

  return [
    {
      id: `item.${item.key}.name`,
    },
    {
      id: `item.${item.key}.description`,
    },
    {
      id: `item.${item.key}.image`,
    },
  ];
};
