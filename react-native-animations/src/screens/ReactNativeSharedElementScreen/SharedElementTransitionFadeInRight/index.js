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
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import styles from "./styles";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
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

export default function SharedElementTransitionFadeInRight() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
            keyExtractor={(item) => item.key}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => console.log(`${item.name} is Pressed.`)}
                >
                  <Animatable.View
                    animation="fadeInRight"
                    delay={index * DURATION}
                    style={[styles.item, { backgroundColor: item.bgColor }]}
                  >
                    <View style={{ width: windowWidth / 2, height: 128 }}>
                      <Text
                        style={[
                          globalStyles.subTitle,
                          { color: item.txtColor },
                        ]}
                      >
                        {item.name}
                      </Text>
                    </View>
                    <View>
                      <Image source={item.image} style={styles.image} />
                    </View>
                  </Animatable.View>
                </TouchableOpacity>
              );
            }}
          />

          {/* BEGIN: Default */}
          <ScrollView
            style={styles.scrollViewContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 16,
              paddingLeft: 16,
              paddingBottom: 16,
            }}
          >
            {data.map((item, index) => (
              <Animatable.View
                key={index}
                animation="fadeInRight"
                delay={index * DURATION}
                style={[styles.bgBox, { backgroundColor: item.bgColor }]}
              >
                <Text
                  style={[
                    globalStyles.bodyText,
                    styles.txtBox,
                    { color: item.txtColor },
                  ]}
                >
                  {item.name}
                </Text>
              </Animatable.View>
            ))}
          </ScrollView>
          {/* END: Default */}

          {/* BEGIN: Large */}
          <ScrollView
            style={styles.scrollViewContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 16,
              paddingBottom: 16,
            }}
          >
            {data.map((item, index) => (
              <Animatable.View
                key={index}
                animation="fadeInRight"
                delay={index * DURATION}
                style={[
                  styles.bgBox,
                  styles.bgBoxLarge,
                  { backgroundColor: item.bgColor },
                ]}
              >
                <Text
                  style={[
                    globalStyles.bodyText,
                    styles.txtBox,
                    { color: item.txtColor },
                  ]}
                >
                  {item.name}
                </Text>
              </Animatable.View>
            ))}
          </ScrollView>
          {/* END: Large */}

          {/* BEGIN: Small */}
          <ScrollView
            style={styles.scrollViewContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 16,
              paddingBottom: 16,
            }}
          >
            {data.map((item, index) => (
              <Animatable.View
                key={index}
                animation="fadeInRight"
                delay={index * DURATION}
                style={[
                  styles.bgBox,
                  styles.bgBoxSmall,
                  { backgroundColor: item.bgColor },
                ]}
              >
                <Text
                  style={[
                    globalStyles.bodyText,
                    styles.txtBox,
                    { color: item.txtColor },
                  ]}
                >
                  {item.name}
                </Text>
              </Animatable.View>
            ))}
          </ScrollView>
          {/* END: Small */}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
