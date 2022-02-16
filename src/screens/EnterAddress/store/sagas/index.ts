import {call, put, takeLatest} from 'redux-saga/effects';

import * as EnterAddressAction from '../actions';
import {uploadToS3} from '../../../../utils/uploadS3';
import {createRestaurantService, getPresignedUrlService} from '../services';

interface Data {
  [key: string]: any;
}

function* createRestaurantSaga({payload}: any) {
  try {
    yield put({
      type: EnterAddressAction.Types.LOADING.begin,
    });

    const createPayload = {
      name: payload.name,
      bio: payload.bio,
      avatar: undefined,
      address: payload.address,
      latitude: payload.latitude,
      longitude: payload.longitude,
    };

    if (payload.avatar) {
      const {
        data: {imageUrl, presignedUrl},
      }: Data = yield call(getPresignedUrlService);

      yield call(uploadToS3, {
        url: presignedUrl,
        image: payload.avatar,
        type: payload.avatarType,
      });

      createPayload.avatar = imageUrl;
    }

    yield call(createRestaurantService, createPayload);

    yield put({
      type: EnterAddressAction.Types.LOADING.succeeded,
    });
    yield put({
      type: EnterAddressAction.Types.CREATE_RESTAURANT.succeeded,
    });
  } catch (error) {
    yield put({
      type: EnterAddressAction.Types.LOADING.succeeded,
    });
    yield put({
      type: EnterAddressAction.Types.CREATE_RESTAURANT.failed,
      payload,
      error,
    });
  }
}

export default function* enterAddressWatcher() {
  yield takeLatest(
    EnterAddressAction.Types.CREATE_RESTAURANT.begin,
    createRestaurantSaga,
  );
}
