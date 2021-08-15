import React, { useRef } from "react";
import { StyleSheet, Dimensions, Animated } from "react-native";

import { Box, Text } from "../../components";
import theme from "../Theme";
import Banner from "./Banner";
import { CARD_MARGIN } from "./Banner";
import { BannerProps } from "../../../types";

const { width } = Dimensions.get("window");
const SLIDE_WIDTH = width - theme.spacing.xl * 2;
export const SLIDE_HEIGHT = 230;

const styles = StyleSheet.create({
  container: {
    height: SLIDE_HEIGHT,
    width: SLIDE_WIDTH,
    position: "relative",
  },
  pagination: {
    position: "absolute",
    top: 215,
    width: "100%",
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    marginHorizontal: 3,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
});

interface BannerSliderProps {
  banners: BannerProps[];
}

const BannerSlider = ({ banners }: BannerSliderProps) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <Box style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={SLIDE_WIDTH + CARD_MARGIN}
        decelerationRate={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{
          justifyContent: "center",
          paddingRight: 50,
        }}
      >
        {banners.map(({ image }, index) => {
          return <Banner key={index} image={image} margin />;
        })}
      </Animated.ScrollView>
      <Box style={styles.pagination}>
        {banners.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });

          return (
            <Animated.View key={index} style={{ ...styles.dot, opacity }} />
          );
        })}
      </Box>
    </Box>
  );
};

export default BannerSlider;

// TODO

// Consider taking pagination to its own component
