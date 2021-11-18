import {all, fork} from '@redux-saga/core/effects';

import appWatcher from '../store/sagas';
import registerWatcher from '../screens/Register/store/sagas';
import loginWatcher from '../screens/Login/store/sagas';

export function* rootSaga() {
  yield all([fork(appWatcher)]);
  yield all([fork(registerWatcher)]);
  yield all([fork(loginWatcher)]);
}
