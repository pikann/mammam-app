import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const userRestaurantState = (state: any) =>
  state.userRestaurantReducer || initialState;

const makeSelectRestaurants = () =>
  createSelector(userRestaurantState, state => {
    return state.restaurants;
  });

const makeSelectLoading = () =>
  createSelector(userRestaurantState, state => {
    return state.isLoading;
  });

export {makeSelectRestaurants, makeSelectLoading};
