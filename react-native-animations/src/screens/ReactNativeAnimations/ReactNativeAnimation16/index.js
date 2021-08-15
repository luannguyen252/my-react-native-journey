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

import BlurBackground from "../../../components/BlurBackground";

const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;
const AVATAR_SIZE = 56;
const ANIMATION_TYPE = "fadeInUp";
const ANIMATION_DELAY = 500;

const data = [
  {
    photo: require("../../../assets/backgrounds/1.jpg"),
    avatar: require("../../../assets/memoji/memoji-1.png"),
    title: "macOS Big Sur Wallpaper 1",
    caption: "Doing it all, in all new ways.",
    color: colors.red100,
  },
  {
    photo: require("../../../assets/backgrounds/2.jpg"),
    avatar: require("../../../assets/memoji/memoji-2.png"),
    title: "macOS Big Sur Wallpaper 2",
    caption: "Doing it all, in all new ways.",
    color: colors.blue100,
  },
  {
    photo: require("../../../assets/backgrounds/3.jpg"),
    avatar: require("../../../assets/memoji/memoji-3.png"),
    title: "macOS Big Sur Wallpaper 3",
    caption: "Doing it all, in all new ways.",
    color: colors.orange100,
  },
  {
    photo: require("../../../assets/backgrounds/4.jpg"),
    avatar: require("../../../assets/memoji/memoji-4.png"),
    title: "macOS Big Sur Wallpaper 4",
    caption: "Doing it all, in all new ways.",
    color: colors.green100,
  },
  {
    photo: require("../../../assets/backgrounds/5.jpg"),
    avatar: require("../../../assets/memoji/memoji-5.png"),
    title: "macOS Big Sur Wallpaper 5",
    caption: "Doing it all, in all new ways.",
    color: colors.violet100,
  },
  {
    photo: require("../../../assets/backgrounds/6.jpg"),
    avatar: require("../../../assets/memoji/memoji-6.png"),
    title: "macOS Big Sur Wallpaper 6",
    caption: "Doing it all, in all new ways.",
    color: colors.cyan100,
  },
  {
    photo: require("../../../assets/backgrounds/7.jpg"),
    avatar: require("../../../assets/memoji/memoji-7.png"),
    title: "macOS Big Sur Wallpaper 7",
    caption: "Doing it all, in all new ways.",
    color: colors.yellow100,
  },
  {
    photo: require("../../../assets/backgrounds/8.jpg"),
    avatar: require("../../../assets/memoji/memoji-8.png"),
    title: "macOS Big Sur Wallpaper 8",
    caption: "Doing it all, in all new ways.",
    color: colors.rose100,
  },
  {
    photo: require("../../../assets/backgrounds/9.jpg"),
    avatar: require("../../../assets/memoji/memoji-9.png"),
    title: "macOS Big Sur Wallpaper 9",
    caption: "Doing it all, in all new ways.",
    color: colors.lime100,
  },
  {
    photo: require("../../../assets/backgrounds/10.jpg"),
    avatar: require("../../../assets/memoji/memoji-10.png"),
    title: "macOS Big Sur Wallpaper 10",
    caption: "Doing it all, in all new ways.",
    color: colors.pink100,
  },
];

export default function ReactNativeAnimation16() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <BlurBackground>
      <StatusBar style="auto" />
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });

          return (
            <Animatable.View
              animation={ANIMATION_TYPE}
              delay={ANIMATION_DELAY}
              key={index}
              style={styles.cardContainer}
            >
              <View style={styles.card}>
                <View style={styles.thumbnailContainer}>
                  <Animatable.View
                    animation="fadeIn"
                    delay={ANIMATION_DELAY + 250}
                  >
                    <Animated.Image
                      source={item.photo}
                      style={{
                        width: ITEM_WIDTH * 1.4,
                        height: ITEM_HEIGHT,
                        resizeMode: "cover",
                        transform: [
                          {
                            translateX,
                          },
                        ],
                      }}
                    />
                  </Animatable.View>
                </View>
                <View style={styles.avatarTitleCaptionContainer}>
                  <Animatable.View
                    animation="zoomIn"
                    delay={ANIMATION_DELAY + 450}
                    style={[
                      styles.avatarContainer,
                      { backgroundColor: item.color },
                    ]}
                  >
                    <Animatable.View
                      animation="bounceIn"
                      delay={ANIMATION_DELAY + 1500}
                    >
                      <Image source={item.avatar} style={styles.avatar} />
                    </Animatable.View>
                  </Animatable.View>
                  <View style={styles.nameAndAgeContainer}>
                    <Animatable.View
                      animation="fadeIn"
                      delay={ANIMATION_DELAY + 950}
                    >
                      <Text style={styles.title} numberOfLines={1}>
                        {/* {item.title < 32
                        ? `${item.title}`
                        : `${item.title.substring(0, 36)}...`} */}
                        {item.title}
                      </Text>
                    </Animatable.View>
                    <Animatable.View
                      animation="fadeIn"
                      delay={ANIMATION_DELAY + 1250}
                    >
                      <Text style={styles.caption} numberOfLines={1}>
                        {/* {item.caption < 40
                        ? `${item.caption}`
                        : `${item.caption.substring(0, 36)}...`} */}
                        {item.caption}
                      </Text>
                    </Animatable.View>
                  </View>
                </View>
              </View>
            </Animatable.View>
          );
        }}
      />
    </BlurBackground>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    borderRadius: 16,
    padding: 8,
    backgroundColor: colors.white,
  },
  thumbnailContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    overflow: "hidden",
    alignItems: "center",
    borderRadius: 12,
  },
  avatarTitleCaptionContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: AVATAR_SIZE - 8,
    height: AVATAR_SIZE - 8,
    borderRadius: AVATAR_SIZE - 8,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: AVATAR_SIZE - 4,
    height: AVATAR_SIZE - 4,
  },
  nameAndAgeContainer: {
    flexDirection: "column",
    marginLeft: 8,
  },
  title: {
    color: colors.coolGray900,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
  },
  caption: {
    color: colors.coolGray400,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },
});
