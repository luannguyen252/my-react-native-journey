import { backgroundColor } from "@shopify/restyle";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { theme } from ".";

import { Box, Text } from "./Theme";

export const VARIANT_SIZE = 48;
export const VARIANT_MARGIN = 15;

const styles = StyleSheet.create({
  container: {
    width: VARIANT_SIZE,
    height: VARIANT_SIZE,
    borderRadius: VARIANT_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: VARIANT_MARGIN,
  },
  centerCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.white,
  },
});

interface VariantItemProps {
  value: string | number;
}

const VariantItem = ({ value }: VariantItemProps) => {
  const [val, setVal] = useState("0");
  const [borColor, setBorColor] = useState(false);
  const [visible, setVisible] = useState(false);
  const borWidth = typeof value == "number" ? 1 : 0;
  const bgColor = typeof value == "string" ? value : "white";
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (typeof value == "string") setVisible(!visible);
        setBorColor(!borColor);
        let stringValue;
        stringValue = value.toString();
        setVal(stringValue);
      }}
    >
      <Box
        style={[
          styles.container,
          {
            backgroundColor: bgColor,
            borderWidth: borWidth,
            borderColor: borColor ? theme.colors.primary : theme.colors.light,
          },
        ]}
      >
        {typeof value === "number" && (
          <Text variant="h5" color="primary">
            {value}
          </Text>
        )}
        {typeof value == "string" && (
          <Box style={styles.centerCircle} visible={visible} />
        )}
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default VariantItem;
