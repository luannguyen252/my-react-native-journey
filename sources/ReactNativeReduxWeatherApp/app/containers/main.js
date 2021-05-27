import React from 'react';
import { composeWithDevTools } from 'remote-redux-devtools';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import searchReducer from '../reducers/search';
import WeatherApp from './weatherApp';

const logger = createLogger();
const store = createStore(searchReducer, composeWithDevTools(
    applyMiddleware(thunk, promise, logger),
));

const Main = () =>
    (<Provider store={store}>
      <WeatherApp />
    </Provider>);

export default Main;
