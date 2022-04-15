import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const appState = (state: any) => state.appReducer || initialState;

const makeSelectStarted = () =>
  createSelector(appState, state => {
    return state.started;
  });

const makeSelectLogin = () =>
  createSelector(appState, state => {
    return state.login;
  });

const makeSelectId = () =>
  createSelector(appState, state => {
    return state.id;
  });

const makeSelectUsername = () =>
  createSelector(appState, state => {
    return state.username;
  });

const makeSelectAvatar = () =>
  createSelector(appState, state => {
    return state.avatar;
  });

const makeSelectBio = () =>
  createSelector(appState, state => {
    return state.bio;
  });

export {
  makeSelectStarted,
  makeSelectLogin,
  makeSelectId,
  makeSelectUsername,
  makeSelectAvatar,
  makeSelectBio,
};
