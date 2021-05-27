import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from './types';
import { GoogleService, FirebaseService } from '../services';
import i18n from '../i18n';

export const login = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN });

    GoogleService.signIn()
      .then(userInfo => {
        FirebaseService.signIn(userInfo.idToken, userInfo.accessToken)
          .then(user => loginSuccess(dispatch, user))
          .catch(error => {
            GoogleService.signOut();
            loginFail(dispatch, error);
          });
      })
      .catch(error => loginFail(dispatch, error));
  };
};

const loginSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_SUCCESS, payload: user });
  Actions.main();
};

const loginFail = (dispatch, error) => {
  dispatch({ type: LOGIN_FAIL });

  if (error) {
    Alert.alert(
      i18n.t('app.attention'),
      i18n.t('login.enter.message'),
      [{ text: i18n.t('app.ok') }],
      { cancelable: true }
    );
  }
};
