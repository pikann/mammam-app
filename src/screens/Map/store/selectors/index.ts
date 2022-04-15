import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const mapState = (state: any) => state.mapReducer || initialState;

const makeSelectRestaurants = () =>
  createSelector(mapState, state => {
    return state.restaurants;
  });

const makeSelectLoading = () =>
  createSelector(mapState, state => {
    return state.isLoading;
  });

export {makeSelectRestaurants, makeSelectLoading};
