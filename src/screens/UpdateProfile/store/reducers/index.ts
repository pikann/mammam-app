import produce from 'immer';

import * as UpdateProfileActions from '../actions';

export const initialState = {
  isLoading: false,
};

export type UpdateProfileState = typeof initialState;

const updateProfileReducer = (state = initialState, {type}: any) =>
  produce(state, (draft: UpdateProfileState) => {
    switch (type) {
      case UpdateProfileActions.Types.LOADING.begin:
        draft.isLoading = true;
        break;
      case UpdateProfileActions.Types.LOADING.succeeded:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default updateProfileReducer;
