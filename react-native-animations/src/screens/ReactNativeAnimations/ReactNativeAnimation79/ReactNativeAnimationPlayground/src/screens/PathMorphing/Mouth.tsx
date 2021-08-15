import React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { createSVGPath, curveTo, interpolatePath, moveTo } from './SVGHelpers';

interface MouthProps {
  progress: Animated.Node<number>;
}

const angryPath = createSVGPath();
const AnimatedPath = Animated.createAnimatedComponent(Path);
moveTo(angryPath, 13, 36);
curveTo(angryPath, {
  to: { x: 47.31, y: 16.57 },
  c1: { x: 24.69, y: 16.57 },
  c2: { x: 36.13, y: 10.09 },
});
curveTo(angryPath, {
  to: { x: 106, y: 24.58 },
  c1: { x: 63.87, y: 6.88 },
  c2: { x: 72.99, y: -10.46 },
});

const normalPath = createSVGPath();
moveTo(normalPath, 1, 5);
curveTo(normalPath, {
  to: { x: 45.2072933, y: 12.93878949 },
  c1: { x: 21.3645524, y: 8.8631006 },
  c2: { x: 36.1003168, y: 11.50936377 },
});
curveTo(normalPath, {
  to: { x: 118, y: 19.805606623 },
  c1: { x: 74.3732915, y: 17.51666758 },
  c2: { x: 98.6375271, y: 19.805606623 },
});

const goodPath = createSVGPath();
moveTo(goodPath, 1, 2);
curveTo(goodPath, {
  to: { x: 37.8363943, y: 25.6597381 },
  c1: { x: 17.8783339, y: 14.0562303 },
  c2: { x: 30.157132, y: 21.942809699999998 },
});
curveTo(goodPath, {
  to: { x: 118.0, y: 16.8056066 },
  c1: { x: 70.7689993, y: 41.59982822 },
  c2: { x: 97.4902012, y: 38.64845107 },
});

const Mouth = ({ progress }: MouthProps) => {
  const d = interpolatePath(progress, {
    inputRange: [0, 0.5, 1],
    outputRange: [angryPath, normalPath, goodPath],
  });

  return (
    <Svg width={120} height={40} viewBox="0 0 120 40">
      <AnimatedPath
        fill="transparent"
        stroke="black"
        strokeWidth="4"
        {...{ d }}
      />
    </Svg>
  );
};

export default Mouth;
