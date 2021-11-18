import {call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosClientInstance from '../../utils/axios';

import * as AppActions from '../actions';

interface Data {
  [key: string]: any;
}

function* checkLogin() {
  try {
    const token: string = yield call(AsyncStorage.getItem, 'access_token');

    if (token) {
      yield put({
        type: AppActions.Types.CHECK_LOGIN.succeeded,
        payload: {
          login: true,
        },
      });

      AxiosClientInstance.setHeader(token);
    } else {
      yield put({
        type: AppActions.Types.CHECK_LOGIN.succeeded,
        payload: {
          login: false,
        },
      });

      AxiosClientInstance.setHeader('');
    }
  } catch (error) {
    yield put({
      type: AppActions.Types.CHECK_LOGIN.failed,
      payload: error,
    });
  }
}

function* logout() {
  try {
    yield AsyncStorage.removeItem('access_token');
    yield AsyncStorage.removeItem('email');
    yield AsyncStorage.removeItem('id_user');
    yield AsyncStorage.removeItem('refresh_token');
    yield AsyncStorage.removeItem('role');
    yield AsyncStorage.removeItem('username');

    yield put({type: AppActions.Types.CHECK_LOGIN.begin});

    yield put({
      type: AppActions.Types.LOGOUT.succeeded,
    });
  } catch (error) {
    yield put({
      type: AppActions.Types.LOGOUT.failed,
      payload: error,
    });
  }
}

export default function* appWatcher() {
  yield takeLatest(AppActions.Types.CHECK_LOGIN.begin, checkLogin);
  yield takeLatest(AppActions.Types.LOGOUT.begin, logout);
}
