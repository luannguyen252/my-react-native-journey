import React from "react";
import { Text } from "react-native";
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";

export default function SwipeableTabView() {
  return (
    <ScrollableTabView
      style={{ marginTop: 16 }}
      initialPage={0}
      renderTabBar={() => <ScrollableTabBar />}
    >
      <Text tabLabel="Tab #1">Tab 1</Text>
      <Text tabLabel="Tab #2">Tab 2</Text>
      <Text tabLabel="Tab #3">Tab 3</Text>
      <Text tabLabel="Tab #4">Tab 4</Text>
      <Text tabLabel="Tab #5">Tab 5</Text>
    </ScrollableTabView>
  );
}
