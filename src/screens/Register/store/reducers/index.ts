import produce from 'immer';

import * as RegisterActions from '../actions';

export const initialState = {
  isLoading: false,
};

export type RegisterState = typeof initialState;

const registerReducer = (state = initialState, {type}: any) =>
  produce(state, (draft: RegisterState) => {
    switch (type) {
      case RegisterActions.Types.LOADING.begin:
        draft.isLoading = true;
        break;
      case RegisterActions.Types.LOADING.succeeded:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default registerReducer;
