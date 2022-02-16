import produce from 'immer';

import * as EnterAddressActions from '../actions';

export const initialState = {
  name: '',
  bio: '',
  avatar: '',
  avatarType: '',
  isLoading: false,
  complete: false,
};

export type EnterAddressState = typeof initialState;

const enterAddressReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: EnterAddressState) => {
    switch (type) {
      case EnterAddressActions.Types.SET_RESTAURANT_PROFILE.begin:
        draft.name = payload.name;
        draft.bio = payload.bio;
        draft.avatar = payload.avatar;
        draft.avatarType = payload.avatarType;
        break;
      case EnterAddressActions.Types.LOADING.begin:
        draft.isLoading = true;
        break;
      case EnterAddressActions.Types.LOADING.succeeded:
        draft.isLoading = false;
        break;
      case EnterAddressActions.Types.CREATE_RESTAURANT.succeeded:
        draft.complete = true;
        break;
      case EnterAddressActions.Types.RESET_COMPLETE.begin:
        draft.complete = false;
        break;
      default:
        break;
    }
  });

export default enterAddressReducer;
