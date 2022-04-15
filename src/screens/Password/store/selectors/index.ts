import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const passwordState = (state: any) =>
  state.passwordReducer || initialState;

const makeSelectLoading = () =>
  createSelector(passwordState, state => {
    return state.isLoading;
  });

const makeSelectUpdated = () =>
  createSelector(passwordState, state => {
    return state.isUpdated;
  });

export {makeSelectLoading, makeSelectUpdated};
