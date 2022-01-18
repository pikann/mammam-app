import produce from 'immer';

import * as PostActions from '../actions';

export const initialState = {
  videoURI: '',
  videoType: '',
  videoDuration: 0,
  isLoading: false,
};

export type PostState = typeof initialState;

const postReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: PostState) => {
    switch (type) {
      case PostActions.Types.PICK_VIDEO.begin:
        draft.videoURI = payload.uri;
        draft.videoType = payload.type;
        draft.videoDuration = payload.duration;
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
