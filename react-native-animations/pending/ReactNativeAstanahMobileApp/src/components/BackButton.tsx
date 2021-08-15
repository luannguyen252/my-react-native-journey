import React from "react";
import { StyleSheet } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import { Box, Text, theme } from "../components";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

interface BackButtonProps {}

const BackButton = () => {
  return (
    <Box style={styles.container}>
      <Icon name="chevron-left" size={24} color={theme.colors.primary} />
      <Text variant="h4" color="primary">
        Back
      </Text>
    </Box>
  );
};

export default BackButton;
