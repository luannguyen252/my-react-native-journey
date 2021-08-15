import { FlatGrid } from "./ReactNativeSuperGrid";
import faker from "faker";
import { MotiView } from "moti";
import * as Animatable from "react-native-animatable";
import * as React from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  StatusBar,
  Animated,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";
// import styles from "./styles";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;

const data = [
  {
    key: "0",
    image: require("./assets/apple.png"),
    name: "Apple",
    txtColor: "#991B1B",
    bgColor: "#FEE2E2",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
    price: "1.5",
  },
  {
    key: "1",
    image: require("./assets/avocado.png"),
    name: "Avocado",
    txtColor: "#065F46",
    bgColor: "#D1FAE5",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
    price: "1.25",
  },
  {
    key: "2",
    image: require("./assets/banana.png"),
    name: "Banana",
    txtColor: "#92400E",
    bgColor: "#FEF3C7",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
    price: "0.75",
  },
  {
    key: "3",
    image: require("./assets/blueberry.png"),
    name: "Blueberry",
    txtColor: "#6B21A8",
    bgColor: "#F3E8FF",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
    price: "2.5",
  },
  {
    key: "4",
    image: require("./assets/green-lemon.png"),
    name: "Green Lemon",
    txtColor: "#3F6212",
    bgColor: "#ECFCCB",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
    price: "0.75",
  },
  {
    key: "5",
    image: require("./assets/guava.png"),
    name: "Guava",
    txtColor: "#065F46",
    bgColor: "#D1FAE5",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
    price: "0.65",
  },
  {
    key: "6",
    image: require("./assets/kiwi.png"),
    name: "Kiwi",
    txtColor: "#115E59",
    bgColor: "#CCFBF1",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
    price: "2.75",
  },
  {
    key: "7",
    image: require("./assets/mango.png"),
    name: "Mango",
    txtColor: "#92400E",
    bgColor: "#FEF3C7",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
    price: "1.25",
  },
  {
    key: "8",
    image: require("./assets/orange.png"),
    name: "Orange",
    txtColor: "#9A3412",
    bgColor: "#FFEDD5",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
    price: "1.05",
  },
  {
    key: "9",
    image: require("./assets/strawberry.png"),
    name: "Strawberry",
    txtColor: "#9F1239",
    bgColor: "#FFE4E6",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram.",
    price: "2.5",
  },
];

export default function ReactNativeAnimation4() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <FlatGrid
            itemDimension={130}
            data={data}
            style={styles.gridView}
            spacing={16}
            renderItem={({ item, index }) => (
              <Animatable.View
                animation="fadeInUp"
                delay={(DURATION + 15) * index}
                key={index}
                style={[
                  styles.itemContainer,
                  { backgroundColor: item.bgColor },
                ]}
              >
                <View style={styles.itemNameAndPriceContainer}>
                  <Animatable.Text
                    animation="fadeInUp"
                    delay={(DURATION + 25) * index}
                    style={[
                      globalStyles.subTitle,
                      styles.itemName,
                      { color: item.txtColor },
                    ]}
                  >
                    {item.name}
                  </Animatable.Text>
                  <Animatable.Text
                    animation="fadeInUp"
                    delay={(DURATION + 125) * index}
                    style={[
                      globalStyles.bodyText,
                      styles.itemPrice,
                      { color: item.txtColor },
                    ]}
                  >
                    {item.price}$/KG
                  </Animatable.Text>
                </View>
                <Animatable.View
                  animation="fadeInRight"
                  delay={(DURATION + 250) * index}
                  style={styles.itemItemContainer}
                >
                  <Image source={item.image} style={styles.itemImage} />
                </Animatable.View>
              </Animatable.View>
            )}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewContainer: {},
  gridView: {
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 16,
    height: 150,
    position: "relative",
    overflow: "hidden",
  },
  itemNameAndPriceContainer: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  itemName: {},
  itemPrice: {
    fontWeight: "500",
    paddingTop: 8,
  },
  itemItemContainer: {
    position: "absolute",
    zIndex: -1,
    top: 40,
    right: -40,
  },
  itemImage: {
    width: width / 3,
    height: width / 3,
    resizeMode: "contain",
  },
});
