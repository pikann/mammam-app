import {call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import AxiosClientInstance from '../../utils/axios';
import SocketClientInstance from '../../utils/socket';
import * as AppActions from '../actions';
import {getUserProfileService, refreshTokenService} from '../services';

interface Data {
  [key: string]: any;
}

function* checkLogin() {
  try {
    const token: string = yield call(AsyncStorage.getItem, 'access_token');

    if (token) {
      AxiosClientInstance.setHeader(token);
      SocketClientInstance.connect(token);
      yield put({type: AppActions.Types.GET_USER_PROFILE.begin});
    } else {
      yield put({
        type: AppActions.Types.CHECK_LOGIN.succeeded,
        payload: {
          login: false,
        },
      });

      AxiosClientInstance.setHeader('');
      SocketClientInstance.disconnect();
    }
  } catch (error) {
    yield put({
      type: AppActions.Types.CHECK_LOGIN.failed,
      error,
    });
  }
}

function* logout() {
  try {
    const userId: string = yield call(AsyncStorage.getItem, 'id_user');

    yield messaging().unsubscribeFromTopic(userId);

    yield AsyncStorage.clear();

    yield put({type: AppActions.Types.CHECK_LOGIN.begin});

    SocketClientInstance.disconnect();

    yield put({
      type: AppActions.Types.LOGOUT.succeeded,
    });
  } catch (error) {
    yield put({
      type: AppActions.Types.LOGOUT.failed,
      error,
    });
  }
}

function* refreshToken() {
  try {
    const token: string = yield call(AsyncStorage.getItem, 'refresh_token');

    if (token) {
      const response: Data = yield call(refreshTokenService, token);

      yield AsyncStorage.setItem('access_token', response.data.access_token);
      yield AsyncStorage.setItem('refresh_token', response.data.refresh_token);
      AxiosClientInstance.setHeader(response.data.access_token);

      yield put({type: AppActions.Types.REFRESH_TOKEN.succeeded});
    } else {
      yield put({type: AppActions.Types.LOGOUT.begin});
    }
  } catch (error) {
    yield put({
      type: AppActions.Types.REFRESH_TOKEN.failed,
      error,
    });
  }
}

function* getUserProfileSaga() {
  try {
    const response: Data = yield call(getUserProfileService);

    yield put({
      type: AppActions.Types.GET_USER_PROFILE.succeeded,
      payload: {
        id: response.data._id,
        username: response.data.username,
        avatar: response.data.avatar,
        bio: response.data.bio,
      },
    });
  } catch (error) {
    yield put({
      type: AppActions.Types.GET_USER_PROFILE.failed,
      error,
    });
  }
}

export default function* appWatcher() {
  yield takeLatest(AppActions.Types.CHECK_LOGIN.begin, checkLogin);
  yield takeLatest(AppActions.Types.LOGOUT.begin, logout);
  yield takeLatest(AppActions.Types.REFRESH_TOKEN.begin, refreshToken);
  yield takeLatest(AppActions.Types.GET_USER_PROFILE.begin, getUserProfileSaga);
}
