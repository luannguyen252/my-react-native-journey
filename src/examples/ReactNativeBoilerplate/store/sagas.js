import { fork } from "redux-saga/effects";
import homeSagas from "./home/homeSagas";

export default function* rootSaga() {
  yield fork(homeSagas);
}
