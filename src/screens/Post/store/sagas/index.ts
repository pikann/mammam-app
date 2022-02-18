import {call, put, takeLatest} from 'redux-saga/effects';

import * as PostAction from '../actions';
import {
  postService,
  updatePostService,
  uploadThumbnail,
  uploadToS3Service,
} from '../services';

interface Data {
  [key: string]: any;
}

function* postVideoSaga({payload}: any) {
  try {
    yield put({
      type: PostAction.Types.LOADING.begin,
    });

    const uploadVideoPromise = uploadToS3Service({
      video: payload.video,
      type: payload.videoType,
    });

    const uploadThumbnailPromise = uploadThumbnail({
      video: payload.video,
      type: payload.videoType,
      duration: payload.videoDuration,
    });

    const [videoUrl, thumbnailUrl]: [string, string] = yield Promise.all([
      uploadVideoPromise,
      uploadThumbnailPromise,
    ]);

    yield call(postService, {
      description: payload.description,
      url: videoUrl,
      thumbnail: thumbnailUrl,
      restaurant: payload.restaurant,
    });

    yield put({
      type: PostAction.Types.LOADING.succeeded,
    });

    yield call(payload.callback);
  } catch (error) {
    yield put({
      type: PostAction.Types.LOADING.succeeded,
    });
    yield put({
      type: PostAction.Types.POST_VIDEO.failed,
      payload,
      error,
    });
  }
}

function* updatePostSaga({payload}: any) {
  try {
    yield put({
      type: PostAction.Types.LOADING.begin,
    });

    yield call(updatePostService, {
      _id: payload._id,
      description: payload.description,
    });

    yield put({
      type: PostAction.Types.LOADING.succeeded,
    });

    yield call(payload.callback);
  } catch (error) {
    yield put({
      type: PostAction.Types.LOADING.succeeded,
    });
    yield put({
      type: PostAction.Types.UPDATE_POST.failed,
      payload,
      error,
    });
  }
}

export default function* updateProfileWatcher() {
  yield takeLatest(PostAction.Types.POST_VIDEO.begin, postVideoSaga);
  yield takeLatest(PostAction.Types.UPDATE_POST.begin, updatePostSaga);
}
