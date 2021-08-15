import React, { useState } from "react";
import { StyleSheet, FlatList, SafeAreaView, Dimensions } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { Box, NotificationItem, StackHeader, theme } from "../components";
import { HomeNavParamList } from "../../types";
import { notifications } from "../data";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  flatlist: {
    height,
  },
});

interface NotificationsProps {}

const Notifications = ({
  navigation,
}: StackScreenProps<HomeNavParamList, "Notifications">) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  return (
    <SafeAreaView style={styles.container}>
      <Box>
        <StackHeader title="Notifications" back={() => navigation.goBack()} />
        <Box style={styles.flatlist}>
          <FlatList
            onRefresh={() => true}
            refreshing={refreshing}
            showsHorizontalScrollIndicator={false}
            data={notifications}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <NotificationItem
                notification={item}
                onPress={() => alert("Notification Pressed")}
                removeNotification={() => alert("Delete Notification")}
              />
            )}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Notifications;

// TODO
// Must change srollView to flatList here, rendering is affected
// Implement pull to refresh
