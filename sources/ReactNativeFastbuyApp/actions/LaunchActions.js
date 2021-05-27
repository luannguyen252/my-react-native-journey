import { Actions } from 'react-native-router-flux';
import { GoogleService, FirebaseService } from '../services';

export const configure = () => {
  return () => {
    GoogleService.configure();
  };
};

export const tryToSignInSilently = () => {
  return () => {
    GoogleService.signInSilentlyIfNeeded()
      .then(userInfo => {
        FirebaseService.signIn(userInfo.idToken, userInfo.accessToken)
          .then(() => Actions.main())
          .catch(() => {
            GoogleService.signOut();
            Actions.login();
          });
      })
      .catch(() => Actions.login());
  };
};
