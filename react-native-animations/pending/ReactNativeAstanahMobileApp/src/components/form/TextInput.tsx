import React from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import { theme, Box } from "../../components";

const { width } = Dimensions.get("window");
const FORM_WIDTH = width - theme.spacing.xl * 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    justifyContent: "center",
    width: width - theme.spacing.xl * 6,
  },
});

interface TextInputProps extends RNTextInputProps {
  icon?: string;
  error?: string;
  touched?: boolean;
  width?: number;
  height?: number;
  noBorder?: boolean;
  noBorderRad?: boolean;
}

const TextInput = ({
  icon,
  error,
  touched,
  width,
  height,
  noBorderRad,
  noBorder,
  ...props
}: TextInputProps) => {
  const reBorderColor = !touched ? "light" : error ? "red" : "primary";
  const reColor = !touched ? "grey" : error ? "red" : "primary";
  const borderColor = theme.colors[reBorderColor];
  const noBorderValue = noBorder ? theme.colors.white : borderColor;
  const color = theme.colors[reColor];
  const widthNo = width ? width : FORM_WIDTH;
  const heightNo = height ? height : 47;
  const noBorderRadValue = noBorderRad ? 0 : 5;
  const marginLeftValue = !icon ? -5 : theme.spacing.m;
  return (
    <Box
      style={[
        styles.container,
        {
          borderColor: noBorderValue,
          width: widthNo,
          height: heightNo,
          borderRadius: noBorderRadValue,
        },
      ]}
    >
      {icon && (
        <Box style={styles.icon}>
          <Icon name={icon} size={16} {...{ color }} />
        </Box>
      )}
      <Box style={[styles.textInput, { marginLeft: marginLeftValue }]}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor={color}
          {...props}
        />
      </Box>
    </Box>
  );
};

export default TextInput;
