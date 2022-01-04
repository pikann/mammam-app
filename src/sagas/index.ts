import {all, fork} from '@redux-saga/core/effects';

import appWatcher from '../store/sagas';
import registerWatcher from '../screens/Register/store/sagas';
import loginWatcher from '../screens/Login/store/sagas';
import updateProfileWatcher from '../screens/UpdateProfile/store/sagas';
import homeWatcher from '../screens/Home/store/sagas';
import postWatcher from '../screens/Post/store/sagas';

export function* rootSaga() {
  yield all([fork(appWatcher)]);
  yield all([fork(registerWatcher)]);
  yield all([fork(loginWatcher)]);
  yield all([fork(updateProfileWatcher)]);
  yield all([fork(homeWatcher)]);
  yield all([fork(postWatcher)]);
}
