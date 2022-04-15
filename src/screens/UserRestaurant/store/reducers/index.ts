import produce from 'immer';

import * as UserRestaurantActions from '../actions';
import {IRestaurant} from '../interfaces/restaurant';

export const initialState = {
  restaurants: [] as IRestaurant[],
  isLoading: false,
};

export type UserRestaurantState = typeof initialState;

const userRestaurantReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: UserRestaurantState) => {
    let index = 0;
    switch (type) {
      case UserRestaurantActions.Types.GET_USER_RESTAURANT.succeeded:
        draft.restaurants = payload.data;
        break;
      case UserRestaurantActions.Types.APPEND_USER_RESTAURANT.succeeded:
        if (payload.data.length > 0) {
          draft.restaurants = [...draft.restaurants, ...payload.data];
        }
        break;
      case UserRestaurantActions.Types.LOADING.begin:
        draft.isLoading = true;
        break;
      case UserRestaurantActions.Types.LOADING.succeeded:
        draft.isLoading = false;
        break;
      case UserRestaurantActions.Types.DELETE_RESTAURANT.succeeded:
        index = draft.restaurants.findIndex(
          restaurant => restaurant._id === payload,
        );
        draft.restaurants.splice(index, 1);
        break;
      default:
        break;
    }
  });

export default userRestaurantReducer;
