import { eventChannel, channel } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';

const channels = {};

function createSocketChannel(url) {
  return eventChannel(emit => {
    const socket = Object.assign(new WebSocket(url), {
      onmessage({ data }) {
        emit({ type: 'WS_MESSAGE', data: JSON.parse(data) });
      },
      onopen() {
        emit({ type: 'WS_CONNECTED' });
      },
      onclose() {
        emit({ type: 'WS_DISCONNECTED' });
      },
      onerror() {
        emit({ type: 'WS_ERROR' });
      },
    });

    const unsubscribe = () => {
      socket.close();
    }
    return unsubscribe;
  })
}

function onUnsubscribe(action) {
  const { channel } = action;
  channels[channel].close();
  delete channels[channel];
}

function *onSubscribe(action) {
  const { uri, channel, onMessage, onConnected, onDisconnected, onError } = action;
  // hardcode url. need to refactor
  // connect to websocket server
  const url = `wss://ws.coincap.io${uri}`;
  const socketChannel = yield call(createSocketChannel, url);
  channels[channel] = socketChannel;

  // listen and process incoming events
  while (true) {
    const { type, ...payload } = yield take(socketChannel);
    yield put({ type, ...payload, channel });
    if (type === 'WS_MESSAGE' && onMessage) {
      yield put(onMessage(payload.data));
    } else if (type === 'WS_CONNECTED' && onConnected) {
      yield put(onConnected());
    } else if (type === 'WS_DISCONNECTED' && onDisconnected) {
      yield put(onDisconnected());
    } else if (type === 'WS_ERROR' && onError) {
      yield put(onError(payload.error));
    }
  }
}

export default function *websocketSaga () {
  yield takeEvery('SUBSCRIBE', onSubscribe);
  yield takeEvery('UNSUBSCRIBE', onUnsubscribe);
};