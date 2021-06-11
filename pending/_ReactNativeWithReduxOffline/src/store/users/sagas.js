import { put, takeEvery, delay } from "redux-saga/effects";

import { GET_USERS, GET_USERS_SUCCESS, ERROR, FOLLOW_USER } from "./types";

function* getUser() {
  try {
    const rawRes = yield fetch("https://jsonplaceholder.typicode.com/users");
    const data = yield rawRes.json();
    if (rawRes.status != 200) throw data;
    const payload = data.map(item => {
      item.following = false;
      return item;
    });
    yield put({
      type: GET_USERS_SUCCESS,
      payload
    });
  } catch (error) {
    yield put({ type: ERROR, payload: error });
  }
}

function* followUser(action) {
  console.log(action);
}

export function* watchUsers() {
  yield takeEvery(GET_USERS, getUser);
  yield takeEvery(FOLLOW_USER, followUser);
}
