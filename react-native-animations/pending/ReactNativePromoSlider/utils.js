import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;

// Granular in-between steps
// // e.g. range(0, 2, 0.5) // [0, 0.5, 1, 1.5, 2];
export const range = (from, to, step) =>
  Array.from(Array(Math.ceil((to - from) / step + step)).keys()).map(x => x * step);
