import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const updateProfileState = (state: any) =>
  state.updateProfileReducer || initialState;

const makeSelectLoading = () =>
  createSelector(updateProfileState, state => {
    return state.isLoading;
  });

export {makeSelectLoading};
