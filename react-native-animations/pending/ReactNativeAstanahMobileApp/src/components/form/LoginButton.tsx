import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";

import theme, { Text, Box } from "../Theme";
import { Google, Facebook } from "../../Svg";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: width - theme.spacing.xl * 2,
    height: 57,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: theme.colors.light,
    borderRadius: theme.spacing.s,
  },
  text: {
    marginLeft: (width - theme.spacing.xl) / 5.25,
  },
});

interface LoginButtonProps {
  type: string;
  onPress: () => void;
}

const LoginButton = ({ type, onPress }: LoginButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box style={styles.container}>
        {type === "Google" ? <Google /> : <Facebook />}
        <Text variant="button" color="grey" style={styles.text}>
          Login with {type}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default LoginButton;
