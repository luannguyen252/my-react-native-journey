import React, { useRef } from "react";
import { StyleSheet, Animated, Dimensions } from "react-native";

import { Box, Text } from "./Theme";
import VariantItem, { VARIANT_SIZE, VARIANT_MARGIN } from "./VariantItem";
import { Color, Size, Variant } from "../../types";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width,
    height: VARIANT_SIZE,
    paddingLeft: 20,
  },
});

interface VariantSliderProps {
  value: Variant[];
}

const VariantSlider = ({ value }: VariantSliderProps) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <Box style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={VARIANT_SIZE + VARIANT_MARGIN}
        decelerationRate={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{
          justifyContent: "center",
        }}
      >
        {value.map(({ value }, index) => {
          return <VariantItem key={index} value={value} />;
        })}
      </Animated.ScrollView>
    </Box>
  );
};

export default VariantSlider;
