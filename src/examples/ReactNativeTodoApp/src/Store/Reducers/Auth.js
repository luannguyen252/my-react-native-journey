import * as types from '../Actions/types';
import initialState from './initialState';

export default function(state = initialState.Auth, action) {
  switch (action.type) {
    case types.GET_SIGNINAUTH: {
      return {
        ...state,
        UserInfo: action.userData,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
