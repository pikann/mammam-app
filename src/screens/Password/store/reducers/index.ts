import produce from 'immer';

import * as PasswordActions from '../actions';

export const initialState = {
  isLoading: false,
  isUpdated: true,
};

export type PasswordState = typeof initialState;

const passwordReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: PasswordState) => {
    switch (type) {
      case PasswordActions.Types.LOADING.begin:
        draft.isLoading = true;
        break;
      case PasswordActions.Types.LOADING.succeeded:
        draft.isLoading = false;
        draft.isUpdated = payload;
        break;
      case PasswordActions.Types.RESET_UPDATED.begin:
        draft.isUpdated = false;
        break;
      default:
        break;
    }
  });

export default passwordReducer;
