import produce from 'immer';

import * as PostActions from '../actions';

export const initialState = {
  videoURI: '',
  videoType: '',
};

export type PostState = typeof initialState;

const postReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: PostState) => {
    switch (type) {
      case PostActions.Types.PICK_VIDEO.begin:
        draft.videoURI = payload.uri;
        draft.videoType = payload.type;
        break;
      default:
        break;
    }
  });

export default postReducer;
