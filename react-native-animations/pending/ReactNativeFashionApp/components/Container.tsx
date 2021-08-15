import React, { ReactNode } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";

import theme, { Box } from "./Theme";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const assets = [require("./assets/patterns/1.png")];
const { width } = Dimensions.get("window");
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
}

const Container = ({ children, footer }: ContainerProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Box flex={1} backgroundColor="secondary">
      <StatusBar style="light" />
      <Box backgroundColor="white">
        <Box
          borderBottomLeftRadius="xl"
          overflow="hidden"
          height={height * 0.45} // Originally 0.61
        >
          <Image
            source={assets[0]}
            style={{
              width,
              height,
              borderBottomLeftRadius: theme.borderRadii.xl,
            }}
          />
        </Box>
      </Box>
      <Box flex={1} overflow="hidden">
        <Image
          source={assets[0]}
          style={{
            ...StyleSheet.absoluteFillObject,
            width,
            height,
            top: -height * 0.45, // Originally 0.61
          }}
        />
        <Box
          borderRadius="xl"
          borderTopLeftRadius="none"
          backgroundColor="white"
          flex={1}
        >
          {children}
        </Box>
      </Box>
      <Box backgroundColor="secondary" paddingTop="s">
        {footer}
      </Box>
      <Box height={insets.bottom}></Box>
    </Box>
  );
};

export default Container;
