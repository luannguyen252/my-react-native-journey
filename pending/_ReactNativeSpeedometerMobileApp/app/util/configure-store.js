import { applyMiddleware, createStore } from 'redux';

import Reducers from '../ducks/index';
import thunk from 'redux-thunk';

export const configureStore = () => createStore(Reducers, applyMiddleware(thunk));
