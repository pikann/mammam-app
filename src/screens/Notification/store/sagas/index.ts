import {call, put, takeLatest} from 'redux-saga/effects';

import * as NotificationAction from '../actions';
import {getNotificationService, getOnePostService} from '../services';

interface Data {
  [key: string]: any;
}

function* getNotificationSaga({payload}: any) {
  try {
    yield put({
      type: NotificationAction.Types.LOADING.begin,
    });
    const response: Data = yield call(getNotificationService, payload);

    yield put({
      type: NotificationAction.Types.LOADING.succeeded,
    });

    yield put({
      type: NotificationAction.Types.GET_NOTIFICATION.succeeded,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: NotificationAction.Types.LOADING.succeeded,
    });
    yield put({
      type: NotificationAction.Types.GET_NOTIFICATION.failed,
      payload,
      error,
    });
  }
}

function* appendNotificationSaga({payload}: any) {
  try {
    yield put({
      type: NotificationAction.Types.LOADING.begin,
    });
    const response: Data = yield call(getNotificationService, payload);

    yield put({
      type: NotificationAction.Types.LOADING.succeeded,
    });

    yield put({
      type: NotificationAction.Types.APPEND_NOTIFICATION.succeeded,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: NotificationAction.Types.LOADING.succeeded,
    });
    yield put({
      type: NotificationAction.Types.APPEND_NOTIFICATION.failed,
      payload,
      error,
    });
  }
}

function* getOnePostSaga({payload}: any) {
  try {
    const response: Data = yield call(getOnePostService, payload);

    yield put({
      type: NotificationAction.Types.GET_ONE_POST.succeeded,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: NotificationAction.Types.GET_ONE_POST.failed,
      payload,
      error,
    });
  }
}

export default function* notificationWatcher() {
  yield takeLatest(
    NotificationAction.Types.GET_NOTIFICATION.begin,
    getNotificationSaga,
  );
  yield takeLatest(
    NotificationAction.Types.APPEND_NOTIFICATION.begin,
    appendNotificationSaga,
  );
  yield takeLatest(NotificationAction.Types.GET_ONE_POST.begin, getOnePostSaga);
}
