import {call, put, takeLatest} from 'redux-saga/effects';

import * as PasswordActions from '../actions';
import {updatePasswordService} from '../services';

interface Data {
  [key: string]: any;
}

function* updatePasswordSaga({payload}: any) {
  try {
    yield put({
      type: PasswordActions.Types.LOADING.begin,
    });
    yield call(updatePasswordService, payload);

    yield put({
      type: PasswordActions.Types.LOADING.succeeded,
      payload: true,
    });
    yield put({
      type: PasswordActions.Types.UPDATE_PASSWORD.succeeded,
    });
  } catch (error) {
    yield put({
      type: PasswordActions.Types.LOADING.succeeded,
      payload: false,
    });
    yield put({
      type: PasswordActions.Types.UPDATE_PASSWORD.failed,
      payload,
      error,
    });
  }
}

export default function* passwordWatcher() {
  yield takeLatest(
    PasswordActions.Types.UPDATE_PASSWORD.begin,
    updatePasswordSaga,
  );
}
