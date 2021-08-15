import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";

import theme, { Box, Text } from "../Theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

interface HomeLinkProps {
  label: string;
  onPress: () => void;
}

const HomeLink = ({ label, onPress }: HomeLinkProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box style={styles.container}>
        <Text variant="h5" color="secondary">
          {label}
        </Text>
        <Icon
          name="chevron-right"
          style={{ top: 1 }}
          color={theme.colors.primary}
        />
      </Box>
    </TouchableOpacity>
  );
};

export default HomeLink;
