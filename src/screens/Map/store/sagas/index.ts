import {call, put, takeLatest} from 'redux-saga/effects';

import * as MapAction from '../actions';
import {searchRestaurantService} from '../services';

interface Data {
  [key: string]: any;
}

function* searchRestaurantSaga({payload}: any) {
  try {
    yield put({
      type: MapAction.Types.LOADING.begin,
    });
    const response: Data = yield call(searchRestaurantService, payload);

    yield put({
      type: MapAction.Types.LOADING.succeeded,
    });

    yield put({
      type: MapAction.Types.SEARCH_RESTAURANT.succeeded,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MapAction.Types.LOADING.succeeded,
    });
    yield put({
      type: MapAction.Types.SEARCH_RESTAURANT.failed,
      payload,
      error,
    });
  }
}

function* appendSearchRestaurantSaga({payload}: any) {
  try {
    yield put({
      type: MapAction.Types.LOADING.begin,
    });
    const response: Data = yield call(searchRestaurantService, payload);

    yield put({
      type: MapAction.Types.LOADING.succeeded,
    });

    yield put({
      type: MapAction.Types.APPEND_SEARCH_RESTAURANT.succeeded,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MapAction.Types.LOADING.succeeded,
    });
    yield put({
      type: MapAction.Types.APPEND_SEARCH_RESTAURANT.failed,
      payload,
      error,
    });
  }
}

export default function* mapWatcher() {
  yield takeLatest(
    MapAction.Types.SEARCH_RESTAURANT.begin,
    searchRestaurantSaga,
  );
  yield takeLatest(
    MapAction.Types.APPEND_SEARCH_RESTAURANT.begin,
    appendSearchRestaurantSaga,
  );
}
