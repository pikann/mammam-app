import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const searchState = (state: any) => state.searchReducer || initialState;

const makeSelectUsers = () =>
  createSelector(searchState, state => {
    return state.users;
  });

export {makeSelectUsers};
