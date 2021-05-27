import {
  SET_INDEX
} from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case SET_INDEX:
      return action.payload;
    default:
      return state;
  }
}