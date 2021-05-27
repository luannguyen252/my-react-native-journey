import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import rootSaga from '../sagas';
import array from './array';

const saga = createSagaMiddleware();

const store = createStore(
  combineReducers(reducers),
  compose(applyMiddleware(array, saga)),
);

saga.run(rootSaga);

export default store;