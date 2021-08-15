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
import styles from "./styles";
import { bg } from "./assets";

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      "women",
      "men",
    ])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});
const { width, height } = Dimensions.get("screen");
const DURATION = 500;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const BG_IMAGE = bg;

export default function ReactNativeAnimation6() {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Image
        source={bg}
        style={[
          StyleSheet.absoluteFillObject,
          { width: width, height: height, resizeMode: "cover" },
        ]}
        blurRadius={50}
      />

      <Animated.FlatList
        data={DATA}
        // Declare onScroll behaviour events
        onScroll={
          (console.log("Scrolling..."),
          Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
          }))
        }
        keyExtractor={(item) => item.key}
        contentContainerStyle={{
          padding: SPACING,
          // paddingTop: StatusBar.currentHeight || 50,
        }}
        renderItem={({ item, index }) => {
          // BEGIN: Input and output range for scale animated
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          // END: Input and output range for scale animated

          // BEGIN: Input and output range for opacity animated
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.5),
          ];

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          // END: Input and output range for opacity animated

          return (
            <Animated.View
              style={{
                flexDirection: "row",
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderWidth: 1,
                borderColor: colors.white,
                borderRadius: SPACING - 4,
                shadowColor: colors.black,
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.15,
                shadowRadius: 20,
                transform: [{ scale }], // Call scale animated styles
                opacity: opacity, // Call opacity animated styles
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <View style={{}}>
                <Text style={{ fontSize: 22, fontWeight: "700" }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 18, opacity: 0.7 }}>
                  {item.jobTitle}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    opacity: 0.8,
                    color: colors.blue600,
                  }}
                >
                  {item.email}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}
