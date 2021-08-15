// Inspiration: https://dribbble.com/shots/3431451-HUNGRY

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { deviceHeight, deviceWidth } from '../../constants';

import { social } from './data';
import Item from './Item';
import { ITEM_HEIGHT } from './Item/styles';
import {
  Container,
  Heading,
  Line,
  FinishButton,
  FinishButtonText,
  accentColor,
} from './styles';

const List = React.memo(
  React.forwardRef(({ showText, isAccent, style, onScroll }, ref) => (
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      ref={ref}
      data={social}
      style={style}
      keyExtractor={({ name }) => name}
      scrollEnabled={!showText}
      onScroll={onScroll}
      scrollEventThrottle={16}
      snapToInterval={ITEM_HEIGHT}
      decelerationRate="fast"
      contentContainerStyle={{
        paddingTop: showText ? 0 : deviceHeight / 2 - ITEM_HEIGHT / 2 - 100,
        paddingBottom: showText ? 0 : deviceHeight / 2 - ITEM_HEIGHT / 2 + 15,
        paddingHorizontal: 20,
      }}
      renderItem={({ item }) => {
        return <Item social={item} showText={showText} isAccent={isAccent} />;
      }}
    />
  )),
);

const ListPicker: React.FC = () => {
  const accentRef = useRef();
  const darkRef = useRef();

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true },
  );

  useEffect(() => {
    scrollY.addListener((v) => {
      if (darkRef.current) {
        darkRef.current.scrollToOffset({
          offset: v.value,
          animated: false,
        });
      }
    });
  }, [scrollY]);

  return (
    <Container>
      <Heading>Connect with...</Heading>

      <List
        ref={accentRef}
        isAccent
        style={StyleSheet.absoluteFillObject}
        onScroll={onScroll}
      />

      <List
        ref={darkRef}
        showText
        style={{
          position: 'absolute',
          backgroundColor: accentColor,
          width: deviceWidth,
          height: ITEM_HEIGHT,
          top: deviceHeight / 2 - ITEM_HEIGHT / 2 - 100,
        }}
      />

      <Line />
      <FinishButton activeOpacity={0.8}>
        <FinishButtonText>Done !</FinishButtonText>
      </FinishButton>
    </Container>
  );
};

export default ListPicker;
