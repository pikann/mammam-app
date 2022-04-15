import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const enterAddressState = (state: any) =>
  state.enterAddressReducer || initialState;

const makeSelectId = () =>
  createSelector(enterAddressState, state => {
    return state._id;
  });

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

const makeSelectAddress = () =>
  createSelector(enterAddressState, state => {
    return state.address;
  });

const makeSelectLatitude = () =>
  createSelector(enterAddressState, state => {
    return state.latitude;
  });

const makeSelectLongitude = () =>
  createSelector(enterAddressState, state => {
    return state.longitude;
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
  makeSelectId,
  makeSelectName,
  makeSelectBio,
  makeSelectAvatar,
  makeSelectAvatarType,
  makeSelectAddress,
  makeSelectLatitude,
  makeSelectLongitude,
  makeSelectLoading,
  makeSelectComplete,
};
