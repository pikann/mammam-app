import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const userState = (state: any) => state.userReducer || initialState;

const makeSelectLoading = () =>
  createSelector(userState, state => {
    return state.isLoading;
  });

export {makeSelectLoading};
