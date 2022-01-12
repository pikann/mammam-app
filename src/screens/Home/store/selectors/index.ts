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

const makeSelectTotalComment = () =>
  createSelector(homeState, state => {
    return state.totalComment;
  });

const makeSelectTotalPageComment = () =>
  createSelector(homeState, state => {
    return state.totalPageComment;
  });

const makeSelectPageComment = () =>
  createSelector(homeState, state => {
    return state.pageComment;
  });

const makeSelectLoadingComments = () =>
  createSelector(homeState, state => {
    return state.loadingComments;
  });

const makeSelectCurrentPostId = () =>
  createSelector(homeState, state => {
    return state.currentPostId;
  });

const makeSelectLoading = () =>
  createSelector(homeState, state => {
    return state.isLoading;
  });

const makeSelectGetPostsTag = () =>
  createSelector(homeState, state => {
    return state.getPostsTag;
  });

export {
  makeSelectPosts,
  makeSelectComments,
  makeSelectTotalComment,
  makeSelectTotalPageComment,
  makeSelectPageComment,
  makeSelectLoadingComments,
  makeSelectCurrentPostId,
  makeSelectLoading,
  makeSelectGetPostsTag,
};
