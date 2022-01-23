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

export {makeSelectUserId, makeSelectUsername, makeSelectAvatar, makeSelectBio};
