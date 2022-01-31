import {call, put, takeLatest} from 'redux-saga/effects';

import * as UserAction from '../actions';
import * as HomeAction from '../../../Home/store/actions';
import {getPostOfUserService} from '../services';

interface Data {
  [key: string]: any;
}

function* getPostOfUserSaga({payload}: any) {
  try {
    yield put({
      type: UserAction.Types.GET_USER_POSTS.succeeded,
      payload: {posts: [], author: {}},
    });

    yield put({
      type: HomeAction.Types.LOADING.begin,
    });

    const response: Data = yield call(getPostOfUserService, {
      userId: payload.author._id,
      page: payload.page,
    });

    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });

    yield put({
      type: UserAction.Types.GET_USER_POSTS.succeeded,
      payload: {posts: response.data.data, author: payload.author},
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });
    yield put({
      type: UserAction.Types.GET_USER_POSTS.failed,
      payload,
      error,
    });
  }
}

function* appendPostOfUserSaga({payload}: any) {
  try {
    yield put({
      type: UserAction.Types.APPEND_USER_POSTS.succeeded,
      payload: {posts: [], author: {}},
    });

    yield put({
      type: HomeAction.Types.LOADING.begin,
    });

    const response: Data = yield call(getPostOfUserService, {
      userId: payload.author._id,
      page: payload.page,
    });

    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });

    yield put({
      type: UserAction.Types.APPEND_USER_POSTS.succeeded,
      payload: {posts: response.data.data, author: payload.author},
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });
    yield put({
      type: UserAction.Types.APPEND_USER_POSTS.failed,
      payload,
      error,
    });
  }
}

export default function* updateProfileWatcher() {
  yield takeLatest(UserAction.Types.GET_USER_POSTS.begin, getPostOfUserSaga);
  yield takeLatest(
    UserAction.Types.APPEND_USER_POSTS.begin,
    appendPostOfUserSaga,
  );
}
