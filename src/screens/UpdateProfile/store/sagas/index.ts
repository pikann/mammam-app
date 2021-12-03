import {call, put, takeLatest} from 'redux-saga/effects';

import * as UpdateProfileAction from '../actions';
import {updateProfileService} from '../services';

interface Data {
  [key: string]: any;
}

function* updateProfileSaga({payload}: any) {
  try {
    yield put({
      type: UpdateProfileAction.Types.LOADING.begin,
    });
    yield call(updateProfileService, payload);

    yield put({
      type: UpdateProfileAction.Types.LOADING.succeeded,
    });
    yield put({
      type: UpdateProfileAction.Types.UPDATE_PROFILE.succeeded,
    });
  } catch (error) {
    yield put({
      type: UpdateProfileAction.Types.LOADING.succeeded,
    });
    yield put({
      type: UpdateProfileAction.Types.UPDATE_PROFILE.failed,
      payload: error,
    });
  }
}

export default function* updateProfileWatcher() {
  yield takeLatest(
    UpdateProfileAction.Types.UPDATE_PROFILE.begin,
    updateProfileSaga,
  );
}
