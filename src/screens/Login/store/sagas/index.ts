import {call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as LoginAction from '../actions';
import * as AppAction from '../../../../store/actions';
import {loginService} from '../services';

interface Data {
  [key: string]: any;
}

function* loginSaga({payload}: any) {
  try {
    yield put({
      type: LoginAction.Types.LOADING.begin,
    });
    const response: Data = yield call(loginService, payload);

    yield put({
      type: LoginAction.Types.LOADING.succeeded,
    });
    yield put({
      type: LoginAction.Types.LOGIN.succeeded,
    });

    yield AsyncStorage.setItem('access_token', response.data.access_token);
    yield AsyncStorage.setItem('email', response.data.email);
    yield AsyncStorage.setItem('id_user', response.data.id_user);
    yield AsyncStorage.setItem('refresh_token', response.data.refresh_token);
    yield AsyncStorage.setItem('role', response.data.role);
    yield AsyncStorage.setItem('username', response.data.username);

    yield put({
      type: AppAction.Types.CHECK_LOGIN.begin,
    });
  } catch (error) {
    yield put({
      type: LoginAction.Types.LOADING.succeeded,
    });
    yield put({
      type: LoginAction.Types.LOGIN.failed,
      payload,
      error,
    });
  }
}

export default function* loginWatcher() {
  yield takeLatest(LoginAction.Types.LOGIN.begin, loginSaga);
}
