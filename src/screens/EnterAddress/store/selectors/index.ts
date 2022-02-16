import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const enterAddressState = (state: any) =>
  state.enterAddressReducer || initialState;

const makeSelectName = () =>
  createSelector(enterAddressState, state => {
    return state.name;
  });

const makeSelectBio = () =>
  createSelector(enterAddressState, state => {
    return state.bio;
  });

const makeSelectAvatar = () =>
  createSelector(enterAddressState, state => {
    return state.avatar;
  });

const makeSelectAvatarType = () =>
  createSelector(enterAddressState, state => {
    return state.avatarType;
  });

const makeSelectLoading = () =>
  createSelector(enterAddressState, state => {
    return state.isLoading;
  });

const makeSelectComplete = () =>
  createSelector(enterAddressState, state => {
    return state.complete;
  });

export {
  makeSelectName,
  makeSelectBio,
  makeSelectAvatar,
  makeSelectAvatarType,
  makeSelectLoading,
  makeSelectComplete,
};
