import React, { useRef, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const { event, Value, cond, eq } = Animated;

export default function Root() {
  const state = useRef(new Value(-1)).current;
  const onChange = useRef(
    event([
      {
        nativeEvent: { state: state },
      },
    ])
  ).current;
  const opacity = cond(eq(state, State.BEGAN), 0.4, 1);

  return (
    <View style={styles.container}>
      <TapGestureHandler onHandlerStateChange={onChange}>
        <Animated.View style={[styles.box, { opacity }]} />
      </TapGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 200,
    width: 200,
    backgroundColor: "tomato",
  },
});
