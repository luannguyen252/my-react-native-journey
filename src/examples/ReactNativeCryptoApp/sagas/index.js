import { fork } from 'redux-saga/effects'
import restSaga from './rest';
import websocketSaga from './websocket';
import notifcationSaga from './notifcation';

export default function *rootSaga() {
  yield fork(restSaga);
  yield fork(websocketSaga);
  yield fork(notifcationSaga);
}