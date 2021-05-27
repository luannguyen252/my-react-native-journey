import { combineReducers } from 'redux';
import data from './dataReducer';
import favorites from './favoritesReducer';
import modal from './modalReducer';

export default combineReducers({
  data,
  favorites,
  modal
});