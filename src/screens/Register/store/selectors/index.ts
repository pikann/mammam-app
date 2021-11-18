import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const registerState = (state: any) =>
  state.registerReducer || initialState;

const makeSelectLoading = () =>
  createSelector(registerState, state => {
    return state.isLoading;
  });

export {makeSelectLoading};
