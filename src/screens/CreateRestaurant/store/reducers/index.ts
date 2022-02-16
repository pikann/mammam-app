import produce from 'immer';

import * as CreateRestaurantActions from '../actions';

export const initialState = {
  _id: '',
  name: '',
  bio: '',
  avatar: '',
  address: '',
  latitude: 0,
  longitude: 0,
};

export type CreateRestaurantState = typeof initialState;

const createRestaurantReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: CreateRestaurantState) => {
    switch (type) {
      case CreateRestaurantActions.Types.SET_RESTAURANT_INFO.begin:
        draft._id = payload._id;
        draft.name = payload.name;
        draft.bio = payload.bio;
        draft.avatar = payload.avatar;
        draft.address = payload.address;
        draft.latitude = payload.latitude;
        draft.longitude = payload.longitude;
        break;
      default:
        break;
    }
  });

export default createRestaurantReducer;
