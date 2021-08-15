import * as Animatable from "react-native-animatable";
import { SharedElement } from "react-native-shared-element";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const data = [
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

export default function SharedElementTransitionReactNavigation() {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.white }}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView>
        <FlatList
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate(
                    "Shared Element Transition React Navigation Details",
                    { item }
                  );
                }}
              >
                <Animatable.View
                  animation="fadeInUp"
                  delay={index * 300}
                  style={[styles.item, { backgroundColor: item.bgColor }]}
                >
                  <View style={{ width: windowWidth / 2.5 }}>
                    <SharedElement id={`item.${item.key}.name`}>
                      <Text
                        style={[
                          globalStyles.subTitle,
                          { color: item.txtColor },
                        ]}
                      >
                        {item.name}
                      </Text>
                    </SharedElement>
                    <SharedElement id={`item.${item.key}.description`}>
                      <Text
                        style={[
                          globalStyles.footNote,
                          { color: item.txtColor, opacity: 0.8 },
                        ]}
                      >
                        {item.description}
                      </Text>
                    </SharedElement>
                  </View>
                  <View>
                    <SharedElement id={`item.${item.key}.image`}>
                      <Image source={item.image} style={styles.image} />
                    </SharedElement>
                  </View>
                </Animatable.View>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 120,
    borderRadius: 12,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    backgroundColor: colors.orange100,
    overflow: "hidden",
  },
  image: {
    height: 120,
    width: "100%",
    resizeMode: "center",
    position: "absolute",
    bottom: 16,
    right: "-40%",
  },
});
