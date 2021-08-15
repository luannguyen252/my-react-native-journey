import React from "react";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";

import { Box, Text } from "../Theme";
import { useAppContext } from "../../context/context";
import { Product } from "../../../types";
import { theme } from "..";

const styles = StyleSheet.create({
  container: {
    width: 104,
    height: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.light,
    borderRadius: theme.spacing.s,
    paddingLeft: theme.spacing.m,
    paddingRight: theme.spacing.m,
    backgroundColor: theme.colors.white,
  },
});

interface CounterProps {
  product: Product;
}

const CartCounter = ({ product }: CounterProps) => {
  const { count } = product;
  const { manageCart } = useAppContext();
  return (
    <Box style={styles.container}>
      <RectButton
        onPress={() => manageCart("DECREASE_COUNT", product)}
        style={{
          opacity: count === 1 ? 0.5 : 1,
          backgroundColor: theme.colors.white,
          marginRight: 7, // Find another way to cemter the button
        }}
      >
        <Icon name="minus" size={16} color={theme.colors.grey} />
      </RectButton>

      <Box
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.light,
          height: "100%",
        }}
      >
        <Text variant="b3" color="grey">
          {count}
        </Text>
      </Box>
      <RectButton onPress={() => manageCart("INCREASE_COUNT", product)}>
        <Icon
          name="plus"
          size={16}
          color={theme.colors.grey}
          style={{ backgroundColor: theme.colors.white, marginLeft: 7 }}
        />
      </RectButton>
    </Box>
  );
};

export default CartCounter;
