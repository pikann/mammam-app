import {call, put, takeLatest} from 'redux-saga/effects';

import * as SearchAction from '../actions';
import * as HomeAction from '../../../Home/store/actions';
import {searchPostService, searchUserService} from '../services';

interface Data {
  [key: string]: any;
}

function* searchPostsSaga({payload}: any) {
  try {
    yield put({
      type: HomeAction.Types.GET_POSTS.succeeded,
      payload: [],
    });

    yield put({
      type: HomeAction.Types.LOADING.begin,
    });

    const response: Data = yield call(searchPostService, payload);

    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });

    yield put({
      type: HomeAction.Types.GET_POSTS.succeeded,
      payload: response.data.data,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });

    yield put({
      type: SearchAction.Types.SEARCH_POSTS.failed,
      payload: error,
    });
  }
}

function* appendSearchPostsSaga({payload}: any) {
  try {
    yield put({
      type: HomeAction.Types.LOADING.begin,
    });

    const response: Data = yield call(searchPostService, payload);

    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });

    yield put({
      type: HomeAction.Types.APPEND_POSTS.succeeded,
      payload: response.data.data,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });

    yield put({
      type: SearchAction.Types.APPEND_SEARCH_POSTS.failed,
      payload: error,
    });
  }
}

function* searchUsersSaga({payload}: any) {
  try {
    yield put({
      type: SearchAction.Types.SEARCH_USERS.succeeded,
      payload: [],
    });

    yield put({
      type: HomeAction.Types.LOADING.begin,
    });

    const response: Data = yield call(searchUserService, payload);

    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });

    yield put({
      type: SearchAction.Types.SEARCH_USERS.succeeded,
      payload: response.data.data,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });

    yield put({
      type: SearchAction.Types.SEARCH_USERS.failed,
      payload: error,
    });
  }
}

function* appendSearchUsersSaga({payload}: any) {
  try {
    yield put({
      type: HomeAction.Types.LOADING.begin,
    });

    const response: Data = yield call(searchUserService, payload);

    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });

    yield put({
      type: SearchAction.Types.APPEND_SEARCH_USERS.succeeded,
      payload: response.data.data,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });

    yield put({
      type: SearchAction.Types.APPEND_SEARCH_USERS.failed,
      payload: error,
    });
  }
}

export default function* updateProfileWatcher() {
  yield takeLatest(SearchAction.Types.SEARCH_POSTS.begin, searchPostsSaga);
  yield takeLatest(
    SearchAction.Types.APPEND_SEARCH_POSTS.begin,
    appendSearchPostsSaga,
  );
  yield takeLatest(SearchAction.Types.SEARCH_USERS.begin, searchUsersSaga);
  yield takeLatest(
    SearchAction.Types.APPEND_SEARCH_USERS.begin,
    appendSearchUsersSaga,
  );
}
