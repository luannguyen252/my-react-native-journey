import { combineReducers } from 'redux';
import badges from './badgesReducer';
import currentBadge from './currentBadgeReducer';

export default combineReducers({
  badges,
  currentBadge
});