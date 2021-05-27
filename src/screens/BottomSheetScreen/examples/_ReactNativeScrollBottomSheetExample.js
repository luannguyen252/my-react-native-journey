import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import ScrollBottomSheet from "react-native-scroll-bottom-sheet";

const windowHeight = Dimensions.get("window").height;

export default function ReactNativeScrollBottomSheetExample() {
  return (
    <View style={styles.container}>
      <ScrollBottomSheet
        componentType="FlatList"
        snapPoints={[128, "50%", windowHeight - 200]}
        initialSnapIndex={2}
        renderHandle={() => (
          <View style={styles.header}>
            <View style={styles.panelHandle} />
          </View>
        )}
        data={Array.from({ length: 200 }).map((_, i) => String(i))}
        keyExtractor={(i) => i}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{`Item ${item}`}</Text>
          </View>
        )}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 16,
    backgroundColor: "#F3F4F9",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHandle: {
    width: 40,
    height: 2,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 4,
  },
  item: {
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    marginVertical: 10,
  },
});
