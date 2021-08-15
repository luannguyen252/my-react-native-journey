import React from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import theme, { Box } from "../Theme";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { NOTIFICATION_HEIGHT } from "./NotificationItem";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.red,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    height: NOTIFICATION_HEIGHT,
  },
});

interface NotificationItemDeleteActionProps {
  onPress: () => void;
}

const NotificationItemDeleteAction = ({
  onPress,
}: NotificationItemDeleteActionProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Box style={styles.container}>
        <Icon name="trash-can" size={35} color={theme.colors.white} />
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default NotificationItemDeleteAction;
