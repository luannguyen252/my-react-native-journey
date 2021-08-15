import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import favoriteReducer from './reducer';

const rootReducer = combineReducers({ favoriteReducer });

export const store = createStore(rootReducer, applyMiddleware(thunk));
