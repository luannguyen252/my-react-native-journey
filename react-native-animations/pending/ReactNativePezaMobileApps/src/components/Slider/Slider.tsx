/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  diffClamp,
  Value,
  call,
  concat,
  cond,
  divide,
  eq,
  interpolateNode,
  multiply,
  round,
  sub,
  useCode,
} from 'react-native-reanimated';
import { onGestureEvent, withOffset } from 'react-native-redash/lib/module/v1';

import { theme } from '..';
import Knob, { KNOB_SIZE } from './Knob';

const SLIDER_WIDTH = theme.constants.screenWidth - 70;
const RULER_HEIGHT = 5;

interface Props {
  getValue?: (v: number) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  slider: {
    width: SLIDER_WIDTH,
    height: KNOB_SIZE,
    justifyContent: 'center',
  },
  backgroundSlider: {
    height: RULER_HEIGHT,
    backgroundColor: 'white',
  },
  sides: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    height: RULER_HEIGHT,
    width: RULER_HEIGHT,
    borderRadius: RULER_HEIGHT / 2,
    backgroundColor: theme.colors.primary,
    left: -RULER_HEIGHT / 2,
  },
  right: {
    left: RULER_HEIGHT / 2,
    height: RULER_HEIGHT,
    width: RULER_HEIGHT,
    borderRadius: RULER_HEIGHT / 2,
    backgroundColor: 'white',
  },
});

// interface Props {}

const Slider = ({ getValue }: Props) => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const gestureHandler = onGestureEvent({ state, translationX });
  const x = diffClamp(withOffset(translationX, state), 0, SLIDER_WIDTH);
  const translateX = sub(x, KNOB_SIZE / 2);
  const scaleX = interpolateNode(x, {
    inputRange: [0, SLIDER_WIDTH],
    // https://github.com/facebook/react-native/issues/6278
    outputRange: [0.0001, 1],
  });
  const value = round(multiply(divide(x, SLIDER_WIDTH), 5000));
  const label = concat(value);
  // useCode(
  //   () =>
  //     cond(
  //       eq(state, State.END),
  //       call([value], ([v]) => console.log(v)),
  //     ),
  //   [state, value],
  // );

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <View>
          <View style={styles.backgroundSlider} />
          <View style={styles.sides}>
            <View style={styles.left} />
            <View style={styles.right} />
          </View>
          <Animated.View
            style={[
              styles.backgroundSlider,
              {
                ...StyleSheet.absoluteFillObject,
                backgroundColor: theme.colors.primary,
                transform: [
                  { translateX: -SLIDER_WIDTH / 2 },
                  { scaleX },
                  { translateX: SLIDER_WIDTH / 2 },
                ],
              },
            ]}
          />
        </View>
        <PanGestureHandler minDist={0} {...gestureHandler}>
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: KNOB_SIZE,
              height: KNOB_SIZE,
              transform: [{ translateX }],
            }}>
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
              }}>
              <Knob state={state} label={label} />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
};

export default Slider;
