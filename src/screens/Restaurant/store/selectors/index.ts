import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const restaurantState = (state: any) =>
  state.restaurantReducer || initialState;

const makeSelectRestaurant = () =>
  createSelector(restaurantState, state => {
    return state.restaurant;
  });

export {makeSelectRestaurant};
