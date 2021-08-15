import React, { useState } from 'react';
import Animated, { interpolate, multiply } from 'react-native-reanimated';
import { useSpringTransition } from 'react-native-redash';

import Card, { cards } from '../../components/Card';
import FooterButtons from '../../components/FooterButtons';
import { deviceWidth } from '../../constants';

const walletFront = {
  id: 99,
  source: require('../../../assets/wallet-front.png'),
};

const walletBack = {
  id: 999,
  source: require('../../../assets/wallet-back.png'),
};

import { Container, AbsoluteAnimatedView } from './styles';
const wallet = [
  walletBack,
  cards[0],
  cards[1],
  cards[2],
  cards[3],
  walletFront,
];

const transformOrigin = -1 * (deviceWidth / 2);

const AnimatedWallet: React.FC = () => {
  const [toggled, setToggled] = useState(0);
  const transition = useSpringTransition(toggled);

  return (
    <>
      <Container>
        {wallet.map((card, index) => {
          const direction = index - 2;

          const rotate = multiply(
            direction,
            interpolate(transition, {
              inputRange: [0, 1],
              outputRange: [0, Math.PI / 20],
            }),
          );

          return (
            <AbsoluteAnimatedView
              key={card.id}
              as={Animated.View}
              style={{
                transform: [
                  { translateX: transformOrigin },
                  { rotate },
                  { translateX: -transformOrigin },
                ],
              }}>
              <Card card={card} />
            </AbsoluteAnimatedView>
          );
        })}
      </Container>
      <FooterButtons
        options={[
          {
            text: toggled ? 'Close' : 'Open',
            onPress: () => setToggled(toggled ^ 1),
          },
        ]}
      />
    </>
  );
};

export default AnimatedWallet;
