import produce from 'immer';
import {IRestaurant} from '../../../../interfaces/post';

import * as PostActions from '../actions';

export const initialState = {
  videoURI: '',
  videoType: '',
  videoDuration: 0,
  isLoading: false,
  updateId: '',
  defaultDescription: '',
  defaultRestaurant: undefined as IRestaurant | undefined,
};

export type PostState = typeof initialState;

const postReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: PostState) => {
    switch (type) {
      case PostActions.Types.PICK_VIDEO.begin:
        draft.videoURI = payload.uri;
        draft.videoType = payload.type;
        draft.videoDuration = payload.duration;
        draft.updateId = '';
        break;
      case PostActions.Types.SET_UPDATE_VIDEO.begin:
        draft.videoURI = payload.videoURI;
        draft.updateId = payload.updateId;
        draft.defaultDescription = payload.defaultDescription;
        draft.defaultRestaurant = payload.defaultRestaurant;
        break;
      case PostActions.Types.LOADING.begin:
        draft.isLoading = true;
        break;
      case PostActions.Types.LOADING.succeeded:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default postReducer;
