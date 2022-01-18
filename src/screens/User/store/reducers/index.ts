import produce from 'immer';

import * as UserActions from '../actions';

export const initialState = {
  isLoading: false,
};

export type UserState = typeof initialState;

const userReducer = (state = initialState, {type}: any) =>
  produce(state, (draft: UserState) => {
    switch (type) {
      case UserActions.Types.LOADING.begin:
        draft.isLoading = true;
        break;
      case UserActions.Types.LOADING.succeeded:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default userReducer;
