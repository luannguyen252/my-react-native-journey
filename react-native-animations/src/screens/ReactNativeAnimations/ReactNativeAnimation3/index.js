import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
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

export default function ReactNativeAnimation3() {
  const navigation = useNavigation();

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
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate("React Native Animation 3 Details", {
                      item,
                    });
                  }}
                >
                  <Animatable.View
                    animation="fadeInRight"
                    delay={index * DURATION}
                    style={[styles.item, { backgroundColor: item.bgColor }]}
                  >
                    <Animatable.View
                      animation="fadeInUp"
                      delay={index * DURATION + 50}
                      style={{
                        width: width / 2,
                        height: 128,
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={[
                          globalStyles.subTitle,
                          { color: item.txtColor },
                        ]}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={[
                          globalStyles.bodyText,
                          {
                            color: item.txtColor,
                            fontSize: 22,
                            paddingBottom: 24,
                          },
                        ]}
                      >
                        {item.price}$
                      </Text>
                    </Animatable.View>
                    <Animatable.View
                      animation="fadeInRight"
                      delay={index * DURATION + 200}
                    >
                      <Image source={item.image} style={styles.image} />
                    </Animatable.View>
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
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate("React Native Animation 3 Details", {
                    item,
                  });
                }}
              >
                <Animatable.View
                  key={index}
                  animation="fadeInRight"
                  delay={index * DURATION}
                  style={[
                    styles.bgBox,
                    {
                      backgroundColor: item.bgColor,
                      position: "relative",
                      overflow: "hidden",
                    },
                  ]}
                >
                  <Animatable.View
                    animation="fadeInUp"
                    delay={index * DURATION + 100}
                  >
                    <Text
                      style={[
                        globalStyles.bodyText,
                        styles.txtBox,
                        { color: item.txtColor, paddingBottom: 64 },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </Animatable.View>
                  <Animatable.View
                    animation="fadeInUp"
                    delay={index * DURATION + 250}
                    style={{
                      position: "absolute",
                      bottom: -40,
                      right: -40,
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{
                        width: 120,
                        height: 120,
                        resizeMode: "contain",
                      }}
                    />
                  </Animatable.View>
                </Animatable.View>
              </TouchableOpacity>
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
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate("React Native Animation 3 Details", {
                    item,
                  });
                }}
              >
                <Animatable.View
                  key={index}
                  animation="fadeInRight"
                  delay={index * DURATION}
                  style={[
                    styles.bgBox,
                    styles.bgBoxLarge,
                    {
                      backgroundColor: item.bgColor,
                      position: "relative",
                      overflow: "hidden",
                    },
                  ]}
                >
                  <Animatable.View
                    animation="fadeInUp"
                    delay={index * DURATION + 150}
                  >
                    <Text
                      style={[
                        globalStyles.subTitle,
                        styles.txtBox,
                        { color: item.txtColor, paddingBottom: 80 },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </Animatable.View>
                  <Animatable.View
                    animation="fadeInUp"
                    delay={index * DURATION + 300}
                    style={{
                      position: "absolute",
                      bottom: -40,
                      right: -40,
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{
                        width: 144,
                        height: 144,
                        resizeMode: "contain",
                      }}
                    />
                  </Animatable.View>
                </Animatable.View>
              </TouchableOpacity>
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
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate("React Native Animation 3 Details", {
                    item,
                  });
                }}
              >
                <Animatable.View
                  key={index}
                  animation="fadeInRight"
                  delay={index * DURATION}
                  style={[
                    styles.bgBox,
                    styles.bgBoxSmall,
                    {
                      backgroundColor: item.bgColor,
                      position: "relative",
                      overflow: "hidden",
                    },
                  ]}
                >
                  <Animatable.View
                    animation="fadeInUp"
                    delay={index * DURATION + 250}
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
                  <Animatable.View
                    animation="fadeInUp"
                    delay={index * DURATION + 350}
                    style={{ position: "absolute", bottom: -40, right: -40 }}
                  >
                    <Image
                      source={item.image}
                      style={{
                        width: 120,
                        height: 120,
                        resizeMode: "contain",
                      }}
                    />
                  </Animatable.View>
                </Animatable.View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* END: Small */}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
