import {call, put, takeLatest} from 'redux-saga/effects';

import {uploadToS3} from '../../../../utils/uploadS3';
import * as PostAction from '../actions';
import {getPresignedUrlService, postService} from '../services';

interface Data {
  [key: string]: any;
}

function* postVideoSaga({payload}: any) {
  try {
    yield put({
      type: PostAction.Types.LOADING.begin,
    });

    const {
      data: {imageUrl: videoUrl, presignedUrl},
    }: Data = yield call(getPresignedUrlService);

    yield call(uploadToS3, {
      url: presignedUrl,
      image: payload.video,
      type: payload.videoType,
    });

    yield call(postService, {
      description: payload.description,
      url: videoUrl,
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
      payload: error,
    });
  }
}

export default function* updateProfileWatcher() {
  yield takeLatest(PostAction.Types.POST_VIDEO.begin, postVideoSaga);
}
