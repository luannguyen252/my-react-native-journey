import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { persistReducer, persistStore, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const mapTransformer = config =>
  createTransform(
    map => JSON.stringify(Array.from(map)),
    arrayString => new Map(JSON.parse(arrayString)),
    config,
  );

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['favorites'],
  transforms: [mapTransformer({ whitelist: 'favorites' })],
};

const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  pReducer,
  {},
  compose(
    applyMiddleware(thunk)
  )
);

export const persistor = persistStore(store);
