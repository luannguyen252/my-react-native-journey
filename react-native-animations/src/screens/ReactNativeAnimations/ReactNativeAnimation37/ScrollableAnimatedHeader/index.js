import * as Animatable from "react-native-animatable";
import React, { useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  Text,
  Animated,
  StatusBar,
} from "react-native";
import colors from "../../../../assets/styles/colors";

const { width: WIDTH_SCREEN, height: HEIGHT_SCREEN } = Dimensions.get("screen");
const HEADER_MAX_HEIGHT = 240;
const HEADER_MIN_HEIGHT = 96;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const ANIMATION_DELAY = 500;
const TITLE_SCREEN = "Contacts";

const DATA = [
  {
    id: "1",
    avatar: require("../../../../assets/memoji/memoji-1.png"),
    fullName: "Claire Ray",
    emailAddress: "claire.ray@example.com",
    color: "#FFEDD5",
  },
  {
    id: "2",
    avatar: require("../../../../assets/memoji/memoji-2.png"),
    fullName: "Lesa Harris",
    emailAddress: "lesa.harris@example.com",
    color: "#FEE2E2",
  },
  {
    id: "3",
    avatar: require("../../../../assets/memoji/memoji-3.png"),
    fullName: "Bonnie Ramirez",
    emailAddress: "bonnie.ramirez@example.com",
    color: "#CCFBF1",
  },
  {
    id: "4",
    avatar: require("../../../../assets/memoji/memoji-4.png"),
    fullName: "Theresa Romero",
    emailAddress: "theresa.romero@example.com",
    color: "#E0E7FF",
  },
  {
    id: "5",
    avatar: require("../../../../assets/memoji/memoji-5.png"),
    fullName: "Noelle Green",
    emailAddress: "noelle.green@example.com",
    color: "#DBEAFE",
  },
  {
    id: "6",
    avatar: require("../../../../assets/memoji/memoji-6.png"),
    fullName: "Claire Moreno",
    emailAddress: "claire.moreno@example.com",
    color: "#FAE8FF",
  },
  {
    id: "7",
    avatar: require("../../../../assets/memoji/memoji-7.png"),
    fullName: "Sara Reid",
    emailAddress: "sara.reid@example.com",
    color: "#FEF3C7",
  },
  {
    id: "8",
    avatar: require("../../../../assets/memoji/memoji-8.png"),
    fullName: "Don Anderson",
    emailAddress: "don.anderson@example.com",
    color: "#F3E8FF",
  },
  {
    id: "9",
    avatar: require("../../../../assets/memoji/memoji-9.png"),
    fullName: "Katherine Castro",
    emailAddress: "katherine.castro@example.com",
    color: "#DBEAFE",
  },
  {
    id: "10",
    avatar: require("../../../../assets/memoji/memoji-10.png"),
    fullName: "Connor Young",
    emailAddress: "connor.young@example.com",
    color: "#DCFCE7",
  },
];

export default function ScrollableAnimatedHeader() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: "clamp",
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.8],
    extrapolate: "clamp",
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: "clamp",
  });

  const renderListItem = (item, index) => (
    <Animatable.View
      animation="fadeInUp"
      delay={ANIMATION_DELAY + (index * ANIMATION_DELAY) / 2}
      key={item.id}
      style={styles.card}
    >
      <Animatable.View
        animation="fadeInUp"
        delay={ANIMATION_DELAY + (index * ANIMATION_DELAY) / 2 + 100}
        style={{ backgroundColor: item.color, borderRadius: 56 / 2 }}
      >
        <Image
          style={styles.avatar}
          source={item.avatar}
          resizeMode="contain"
        />
      </Animatable.View>
      <Animatable.View
        animation="fadeInUp"
        delay={ANIMATION_DELAY + (index * ANIMATION_DELAY) / 2 + 200}
        style={{ flexDirection: "column", marginLeft: 16 }}
      >
        <Animatable.Text
          animation="fadeInUp"
          delay={ANIMATION_DELAY + (index * ANIMATION_DELAY) / 2 + 300}
          style={styles.fullNameText}
        >
          {item.fullName}
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInUp"
          delay={ANIMATION_DELAY + (index * ANIMATION_DELAY) / 2 + 400}
          style={styles.emailAddressText}
        >
          {item.emailAddress}
        </Animatable.Text>
      </Animatable.View>
    </Animatable.View>
  );

  return (
    <View style={styles.saveArea}>
      <StatusBar barStyle="light-content" />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: HEADER_MAX_HEIGHT - 0,
          paddingBottom: 72,
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {DATA.map(renderListItem)}
      </Animated.ScrollView>

      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslateY }] },
        ]}
      >
        <Animated.Image
          style={[
            styles.headerBackground,
            {
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslateY }],
            },
          ]}
          source={require("./assets/monterey.jpg")}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.topBar,
          {
            transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
          },
        ]}
      >
        <Text style={styles.title}>{TITLE_SCREEN}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    marginTop: 16,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT,
    backgroundColor: colors.violet600,
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: "cover",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    height: HEADER_MAX_HEIGHT / 1.6,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    color: colors.white,
  },
  avatar: {
    height: 56,
    width: 56,
    resizeMode: "contain",
    borderRadius: 56 / 2,
  },
  fullNameText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    textAlign: "left",
    color: colors.coolGray900,
    paddingBottom: 4,
  },
  emailAddressText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    textAlign: "left",
    color: colors.coolGray500,
  },
});
