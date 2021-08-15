// Inspiration: https://dribbble.com/shots/3894781-Urbanears-Headphones

import React, { useRef } from 'react';
import { Animated } from 'react-native';

import { Container } from './styles';
import { headphones } from './data';
import Item from './Item';
import Pagination from './Pagination';
import Ticker from './Ticker';
import Circles from './Circles';

const HeadphoneCarousel: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <Container>
      <Circles data={headphones} scrollX={scrollX} />
      <Animated.FlatList
        data={headphones}
        keyExtractor={({ key }) => key}
        renderItem={({ index, item }) => (
          <Item {...item} index={index} scrollX={scrollX} />
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16} // refresh scrollX on 60fps
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Ticker data={headphones} scrollX={scrollX} />
      <Pagination scrollX={scrollX} data={headphones} />
    </Container>
  );
};

export default HeadphoneCarousel;
