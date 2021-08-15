import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";

import { Box, Text, theme } from "../../components";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 72,
    width,
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
    marginTop: 20,
    marginBottom: 20,
  },
});

interface ProfileHeadProps {}

const ProfileHead = () => {
  return (
    <Box style={styles.container}>
      <Image
        source={require("../../../assets/profile.png")}
        style={{ width: 72, height: 72 }}
      />
      <Box>
        <Text variant="h4" color="primary" marginTop="l" marginLeft="l">
          David Tionge
        </Text>
        <Text variant="b3" color="grey" marginTop="s" marginLeft="l">
          davitoboys@gmail.com
        </Text>
      </Box>
    </Box>
  );
};

export default ProfileHead;
