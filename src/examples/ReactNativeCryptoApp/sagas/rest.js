import { all, call, put, takeEvery } from 'redux-saga/effects';

function *requester(uri) {
  // hardcode url. need to refactor
  const url = `https://api.coincap.io${uri}`;
  const response = yield call(fetch, url);
  const json = yield call([response, 'json']);
  return json.data;
}

function *onRest(action) {
  const { uri, label, onSuccess, onError, transformResponse = data => data } = action;
  yield put({ type: 'REST_START', label });
  try {
    const data = yield call(requester, uri);
    yield put({ type: 'REST_FINISH', label });
    if (onSuccess) yield put(onSuccess(transformResponse(data)));
  } catch (error) {
    yield put({ type: 'REST_FINISH', label });
    if (onError) yield put(onError(error));
  }
}

function *onFetchSymbols(action) {
  const { label, ids, onSuccess, onError, transformResponse = data => data } = action;
  yield put({ type: 'REST_START', label });
  try {
    const start = Date.now() - ((24*60*60*1000) * 1); // 24hrs
    const end = Date.now();
    // fetch all data
    const { symbols, symbolsHistories } = yield all({
      symbols: call(requester, `/v2/assets?ids=${ids}`),
      // make requests simultaneously
      symbolsHistories: all(ids.reduce((acc, id) => {
        // { bitcoin: call(requester, 'xx'), ... }
        acc[id] = call(requester, `/v2/assets/${id}/history?interval=h1&start=${start}&end=${end}`);
        return acc;
      }, {})),
    });
    // aggregate
    for (const symbol of symbols) {
      symbol.histories = symbolsHistories[symbol.id];
    }
    yield put({ type: 'REST_FINISH', label });
    if (onSuccess) yield put(onSuccess(transformResponse(symbols)));
  } catch (error) {
    yield put({ type: 'REST_FINISH', label });
    if (onError) yield put(onError(error));
  }
}

export default function *restSaga () {
  yield takeEvery('REST', onRest);
  yield takeEvery('FETCH_SYMBOLS', onFetchSymbols);
};