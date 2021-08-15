import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import theme, { Box, Text } from "../Theme";
import { numberWithCommas, discountPrecentage } from "../../utils";
import Ratings from "../Ratings";
import { Product } from "../../../types";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const CARD_WIDTH = 165;
const CARD_HEIGHT = 282;
export const CARD_MARGIN = (width - 40 - CARD_WIDTH * 2) / 2;
const IMAGE_SIZE = CARD_WIDTH - 32;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.light,
    alignItems: "center",
    paddingTop: 16,
  },
  trash: {
    position: "absolute",
    left: "73%",
    top: "83%",
  },
});

interface ProductProps {
  product: Product;
  width?: number;
  height?: number;
  noRating?: boolean;
  marginBottom?: number;
  marginRight?: number;
  trash?: () => void;
}

const ProductCard = ({
  product,
  width,
  height,
  noRating,
  marginBottom,
  marginRight,
  trash,
}: ProductProps) => {
  const { image, title, ratings, discountPrice, price } = product;
  const widthNo = width ? width : CARD_WIDTH;
  const heightNo = height ? height : CARD_HEIGHT;
  const imageSize = width ? width - 32 : IMAGE_SIZE;
  const ratingValue = ratings ? ratings : 1;
  const marginBottomValue = marginBottom ? marginBottom : CARD_MARGIN;
  const marginRightValue = marginRight ? marginRight : CARD_MARGIN;
  return (
    <Box
      style={[
        styles.container,
        {
          width: widthNo,
          height: heightNo,
          marginRight: marginRightValue,
          marginBottom: marginBottomValue,
        },
      ]}
    >
      <Image
        source={image}
        style={{ width: imageSize, height: imageSize, borderRadius: 5 }}
      />
      {trash && (
        <Box style={styles.trash}>
          <TouchableOpacity onPress={trash}>
            <Icon name="trash" color={theme.colors.grey} size={24} />
          </TouchableOpacity>
        </Box>
      )}
      <Text
        variant="h4"
        color="primary"
        numberOfLines={2}
        style={{ width: imageSize, marginTop: 10 }}
      >
        {title}
      </Text>

      <Box
        style={{
          width: imageSize,
          flexDirection: "row",
          marginTop: 3,
        }}
      >
        {noRating ? null : <Ratings rating={ratingValue} />}
        <Box style={{ flex: 1 }} />
      </Box>
      <Box style={{ flexDirection: "row", width: imageSize, marginTop: 5 }}>
        <Text variant="h4" color="secondary">
          {"ZK" + " " + numberWithCommas(discountPrice ? discountPrice : price)}
        </Text>
        <Box style={{ flex: 1 }} />
      </Box>
      <Box
        style={{
          flexDirection: "row",
          width: imageSize,
          marginTop: 7,
        }}
      >
        <Text
          color="grey"
          style={{
            textDecorationLine: "line-through",
            marginRight: 5,
            fontSize: 12,
            fontFamily: "Poppins-Bold",
            letterSpacing: 0.5,
          }}
        >
          {discountPrice ? "ZK" + " " + price : null}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Poppins-Bold",
            letterSpacing: 0.5,
          }}
          color="red"
        >
          {discountPrice
            ? discountPrecentage(price, discountPrice) + "% Off"
            : null}
        </Text>
      </Box>
    </Box>
  );
};

export default ProductCard;
