import {call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosClientInstance from '../../utils/axios';

import * as AppActions from '../actions';
import {refreshTokenService} from '../services';

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
    yield AsyncStorage.clear();

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

function* refreshToken() {
  try {
    const token: string = yield call(AsyncStorage.getItem, 'refresh_token');

    if (token) {
      const response: Data = yield call(refreshTokenService, token);

      yield AsyncStorage.setItem('access_token', response.data.access_token);
      yield AsyncStorage.setItem('refresh_token', response.data.access_token);
      AxiosClientInstance.setHeader(response.data.access_token);

      yield put({type: AppActions.Types.REFRESH_TOKEN.succeeded});
    } else {
      yield put({type: AppActions.Types.LOGOUT.begin});
    }
  } catch (error) {
    yield put({
      type: AppActions.Types.REFRESH_TOKEN.failed,
      payload: error,
    });
  }
}

export default function* appWatcher() {
  yield takeLatest(AppActions.Types.CHECK_LOGIN.begin, checkLogin);
  yield takeLatest(AppActions.Types.LOGOUT.begin, logout);
  yield takeLatest(AppActions.Types.REFRESH_TOKEN.begin, refreshToken);
}
