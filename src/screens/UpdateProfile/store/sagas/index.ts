import {call, put, takeLatest} from 'redux-saga/effects';

import * as UpdateProfileAction from '../actions';
import * as AppActions from '../../../../store/actions';
import {getPresignedUrlService, updateProfileService} from '../services';
import {uploadToS3} from '../../../../utils/uploadS3';

interface Data {
  [key: string]: any;
}

function* updateProfileSaga({payload}: any) {
  try {
    yield put({
      type: UpdateProfileAction.Types.LOADING.begin,
    });

    const {
      data: {imageUrl, presignedUrl},
    }: Data = yield call(getPresignedUrlService);

    yield call(uploadToS3, {
      url: presignedUrl,
      image: payload.avatar,
      type: payload.avatarType,
    });

    yield call(updateProfileService, {
      username: payload.username,
      avatar: imageUrl,
    });

    yield put({
      type: UpdateProfileAction.Types.LOADING.succeeded,
    });
    yield put({
      type: UpdateProfileAction.Types.UPDATE_PROFILE.succeeded,
    });
    yield put({
      type: AppActions.Types.GET_USER_PROFILE.succeeded,
      payload,
    });
  } catch (error) {
    yield put({
      type: UpdateProfileAction.Types.LOADING.succeeded,
    });
    yield put({
      type: UpdateProfileAction.Types.UPDATE_PROFILE.failed,
      payload: error,
    });
  }
}

export default function* updateProfileWatcher() {
  yield takeLatest(
    UpdateProfileAction.Types.UPDATE_PROFILE.begin,
    updateProfileSaga,
  );
}
