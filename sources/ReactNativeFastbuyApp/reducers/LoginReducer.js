import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from '../actions/types';
import i18n from '../i18n';

const INITIAL_STATE = {
  loading: false,
  user: null,
  errorMessage: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...INITIAL_STATE,
        loading: true
      };

    case LOGIN_FAIL:
      return {
        ...INITIAL_STATE,
        errorMessage: i18n.t('login.enter.message')
      };

    case LOGIN_SUCCESS:
      return {
        ...INITIAL_STATE,
        user: action.payload
      };

    default:
      return state;
  }
};
