import {call, put, takeLatest} from 'redux-saga/effects';

import * as UserAction from '../actions';
import * as HomeAction from '../../../Home/store/actions';
import {
  followService,
  getFollowersTotalService,
  getPostOfUserService,
  unfollowService,
} from '../services';

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

function* followSaga({payload}: any) {
  try {
    yield call(followService, payload);

    yield put({
      type: UserAction.Types.FOLLOW.succeeded,
    });
  } catch (error) {
    yield put({
      type: UserAction.Types.FOLLOW.failed,
      payload,
      error,
    });
  }
}

function* unfollowSaga({payload}: any) {
  try {
    yield call(unfollowService, payload);

    yield put({
      type: UserAction.Types.UNFOLLOW.succeeded,
    });
  } catch (error) {
    yield put({
      type: UserAction.Types.UNFOLLOW.failed,
      payload,
      error,
    });
  }
}

function* getFollowersTotalSaga({payload}: any) {
  try {
    const response: Data = yield call(getFollowersTotalService, payload);

    yield put({
      type: UserAction.Types.GET_FOLLOWERS_TOTAL.succeeded,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserAction.Types.GET_FOLLOWERS_TOTAL.failed,
      payload,
      error,
    });
  }
}

export default function* userWatcher() {
  yield takeLatest(UserAction.Types.GET_USER_POSTS.begin, getPostOfUserSaga);
  yield takeLatest(
    UserAction.Types.APPEND_USER_POSTS.begin,
    appendPostOfUserSaga,
  );
  yield takeLatest(UserAction.Types.FOLLOW.begin, followSaga);
  yield takeLatest(UserAction.Types.UNFOLLOW.begin, unfollowSaga);
  yield takeLatest(
    UserAction.Types.GET_FOLLOWERS_TOTAL.begin,
    getFollowersTotalSaga,
  );
}
