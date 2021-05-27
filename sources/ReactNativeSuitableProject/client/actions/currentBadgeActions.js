import {
  SET_INDEX
} from './types';

/**
 * Sets the index of the badge currently being looked at
 */
export const setIndex = index => {
  return { type: SET_INDEX, payload: index };
}