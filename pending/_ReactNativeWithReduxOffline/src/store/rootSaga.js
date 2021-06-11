import { all, fork } from "redux-saga/effects";

import { watchLogin } from "./auth/sagas";
import { watchUsers } from "./users/sagas";

export default function* rootSaga() {
  yield all([watchLogin(), watchUsers()]);
}
