import {call, put, takeLatest} from 'redux-saga/effects';

import * as UserRestaurantAction from '../actions';
import {deleteRestaurantService, getUserRestaurantService} from '../services';

interface Data {
  [key: string]: any;
}

function* getUserRestaurantSaga({payload}: any) {
  try {
    yield put({
      type: UserRestaurantAction.Types.LOADING.begin,
    });
    const response: Data = yield call(getUserRestaurantService, payload);

    yield put({
      type: UserRestaurantAction.Types.LOADING.succeeded,
    });

    yield put({
      type: UserRestaurantAction.Types.GET_USER_RESTAURANT.succeeded,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserRestaurantAction.Types.LOADING.succeeded,
    });
    yield put({
      type: UserRestaurantAction.Types.GET_USER_RESTAURANT.failed,
      payload,
      error,
    });
  }
}

function* appendUserRestaurantSaga({payload}: any) {
  try {
    yield put({
      type: UserRestaurantAction.Types.LOADING.begin,
    });
    const response: Data = yield call(getUserRestaurantService, payload);

    yield put({
      type: UserRestaurantAction.Types.LOADING.succeeded,
    });

    yield put({
      type: UserRestaurantAction.Types.APPEND_USER_RESTAURANT.succeeded,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserRestaurantAction.Types.LOADING.succeeded,
    });
    yield put({
      type: UserRestaurantAction.Types.APPEND_USER_RESTAURANT.failed,
      payload,
      error,
    });
  }
}

function* deleteRestaurantSaga({payload}: any) {
  try {
    yield call(deleteRestaurantService, payload);

    yield put({
      type: UserRestaurantAction.Types.DELETE_RESTAURANT.succeeded,
      payload,
    });
  } catch (error) {
    yield put({
      type: UserRestaurantAction.Types.DELETE_RESTAURANT.failed,
      payload,
      error,
    });
  }
}

export default function* userRestaurantWatcher() {
  yield takeLatest(
    UserRestaurantAction.Types.GET_USER_RESTAURANT.begin,
    getUserRestaurantSaga,
  );
  yield takeLatest(
    UserRestaurantAction.Types.APPEND_USER_RESTAURANT.begin,
    appendUserRestaurantSaga,
  );
  yield takeLatest(
    UserRestaurantAction.Types.DELETE_RESTAURANT.begin,
    deleteRestaurantSaga,
  );
}
