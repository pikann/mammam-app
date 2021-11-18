import {all, fork} from '@redux-saga/core/effects';

import appWatcher from '../store/sagas';
import registerWatcher from '../screens/Register/store/sagas';

export function* rootSaga() {
  yield all([fork(appWatcher)]);
  yield all([fork(registerWatcher)]);
}
