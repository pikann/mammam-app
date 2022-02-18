import {call, put, takeLatest} from 'redux-saga/effects';

import * as RestaurantAction from '../actions';
import * as HomeAction from '../../../Home/store/actions';
import {getPostOfRestaurantService} from '../services';

interface Data {
  [key: string]: any;
}

function* getPostOfRestaurantSaga({payload}: any) {
  try {
    yield put({
      type: RestaurantAction.Types.GET_RESTAURANT_POSTS.succeeded,
      payload: {posts: [], restaurant: {}},
    });

    yield put({
      type: HomeAction.Types.LOADING.begin,
    });

    const response: Data = yield call(getPostOfRestaurantService, {
      restaurantId: payload.restaurant._id,
      page: payload.page,
    });

    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });

    yield put({
      type: RestaurantAction.Types.GET_RESTAURANT_POSTS.succeeded,
      payload: {posts: response.data.data, restaurant: payload.restaurant},
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });
    yield put({
      type: RestaurantAction.Types.GET_RESTAURANT_POSTS.failed,
      payload,
      error,
    });
  }
}

function* appendPostOfRestaurantSaga({payload}: any) {
  try {
    yield put({
      type: HomeAction.Types.LOADING.begin,
    });

    const response: Data = yield call(getPostOfRestaurantService, {
      restaurantId: payload.restaurant._id,
      page: payload.page,
    });

    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });

    yield put({
      type: RestaurantAction.Types.APPEND_RESTAURANT_POSTS.succeeded,
      payload: {posts: response.data.data, restaurant: payload.restaurant},
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });
    yield put({
      type: RestaurantAction.Types.APPEND_RESTAURANT_POSTS.failed,
      payload,
      error,
    });
  }
}

export default function* restaurantWatcher() {
  yield takeLatest(
    RestaurantAction.Types.GET_RESTAURANT_POSTS.begin,
    getPostOfRestaurantSaga,
  );
  yield takeLatest(
    RestaurantAction.Types.APPEND_RESTAURANT_POSTS.begin,
    appendPostOfRestaurantSaga,
  );
}
