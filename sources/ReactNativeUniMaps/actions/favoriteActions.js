import {
  ADD_FAVORITE,
  REMOVE_FAVORITE
} from './types';

export const addFavorite = itemID => async dispatch => {
  dispatch({ type: ADD_FAVORITE, payload: itemID });
};

export const removeFavorite = itemID => async dispatch => {
  dispatch({ type: REMOVE_FAVORITE, payload: itemID });
};