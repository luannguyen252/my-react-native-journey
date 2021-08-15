import { ImageSourcePropType } from 'react-native';

export interface Place {
  name: string;
  poster: ImageSourcePropType;
  rating: string;
  duration: string;
}

export const avatars = [
  require('../../../assets/random1.jpg'),
  require('../../../assets/random2.jpg'),
  require('../../../assets/random3.jpg'),
  require('../../../assets/random4.jpg'),
  require('../../../assets/random5.jpg'),
];

export const places: Place[] = [
  {
    name: 'Dubai',
    poster: require('../../../assets/places-dubai.jpg'),
    rating: '5.0',
    duration: '2h 15m',
  },
  {
    name: 'New York',
    poster: require('../../../assets/places-newyork.jpg'),
    rating: '4.8',
    duration: '2h 49m',
  },
  {
    name: 'Paris',
    poster: require('../../../assets/places-paris.jpg'),
    rating: '5.0',
    duration: '2h 2m',
  },
  {
    name: 'Rio de Janeiro',
    poster: require('../../../assets/places-rio.jpg'),
    rating: '4.5',
    duration: '3h 2m',
  },
  {
    name: 'Rome',
    poster: require('../../../assets/places-rome.jpg'),
    rating: '4.8',
    duration: '3h 2m',
  },
];
