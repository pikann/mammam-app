import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const homeState = (state: any) => state.homeReducer || initialState;

const makeSelectPosts = () =>
  createSelector(homeState, state => {
    return state.posts;
  });

export {makeSelectPosts};
