import { put, delay, takeEvery } from 'redux-saga/effects';
import { SnackbarPortal } from 'react-native-base-components/src/snackbar';

function *showSnackbar({ message, timeout = 3000 }) {
  const id = SnackbarPortal.show(message, {
    onClose: () => SnackbarPortal.dismiss(id),
    onSwipeOut: () => SnackbarPortal.dismiss(id),
  });
  yield delay(timeout);
  yield put({ type: 'DISMISS_NOTIFICATION', id });
}

function *dimissSnackbar({ id }) {
  SnackbarPortal.dismiss(id);
}

export default function *notifcationSaga () {
  yield takeEvery('SHOW_NOTIFICATION', showSnackbar);
  yield takeEvery('DISMISS_NOTIFICATION', dimissSnackbar);
};