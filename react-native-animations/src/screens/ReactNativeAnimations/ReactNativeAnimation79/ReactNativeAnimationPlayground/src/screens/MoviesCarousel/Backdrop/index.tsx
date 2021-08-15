import React from 'react';
import { Animated } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Movie } from '../data';
import { deviceWidth, deviceHeight } from '../../../constants';
import { ITEM_WIDTH } from '../Item/styles';

import { Container, Poster, BottomGradient } from './styles';

interface BackdropProps {
  movies: Movie[];
  scrollX: Animated.Value;
}

const Backdrop: React.FC<BackdropProps> = ({ movies, scrollX }) => {
  return (
    <Container renderToHardwareTextureAndroid>
      <FlatList
        renderToHardwareTextureAndroid
        removeClippedSubviews={false}
        contentContainerStyle={{ width: deviceHeight, height: deviceHeight }}
        data={movies}
        keyExtractor={({ title }) => title}
        renderItem={({ item, index }) => {
          const inputRange = [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-deviceWidth, 0],
          });

          return (
            <Poster
              as={Animated.Image}
              source={item.poster}
              resizeMode="cover"
              style={{ transform: [{ translateX }] }}
            />
          );
        }}
      />

      <BottomGradient />
    </Container>
  );
};

export default Backdrop;
