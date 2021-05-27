import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { GoogleService, FirebaseService } from '../services';
import i18n from '../i18n';

// Public

export const logout = () => {
  return () => {
    Alert.alert(
      i18n.t('products.logout.title'),
      i18n.t('products.logout.message'),
      [
        { text: i18n.t('app.yes'), onPress: () => onPressLogout() },
        { text: i18n.t('app.cancel'), style: 'cancel' }
      ], { cancelable: true }
    );
  };
};

export const addProduct = () => {
  return () => {
      Actions.product();
  };
};

// Private

const onPressLogout = () => {
  GoogleService.signOut();
  FirebaseService.signOut();
  Actions.login();
};
