import produce from 'immer';

import {IRestaurant} from '../../../../interfaces/post';
import * as RestaurantActions from '../actions';

export const initialState = {
  restaurant: undefined as IRestaurant | undefined,
};

export type RestaurantState = typeof initialState;

const restaurantReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: RestaurantState) => {
    switch (type) {
      case RestaurantActions.Types.SET_RESTAURANT_INFO.begin:
        draft.restaurant = payload;
        break;
      default:
        break;
    }
  });

export default restaurantReducer;
