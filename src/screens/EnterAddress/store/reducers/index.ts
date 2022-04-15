import produce from 'immer';

import * as EnterAddressActions from '../actions';

export const initialState = {
  _id: '',
  name: '',
  bio: '',
  avatar: '',
  avatarType: '',
  address: '',
  latitude: 0,
  longitude: 0,
  isLoading: false,
  complete: false,
};

export type EnterAddressState = typeof initialState;

const enterAddressReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: EnterAddressState) => {
    switch (type) {
      case EnterAddressActions.Types.SET_RESTAURANT_PROFILE.begin:
        draft._id = payload._id;
        draft.name = payload.name;
        draft.bio = payload.bio;
        draft.avatar = payload.avatar;
        draft.avatarType = payload.avatarType;
        draft.address = payload.address;
        draft.latitude = payload.latitude;
        draft.longitude = payload.longitude;
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
      case EnterAddressActions.Types.UPDATE_RESTAURANT.succeeded:
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
