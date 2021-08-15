import React from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";

import { Box } from "./Theme";
import { SearchIcon } from "../Svg";
import { theme } from ".";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: theme.spacing.xl,
    height: 46,
    width: "78%",
    borderWidth: 1,
    borderColor: theme.colors.light,
    borderRadius: theme.spacing.s,
  },
  textInput: {
    width: "90%",
    paddingLeft: 10,
    height: 45,
  },
});

interface SearchInputProps extends RNTextInputProps {
  placeholder: string;
}

const SearchInput = ({ placeholder }: RNTextInputProps) => {
  return (
    <Box style={styles.container}>
      <SearchIcon />
      <RNTextInput style={styles.textInput} placeholder={placeholder} />
    </Box>
  );
};

export default SearchInput;
