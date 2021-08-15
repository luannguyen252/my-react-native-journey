import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Box, Text } from "./Theme";

const styles = StyleSheet.create({
  container: {},
});

interface LinkProps {
  label: string;
  onPress: () => void;
}

const Link = ({ label, onPress }: LinkProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box style={styles.container}>
        <Text variant="b3B" color="primary">
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default Link;
