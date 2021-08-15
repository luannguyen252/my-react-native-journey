import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { State } from 'react-native-gesture-handler';
import { withTransition } from 'react-native-redash';

import {
  close,
  createSVGPath,
  curveTo,
  interpolatePath,
  moveTo,
} from './SVGHelpers';

interface EyeProps {
  progress: Animated.Node<number>;
  state: Animated.Node<State>;
  flip?: boolean;
}

const { cond, eq } = Animated;
const angryPath = createSVGPath();
const AnimatedPath = Animated.createAnimatedComponent(Path);
moveTo(angryPath, 16, 25);
curveTo(angryPath, {
  to: { x: 48.51, y: 28.34 },
  c1: { x: 32.2, y: 27.09 },
  c2: { x: 43.04, y: 28.2 },
});
curveTo(angryPath, {
  to: { x: 73, y: 26.25 },
  c1: { x: 53.99, y: 28.48 },
  c2: { x: 62.15, y: 27.78 },
});
curveTo(angryPath, {
  to: { x: 54.74, y: 73.88 },
  c1: { x: 66.28, y: 53.93 },
  c2: { x: 60.19, y: 69.81 },
});
curveTo(angryPath, {
  to: { x: 27.48, y: 54.51 },
  c1: { x: 50.63, y: 76.96 },
  c2: { x: 40.4, y: 74.65 },
});
curveTo(angryPath, {
  to: { x: 16, y: 25 },
  c1: { x: 24.68, y: 50.15 },
  c2: { x: 20.85, y: 40.32 },
});
close(angryPath);

const normalPath = createSVGPath();
moveTo(normalPath, 20.9, 30.94);
curveTo(normalPath, {
  to: { x: 42.96, y: 32.56 },
  c1: { x: 31.26, y: 31.66 },
  c2: { x: 38.61, y: 32.2 },
});
curveTo(normalPath, {
  to: { x: 81.11, y: 38.32 },
  c1: { x: 66.94, y: 34.53 },
  c2: { x: 79.65, y: 36.45 },
});
curveTo(normalPath, {
  to: { x: 65.83, y: 59.52 },
  c1: { x: 83.9, y: 41.9 },
  c2: { x: 73.77, y: 56.6 },
});
curveTo(normalPath, {
  to: { x: 32.42, y: 49.7 },
  c1: { x: 61.95, y: 60.95 },
  c2: { x: 45.72, y: 58.91 },
});
curveTo(normalPath, {
  to: { x: 20.9, y: 30.94 },
  c1: { x: 23.56, y: 43.56 },
  c2: { x: 19.71, y: 37.3 },
});
close(normalPath);

const goodPath = createSVGPath();
moveTo(goodPath, 21, 45);
curveTo(goodPath, {
  to: { x: 29.41, y: 24.47 },
  c1: { x: 21, y: 36.78 },
  c2: { x: 24.26, y: 29.42 },
});
curveTo(goodPath, {
  to: { x: 45, y: 18 },
  c1: { x: 33.61, y: 20.43 },
  c2: { x: 38.05, y: 18 },
});
curveTo(goodPath, {
  to: { x: 69, y: 45 },
  c1: { x: 58.25, y: 18 },
  c2: { x: 69, y: 30.09 },
});
curveTo(goodPath, {
  to: { x: 45, y: 72 },
  c1: { x: 69, y: 59.91 },
  c2: { x: 58.25, y: 72 },
});
curveTo(goodPath, {
  to: { x: 21, y: 45 },
  c1: { x: 31.75, y: 72 },
  c2: { x: 21, y: 59.91 },
});
close(goodPath);

const Eye = ({ progress, flip, state }: EyeProps) => {
  const d = interpolatePath(progress, {
    inputRange: [0, 0.5, 1],
    outputRange: [angryPath, normalPath, goodPath],
  });

  const rotateY = flip ? '180deg' : '0deg';

  const x = cond(eq(state, State.ACTIVE), 5, 0);
  const y = cond(eq(state, State.ACTIVE), 5, 0);

  const translateX = withTransition(x);
  const translateY = withTransition(y);

  return (
    <View style={{ transform: [{ rotateY }] }}>
      <Svg width={90} height={70} viewBox="0 0 98 78">
        <AnimatedPath fill="white" stroke="black" strokeWidth="4" {...{ d }} />
      </Svg>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: 'black',
            transform: [{ translateX }, { translateY }],
          }}
        />
      </View>
    </View>
  );
};

export default Eye;
