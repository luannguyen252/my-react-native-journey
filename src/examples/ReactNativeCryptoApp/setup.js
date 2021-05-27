import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { SnackbarPortal } from 'react-native-base-components/src/snackbar';
import ConfigProvider from 'react-native-base-components/src/helpers/ConfigProvider';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

import App from './App';
import store from './store';
import themes from './themes';

const setup = () => {
  return () => {
    const colorScheme = useColorScheme();
    return (
      <Provider store={store}>
        <AppearanceProvider>
          <ConfigProvider config={{ theme: themes[colorScheme] }}>
            <App />
            <SnackbarPortal />
          </ConfigProvider>
        </AppearanceProvider>
      </Provider>
    );
  };
}

registerRootComponent(setup());