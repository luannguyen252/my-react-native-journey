import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";

const DURATION = 300;

const fruits = [
  {
    key: "0",
    image: require("./assets/apple.png"),
    name: "Apple",
    txtColor: "#991B1B",
    bgColor: "#FEE2E2",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
  },
  {
    key: "1",
    image: require("./assets/avocado.png"),
    name: "Avocado",
    txtColor: "#065F46",
    bgColor: "#D1FAE5",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
  },
  {
    key: "2",
    image: require("./assets/banana.png"),
    name: "Banana",
    txtColor: "#92400E",
    bgColor: "#FEF3C7",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
  },
  {
    key: "3",
    image: require("./assets/blueberry.png"),
    name: "Blueberry",
    txtColor: "#6B21A8",
    bgColor: "#F3E8FF",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
  },
  {
    key: "4",
    image: require("./assets/green-lemon.png"),
    name: "Green Lemon",
    txtColor: "#3F6212",
    bgColor: "#ECFCCB",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
  },
  {
    key: "5",
    image: require("./assets/guava.png"),
    name: "Guava",
    txtColor: "#065F46",
    bgColor: "#D1FAE5",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
  },
  {
    key: "6",
    image: require("./assets/kiwi.png"),
    name: "Kiwi",
    txtColor: "#115E59",
    bgColor: "#CCFBF1",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
  },
  {
    key: "7",
    image: require("./assets/mango.png"),
    name: "Mango",
    txtColor: "#92400E",
    bgColor: "#FEF3C7",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
  },
  {
    key: "8",
    image: require("./assets/orange.png"),
    name: "Orange",
    txtColor: "#9A3412",
    bgColor: "#FFEDD5",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
  },
  {
    key: "9",
    image: require("./assets/strawberry.png"),
    name: "Strawberry",
    txtColor: "#9F1239",
    bgColor: "#FFE4E6",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
  },
];

const { width, height } = Dimensions.get("screen");

export default function ReactNativeAnimation2() {
  const navigation = useNavigation();

  // const [animation, setAnimation] = React.useState(new Animated.Value(0));

  // const startAnimation = () => {
  //   console.log(animation);
  //   Animated.timing(animation, {
  //     toValue: width,
  //     duration: 1500,
  //     useNativeDriver: false,
  //   }).start();
  // };

  // React.useEffect(() => startAnimation());

  // const animatedStyles = {
  //   width: animation,
  // };

  return (
    <View style={styles.container}>
      <FlatList
        data={fruits}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("React Native Animation 2 Details", {
                  item,
                });
              }}
            >
              <View style={styles.itemContainer}>
                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    // { backgroundColor: item.bgColor },
                    styles.itemBackground,
                  ]}
                >
                  <View style={styles.itemTitleAndDescriptionContainer}>
                    <Animatable.View
                      animation="fadeInUp"
                      delay={index * DURATION * 1.75}
                    >
                      <Text
                        style={[
                          globalStyles.title,
                          { color: item.txtColor },
                          styles.itemTitle,
                        ]}
                      >
                        {item.name}
                      </Text>
                    </Animatable.View>
                    <Animatable.View
                      animation="fadeInUp"
                      delay={index * DURATION * 2}
                    >
                      <Text
                        style={[
                          globalStyles.bodyText,
                          styles.itemDescription,
                          { color: item.txtColor },
                        ]}
                      >
                        {item.description}
                      </Text>
                    </Animatable.View>
                  </View>
                  <Animatable.View
                    animation="fadeInRight"
                    delay={DURATION * 2.5 * index}
                    style={styles.itemPhotoContainer}
                  >
                    <Image source={item.image} style={styles.itemPhoto} />
                  </Animatable.View>
                  {/* <Animated.View
                    style={[
                      styles.itemBackground,
                      styles.itemBackgroundInner,
                      animatedStyles,
                      {
                        backgroundColor: item.bgColor,
                      },
                    ]}
                  /> */}
                  <Animatable.View
                    animation="fadeInUp"
                    delay={DURATION * 1.5 * index}
                    style={[
                      styles.itemBackground,
                      styles.itemBackgroundInner,
                      {
                        backgroundColor: item.bgColor,
                      },
                    ]}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
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
    position: "relative",
    overflow: "hidden",
  },
  itemBackground: {
    position: "relative",
    height: height / 5,
    overflow: "hidden",
  },
  itemBackgroundInner: {
    zIndex: -1,
    position: "absolute",
    top: 0,
    width: width,
  },
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
