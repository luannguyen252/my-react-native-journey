import React from 'react';
import { Animated, ViewStyle, ImageSourcePropType } from 'react-native';

import {
  Container,
  MoviePoster,
  MovieTitle,
  Genres,
  Genre,
  Star,
  Stars,
} from './styles';

interface ItemProps {
  title: string;
  poster: ImageSourcePropType;
  rating: number;
  genres: string[];
  style: ViewStyle;
}

const Item: React.FC<ItemProps> = ({
  title,
  poster,
  rating,
  genres,
  style,
}) => {
  const stars = [
    ...Array(rating).fill('star'),
    ...Array(5 - rating).fill('staro'),
  ];

  return (
    <Container as={Animated.View} style={style}>
      <MoviePoster source={poster} resizeMode="contain" />
      <MovieTitle>{title}</MovieTitle>
      <Genres>
        {genres.map((genre) => (
          <Genre key={genre}>{genre}</Genre>
        ))}
      </Genres>
      <Stars>
        {stars.map((type, index) => (
          <Star key={index} name={type} size={20} />
        ))}
      </Stars>
    </Container>
  );
};

export default Item;
