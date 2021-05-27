import {createStore, applyMiddleware} from 'redux';

import rootReducer from './Reducers';

import thunk from 'redux-thunk';

let middleware = [thunk];

export default function configureStore() {
  return createStore(rootReducer, {}, applyMiddleware(...middleware));
}
