import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Item, { MAX_HEIGHT } from "./Item";
import { items } from "./Model";
import colors from "../../../../assets/styles/colors";

const styles = StyleSheet.create({
  container: {
    height: (items.length + 1) * MAX_HEIGHT,
    backgroundColor: colors.coolGray100,
  },
});

const Chanel = () => {
  const y = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y: value } }) => {
      y.value = value;
    },
  });

  return (
    <>
      <StatusBar style="auto" />
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={MAX_HEIGHT}
      >
        <Animated.View style={styles.container}>
          {items.map((item, index) => (
            <Item item={item} key={index} y={y} index={index} />
          ))}
        </Animated.View>
      </Animated.ScrollView>
    </>
  );
};

export default Chanel;
