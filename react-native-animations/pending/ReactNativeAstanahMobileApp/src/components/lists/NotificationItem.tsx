import React from "react";
import { Dimensions, StyleSheet, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import theme, { Box, Text } from "../Theme";
import { OfferNotificationIcon } from "../../Svg";
import NotificationItemDeleteAction from "./NotificationItemDeleteAction";
import { NotificationProp } from "../../../types";

const { width } = Dimensions.get("window");
export const NOTIFICATION_HEIGHT = 90;
export const MARGIN_TOP = 16;

const styles = StyleSheet.create({
  container: {
    width,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
  },
});

interface NotificationItemProps {
  notification: NotificationProp;
  onPress: () => void;
  removeNotification: () => void;
}

const NotificationItem = ({
  notification,
  onPress,
  removeNotification,
}: NotificationItemProps) => {
  const { title, body, date } = notification;
  return (
    <Swipeable
      renderRightActions={() => (
        <NotificationItemDeleteAction onPress={removeNotification} />
      )}
    >
      <TouchableHighlight
        onPress={onPress}
        underlayColor={theme.colors.light}
        style={{
          height: NOTIFICATION_HEIGHT,
          backgroundColor: theme.colors.white,
          justifyContent: "center",
        }}
      >
        <Box style={styles.container}>
          <OfferNotificationIcon />
          <Box style={{ marginLeft: 15 }}>
            <Text variant="h5" color="primary" marginBottom="s">
              {title}
            </Text>
            <Text variant="b3" color="grey" numberOfLines={2} marginBottom="s">
              {body}
            </Text>
            <Text variant="b4" color="primary">
              {date}
            </Text>
          </Box>
        </Box>
      </TouchableHighlight>
    </Swipeable>
  );
};

export default NotificationItem;

// TODO
// Might add a seperator later(visual appeal)
