import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { Value, set, divide, useCode } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { diffClamp, onGestureEvent, withOffset } from 'react-native-redash';

interface SliderProps {
  progress: Animated.Value<number>;
  state: Animated.Value<State>;
}

const { width } = Dimensions.get('window');
const CURSOR_SIZE = 40;
const CONTAINER_WIDTH = width - 64;
const SLIDER_WIDTH = CONTAINER_WIDTH - CURSOR_SIZE;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: CONTAINER_WIDTH,
  },
  dividerContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    borderColor: 'rgba(50, 50, 50, 0.5)',
    width: SLIDER_WIDTH,
    borderWidth: StyleSheet.hairlineWidth,
  },
  cursor: {
    width: CURSOR_SIZE,
    height: CURSOR_SIZE,
    borderRadius: CURSOR_SIZE * 0.3,
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cursorPoint: {
    borderRadius: 5,
    width: 10,
    height: 10,
    backgroundColor: 'black',
  },
});

const Slider = ({ progress, state }: SliderProps) => {
  const translationX = new Value(0);

  const gestureHandler = onGestureEvent({ translationX, state });

  const translateX = diffClamp(
    withOffset(translationX, state),
    0,
    SLIDER_WIDTH,
  );

  useCode(() => set(progress, divide(translateX, SLIDER_WIDTH)), [
    progress,
    translateX,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
      </View>
      <PanGestureHandler minDist={0} {...gestureHandler}>
        <Animated.View style={[styles.cursor, { transform: [{ translateX }] }]}>
          <View style={styles.cursorPoint} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Slider;
