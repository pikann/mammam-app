import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const userState = (state: any) => state.userReducer || initialState;

const makeSelectUserId = () =>
  createSelector(userState, state => {
    return state.userId;
  });

const makeSelectUsername = () =>
  createSelector(userState, state => {
    return state.username;
  });

const makeSelectAvatar = () =>
  createSelector(userState, state => {
    return state.avatar;
  });

const makeSelectBio = () =>
  createSelector(userState, state => {
    return state.bio;
  });

const makeSelectIsFollowed = () =>
  createSelector(userState, state => {
    return state.isFollowed;
  });

const makeSelectFollowers = () =>
  createSelector(userState, state => {
    return state.followers;
  });

const makeSelectFollowings = () =>
  createSelector(userState, state => {
    return state.followings;
  });

export {
  makeSelectUserId,
  makeSelectUsername,
  makeSelectAvatar,
  makeSelectBio,
  makeSelectIsFollowed,
  makeSelectFollowers,
  makeSelectFollowings,
};
