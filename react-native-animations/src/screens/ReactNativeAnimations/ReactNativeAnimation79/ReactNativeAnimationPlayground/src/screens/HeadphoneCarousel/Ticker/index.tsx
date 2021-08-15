import React from 'react';
import { Animated } from 'react-native';

import { deviceWidth } from '../../../constants';

import { Container, Name, NameList, TICKER_HEIGHT } from './styles';

interface Data {
  type: string;
}

interface TickerProps {
  scrollX: Animated.Value;
  data: Data[];
}

const Ticker: React.FC<TickerProps> = ({ scrollX, data }) => {
  const inputRange = [-deviceWidth, 0, deviceWidth];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });

  return (
    <Container>
      <NameList as={Animated.View} style={{ transform: [{ translateY }] }}>
        {data.map(({ type }, index) => (
          <Name key={index} as={Animated.Text}>
            {type}
          </Name>
        ))}
      </NameList>
    </Container>
  );
};

export default Ticker;
