import produce from 'immer';

import * as AppActions from '../actions';

export const initialState = {
  isLoading: false,
};

export type RegisterState = typeof initialState;

const registerReducer = (state = initialState, {type}: any) =>
  produce(state, (draft: RegisterState) => {
    switch (type) {
      case AppActions.Types.LOADING.begin:
        draft.isLoading = true;
        break;
      case AppActions.Types.LOADING.succeeded:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default registerReducer;
