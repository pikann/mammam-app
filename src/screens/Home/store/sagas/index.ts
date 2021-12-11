import {call, put, takeLatest} from 'redux-saga/effects';

import * as HomeAction from '../actions';
import {
  dislikePostService,
  getPostsService,
  likePostService,
  viewPostService,
} from '../services';

interface Data {
  [key: string]: any;
}

function* getPostsSaga() {
  try {
    const response: Data = yield call(getPostsService);

    yield put({
      type: HomeAction.Types.GET_POSTS.succeeded,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.GET_POSTS.failed,
      payload: error,
    });
  }
}

function* likePostSaga({payload}: any) {
  try {
    yield call(likePostService, payload);

    yield put({
      type: HomeAction.Types.LIKE_POST.succeeded,
      payload,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LIKE_POST.failed,
      payload: error,
    });
  }
}

function* dislikePostSaga({payload}: any) {
  try {
    yield call(dislikePostService, payload);

    yield put({
      type: HomeAction.Types.DISLIKE_POST.succeeded,
      payload,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.DISLIKE_POST.failed,
      payload: error,
    });
  }
}

function* viewPostSaga({payload}: any) {
  try {
    yield call(viewPostService, payload);

    yield put({
      type: HomeAction.Types.VIEW_POST.succeeded,
      payload,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.VIEW_POST.failed,
      payload: error,
    });
  }
}

export default function* homeWatcher() {
  yield takeLatest(HomeAction.Types.GET_POSTS.begin, getPostsSaga);
  yield takeLatest(HomeAction.Types.LIKE_POST.begin, likePostSaga);
  yield takeLatest(HomeAction.Types.DISLIKE_POST.begin, dislikePostSaga);
  yield takeLatest(HomeAction.Types.VIEW_POST.begin, viewPostSaga);
}
