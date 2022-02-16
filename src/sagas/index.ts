import {all, fork} from '@redux-saga/core/effects';

import appWatcher from '../store/sagas';
import registerWatcher from '../screens/Register/store/sagas';
import loginWatcher from '../screens/Login/store/sagas';
import updateProfileWatcher from '../screens/UpdateProfile/store/sagas';
import homeWatcher from '../screens/Home/store/sagas';
import postWatcher from '../screens/Post/store/sagas';
import userWatcher from '../screens/User/store/sagas';
import passwordWatcher from '../screens/Password/store/sagas';
import searchWatcher from '../screens/Search/store/sagas';
import notificationWatcher from '../screens/Notification/store/sagas';
import mapWatcher from '../screens/Map/store/sagas';
import userRestaurantWatcher from '../screens/UserRestaurant/store/sagas';
import enterAddressWatcher from '../screens/EnterAddress/store/sagas';

export function* rootSaga() {
  yield all([fork(appWatcher)]);
  yield all([fork(registerWatcher)]);
  yield all([fork(loginWatcher)]);
  yield all([fork(updateProfileWatcher)]);
  yield all([fork(homeWatcher)]);
  yield all([fork(postWatcher)]);
  yield all([fork(userWatcher)]);
  yield all([fork(passwordWatcher)]);
  yield all([fork(searchWatcher)]);
  yield all([fork(notificationWatcher)]);
  yield all([fork(mapWatcher)]);
  yield all([fork(userRestaurantWatcher)]);
  yield all([fork(enterAddressWatcher)]);
}
