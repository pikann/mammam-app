import produce from 'immer';

import * as LoginActions from '../actions';
import {IRestaurant} from '../interfaces/restaurant';

export const initialState = {
  restaurants: [] as IRestaurant[],
  isLoading: false,
};

export type LoginState = typeof initialState;

const loginReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: LoginState) => {
    switch (type) {
      case LoginActions.Types.SEARCH_RESTAURANT.succeeded:
        draft.restaurants = payload.data;
        break;
      case LoginActions.Types.APPEND_SEARCH_RESTAURANT.succeeded:
        if (payload.data.length > 0) {
          draft.restaurants = {...draft.restaurants, ...payload.data};
        }
        break;
      case LoginActions.Types.LOADING.begin:
        draft.isLoading = true;
        break;
      case LoginActions.Types.LOADING.succeeded:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default loginReducer;
