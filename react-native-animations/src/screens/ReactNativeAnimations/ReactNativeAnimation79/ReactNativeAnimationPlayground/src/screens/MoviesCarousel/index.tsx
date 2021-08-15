// Inspiration: https://dribbble.com/shots/8257559-Movie-2-0

import React, { useRef } from 'react';
import { Animated, View } from 'react-native';

import { deviceHeight, deviceWidth } from '../../constants';

import { Container, CTAButton, CTAText } from './styles';
import { movies } from './data';
import Item from './Item';
import { ITEM_WIDTH } from './Item/styles';
import Backdrop from './Backdrop';
const SPACER_WIDTH = (deviceWidth - ITEM_WIDTH) / 2;

const MoviesCarousel: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <Container>
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.FlatList
        data={movies}
        keyExtractor={({ title }) => title}
        renderItem={({ index, item }) => {
          if (!item.poster) {
            return (
              <View style={{ width: SPACER_WIDTH, backgroundColor: 'red' }} />
            );
          }

          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [10, -deviceHeight * 0.14, 10],
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
          });

          return (
            <Item
              {...item}
              index={index}
              style={{ opacity, transform: [{ translateY }] }}
            />
          );
        }}
        horizontal
        contentContainerStyle={{ paddingHorizontal: SPACER_WIDTH }}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        snapToAlignment="start"
        decelerationRate={0.2}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
      />

      <CTAButton>
        <CTAText>Buy Ticket</CTAText>
      </CTAButton>
    </Container>
  );
};

export default MoviesCarousel;
