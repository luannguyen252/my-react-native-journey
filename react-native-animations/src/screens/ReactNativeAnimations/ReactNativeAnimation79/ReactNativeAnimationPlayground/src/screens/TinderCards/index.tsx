import React, { useState, useRef, useCallback, useEffect } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Animated, PanResponder } from 'react-native';

import { deviceWidth } from '../../constants';

import {
  Container,
  Card,
  CardImage,
  Footer,
  RoundButton,
  CARD_WIDTH,
  Like,
  Nope,
  SuperLike,
  CARD_HEIGHT,
} from './styles';
import { movies } from './data';
import Choise from './Choice';

const CARD_OUT_WIDTH = deviceWidth + CARD_WIDTH;
const CARD_OUT_HEIGHT = -1 * (deviceWidth + CARD_HEIGHT);
const ACTION_OFFSET_HORIZONTAL = 90;
const ACTION_OFFSET_VERTICAL = 120;

const TinderCards: React.FC = () => {
  const swipe = useRef(new Animated.ValueXY()).current;
  const [items, setItems] = useState(movies);

  useEffect(() => {
    if (!items.length) {
      setItems(movies);
    }
  }, [items]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, { dx, dy }) => {
        swipe.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: (evt, { dx, dy }) => {
        const direction = Math.sign(dx);
        const horizontalAction = Math.abs(dx) > ACTION_OFFSET_HORIZONTAL;
        const verticalAction = dy < -ACTION_OFFSET_VERTICAL;

        if (horizontalAction || verticalAction) {
          Animated.timing(swipe, {
            duration: 200,
            toValue: {
              x: horizontalAction ? direction * CARD_OUT_WIDTH : dx,
              y: verticalAction ? CARD_OUT_HEIGHT : dy,
            },
            useNativeDriver: true,
          }).start(transitionNext);
        } else {
          Animated.timing(swipe, {
            toValue: { x: 0, y: 0 },
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const transitionNext = useCallback(() => {
    setItems(function popTopItem(prevState) {
      return prevState.slice(1);
    });
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const rotate = swipe.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [`${20}deg`, '0deg', `${-20}deg`],
    extrapolate: 'clamp',
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [0, ACTION_OFFSET_HORIZONTAL],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET_HORIZONTAL, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const superLikeOpacity = swipe.y.interpolate({
    inputRange: [-ACTION_OFFSET_VERTICAL, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  const likeStyle = { opacity: likeOpacity };
  const nopeStyle = { opacity: nopeOpacity };
  const superLikeStyle = { opacity: superLikeOpacity };

  const handleChoise = useCallback(
    (direction: 'horizontal' | 'vertical', sign: number) => {
      Animated.timing(direction === 'horizontal' ? swipe.x : swipe.y, {
        duration: 500,
        toValue: sign * CARD_OUT_WIDTH,
        useNativeDriver: true,
      }).start(transitionNext);
    },
    [swipe, transitionNext],
  );

  return (
    <Container>
      {items
        .slice(0, 4)
        .reverse()
        .map(({ poster, title }, index) => {
          const isFirst = index === items.length - 1;

          const panHandlers = isFirst ? panResponder.panHandlers : {};
          const cardStyle = isFirst ? animatedCardStyle : undefined;

          return (
            <Card
              key={title}
              as={Animated.View}
              {...panHandlers}
              style={[cardStyle]}>
              {isFirst && (
                <>
                  <Like as={Animated.View} style={likeStyle}>
                    <Choise type="like" />
                  </Like>
                  <Nope as={Animated.View} style={nopeStyle}>
                    <Choise type="nope" />
                  </Nope>
                  <SuperLike as={Animated.View} style={superLikeStyle}>
                    <Choise type="super like" />
                  </SuperLike>
                </>
              )}
              <CardImage source={poster} resizeMode="cover" />
            </Card>
          );
        })}
      <Footer>
        <RoundButton onPress={() => handleChoise('horizontal', -1)}>
          <Entypo name="cross" size={45} color="#f57676" />
        </RoundButton>
        <RoundButton type="small" onPress={() => handleChoise('vertical', -1)}>
          <AntDesign name="star" size={20} color="#03c2fc" />
        </RoundButton>
        <RoundButton onPress={() => handleChoise('horizontal', 1)}>
          <AntDesign name="heart" size={30} color="#6ad99e" />
        </RoundButton>
      </Footer>
    </Container>
  );
};

export default TinderCards;
