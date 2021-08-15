// Inspiration: https://dribbble.com/shots/6654320-Animated-Onboarding-Screens

import React, { useState } from 'react';
import Animated, {
  interpolate,
  Extrapolate,
  Easing,
} from 'react-native-reanimated';
import { useTimingTransition, interpolateColor } from 'react-native-redash';
import { useTheme } from 'styled-components';
import { Entypo } from '@expo/vector-icons';

import { Container, CurrentBackgroundColor, Circle } from './styles';

const DotInversion: React.FC = () => {
  const { backgroundColor } = useTheme();
  const [toggleInversion, setToggleInversion] = useState(0);

  const transition = useTimingTransition(toggleInversion, {
    duration: 1200,
    easing: Easing.quad,
  });

  return (
    <Container>
      <CurrentBackgroundColor
        as={Animated.View}
        style={{
          backgroundColor: interpolateColor(transition, {
            inputRange: [0, 0.5, 0.501, 1],
            outputRange: [backgroundColor, backgroundColor, '#f9c', '#f9c'],
          }),
        }}
      />
      <Animated.View
        style={{
          borderRadius: 40,
          transform: [
            { perspective: 370 },
            {
              rotateY: interpolate(transition, {
                inputRange: [0, 0.5, 1],
                outputRange: [0, -1.57, -3.14],
                extrapolate: Extrapolate.CLAMP,
              }),
            },
            {
              scale: interpolate(transition, {
                inputRange: [0, 0.5, 1],
                outputRange: [1, 6, 1],
                extrapolate: Extrapolate.CLAMP,
              }),
            },
            {
              translateX: interpolate(transition, {
                inputRange: [0, 0.5, 1],
                outputRange: [0, 20, 0],
                extrapolate: Extrapolate.CLAMP,
              }),
            },
          ],
          backgroundColor: interpolateColor(transition, {
            inputRange: [0, 0.5, 0.501, 1],
            outputRange: ['#f9c', '#f9c', backgroundColor, backgroundColor],
          }),
        }}>
        <Circle onPress={() => setToggleInversion(toggleInversion ^ 1)}>
          <Animated.View
            style={{
              opacity: interpolate(transition, {
                inputRange: [0, 0.001, 0.999, 1],
                outputRange: [1, 0, 0, 1],
              }),
            }}>
            <Entypo
              name="chevron-right"
              size={32}
              color={toggleInversion ? '#f9c' : backgroundColor}
            />
          </Animated.View>
        </Circle>
      </Animated.View>
    </Container>
  );
};

export default DotInversion;
