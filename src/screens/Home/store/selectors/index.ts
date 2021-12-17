import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const homeState = (state: any) => state.homeReducer || initialState;

const makeSelectPosts = () =>
  createSelector(homeState, state => {
    return state.posts;
  });

const makeSelectComments = () =>
  createSelector(homeState, state => {
    return state.comments;
  });

const makeSelectLoadingComments = () =>
  createSelector(homeState, state => {
    return state.loadingComments;
  });

const makeSelectCurrentPostId = () =>
  createSelector(homeState, state => {
    return state.currentPostId;
  });

export {
  makeSelectPosts,
  makeSelectComments,
  makeSelectLoadingComments,
  makeSelectCurrentPostId,
};
