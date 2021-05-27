import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import colors from './colors';


type Props = {};
export default class App extends Component<Props> {

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle='default' backgroundColor={colors.purple} />
          <Router />
        </View>
      </Provider>
    );
  }

}
