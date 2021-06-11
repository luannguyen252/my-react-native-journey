import { put, takeEvery, delay } from "redux-saga/effects";

import { LOGIN, LOGOUT, ERROR, UPDATE_USER } from "./types";

function* getUser() {
  const rawRes = yield fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = yield rawRes.json();
  yield put({ type: UPDATE_USER, payload: data });
}

export function* watchLogin() {
  yield takeEvery(LOGIN, getUser);
}
