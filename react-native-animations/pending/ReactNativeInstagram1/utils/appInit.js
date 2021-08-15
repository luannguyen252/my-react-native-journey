import { AsyncStorage } from 'react-native';

import { startLogin, startMainApp } from '../Nav';
import { iconsLoaded } from './themes';
import { authToken } from './constants';

const appInit = async () => {
  await iconsLoaded(); // load icons

  const token = await AsyncStorage.getItem(authToken); // get token

  if (!token) {
    startLogin();
  } else {
    startMainApp();
  }
};

export default appInit;
