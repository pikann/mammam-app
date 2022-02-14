import produce from 'immer';

import * as MapActions from '../actions';
import {IRestaurant} from '../interfaces/restaurant';

export const initialState = {
  restaurants: [] as IRestaurant[],
  isLoading: false,
};

export type MapState = typeof initialState;

const mapReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: MapState) => {
    switch (type) {
      case MapActions.Types.SEARCH_RESTAURANT.succeeded:
        draft.restaurants = payload.data;
        break;
      case MapActions.Types.APPEND_SEARCH_RESTAURANT.succeeded:
        if (payload.data.length > 0) {
          draft.restaurants = {...draft.restaurants, ...payload.data};
        }
        break;
      case MapActions.Types.LOADING.begin:
        draft.isLoading = true;
        break;
      case MapActions.Types.LOADING.succeeded:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default mapReducer;
