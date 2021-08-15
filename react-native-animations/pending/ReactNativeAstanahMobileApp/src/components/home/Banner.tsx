import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { Box, Text } from "../../components";
import theme from "../Theme";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width - theme.spacing.xl * 2;
export const CARD_MARGIN = 20;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: theme.spacing.s,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

interface BannerProps {
  image: number;
  onPress?: () => void;
  margin?: boolean;
  width?: number;
  height?: number;
}

const Banner = ({ image, onPress, margin, width, height }: BannerProps) => {
  const marginNo = margin ? CARD_MARGIN : 0;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Box
        style={[
          styles.container,
          {
            marginRight: marginNo,
            width: width ? width : CARD_WIDTH,
            height: height ? height : 206,
          },
        ]}
      >
        <Image source={image} resizeMode="cover" style={styles.image} />
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default Banner;
