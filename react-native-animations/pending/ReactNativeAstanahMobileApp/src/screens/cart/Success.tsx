import React from "react";
import { StyleSheet } from "react-native";
import { CommonActions } from "@react-navigation/native";

import { Box, Text, theme, Button } from "../../components";
import { CheckIcon } from "../../Svg";
import { StackScreenProps } from "@react-navigation/stack";
import { CartNavParamList } from "../../../types";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  circle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.primary,
    shadowRadius: theme.spacing.s,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.24,
    elevation: 10,
  },
});

interface SuccessProps {}

const Success = ({
  navigation,
}: StackScreenProps<CartNavParamList, "Success">) => {
  return (
    <Box style={styles.container}>
      <Box style={styles.circle}>
        <CheckIcon />
      </Box>
      <Text variant="h2" color="primary" marginTop="l">
        Success
      </Text>
      <Text variant="b2" color="grey" marginTop="l" marginBottom="xl">
        thank you for shopping with Astanah
      </Text>
      <Button
        label="Back To Order"
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "Home" }],
            })
          )
        }
      />
    </Box>
  );
};

export default Success;
