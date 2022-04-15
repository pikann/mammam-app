import {call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as RegisterAction from '../actions';
import * as AppAction from '../../../../store/actions';
import {registerService} from '../services';

interface Data {
  [key: string]: any;
}

function* registerSaga({payload}: any) {
  try {
    yield put({
      type: RegisterAction.Types.LOADING.begin,
    });
    const response: Data = yield call(registerService, payload);

    yield put({
      type: RegisterAction.Types.LOADING.succeeded,
    });
    yield put({
      type: RegisterAction.Types.REGISTER.succeeded,
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
      type: RegisterAction.Types.LOADING.succeeded,
    });
    yield put({
      type: RegisterAction.Types.REGISTER.failed,
      payload,
      error,
    });
  }
}

export default function* registerWatcher() {
  yield takeLatest(RegisterAction.Types.REGISTER.begin, registerSaga);
}
