import React from 'react';
import Animated, {
  useCode,
  startClock,
  divide,
  set,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useValue, useClock, useDiff, useConst } from 'react-native-redash';

import Card, { cards } from '../../components/Card';

import { Container, AnimatedCardView } from './styles';

const SkewScroll: React.FC = () => {
  const cardsArray = [...cards, ...cards, ...cards, ...cards];
  const clock = useClock();
  const y = useValue(0);
  const velocity = useValue(0);
  const onScroll = useConst(() =>
    Animated.event([
      {
        nativeEvent: {
          contentOffset: { y },
        },
      },
    ]),
  );

  const dy = useDiff(y); // calcs the diff between frames
  const dt = useDiff(clock);

  useCode(() => [startClock(clock), set(velocity, divide(dy, dt))], []);

  const skewY = interpolate(velocity, {
    inputRange: [-8, 0, 8],
    outputRange: [-Math.PI / 9, 0, Math.PI / 9],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Container
      as={Animated.ScrollView}
      scrollEventThrottle={1}
      onScroll={onScroll}
      showsVerticalScrollIndicator={false}>
      {cardsArray.map((card, i) => (
        <AnimatedCardView
          as={Animated.View}
          style={{ transform: [{ skewY }] }}
          key={i}>
          <Card card={card} />
        </AnimatedCardView>
      ))}
    </Container>
  );
};

export default SkewScroll;
