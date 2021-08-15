import React from "react";
import { StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";

import { Box, Text } from "../Theme";
import { TrashIcon } from "../../Svg";
import { numberWithCommas } from "../../utils";
import { Product } from "../../../types";
import CartCounter from "./CartCounter";
import { LikeButton, theme } from "..";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width - theme.spacing.xl * 2,
    flexDirection: "row",
    height: 104,
    borderWidth: 1,
    borderColor: theme.colors.light,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 12,
    justifyContent: "center",
  },
});

interface CartItemProps {
  product: Product;
  margin?: number;
  deleteItem: () => void;
}

const CartItem = ({ product, margin, deleteItem }: CartItemProps) => {
  const { title, image, price } = product;
  const marginNo = margin ? margin : 0;
  return (
    <Box style={[styles.container, { marginTop: marginNo }]}>
      <Box style={{ marginRight: 10 }}>
        <Image source={image} style={{ width: 72, height: 72 }} />
      </Box>
      <Box style={{ height: 72 }}>
        <Box
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            variant="h5"
            color="primary"
            style={{ width: 158, marginRight: 10 }}
          >
            {title}
          </Text>
          <LikeButton />
          <Box style={{ width: 10 }} />
          <TouchableOpacity onPress={deleteItem}>
            <TrashIcon />
          </TouchableOpacity>
        </Box>
        <Box style={{ flex: 1 }} />
        <Box style={{ flexDirection: "row" }}>
          <Text variant="h5" color="secondary">
            {"ZK" + numberWithCommas(price)}
          </Text>
          <Box style={{ flex: 1 }} />
          <CartCounter product={product} />
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
