import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const appState = (state: any) => state.appReducer || initialState;

const makeSelectLogin = () =>
  createSelector(appState, state => {
    return state.login;
  });

const makeSelectUsername = () =>
  createSelector(appState, state => {
    return state.username;
  });

const makeSelectAvatar = () =>
  createSelector(appState, state => {
    return state.avatar;
  });

export {makeSelectLogin, makeSelectUsername, makeSelectAvatar};
