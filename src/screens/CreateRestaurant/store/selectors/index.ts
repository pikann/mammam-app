import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const createRestaurantState = (state: any) =>
  state.createRestaurantReducer || initialState;

const makeSelectId = () =>
  createSelector(createRestaurantState, state => {
    return state._id;
  });

const makeSelectName = () =>
  createSelector(createRestaurantState, state => {
    return state.name;
  });

const makeSelectBio = () =>
  createSelector(createRestaurantState, state => {
    return state.bio;
  });

const makeSelectAvatar = () =>
  createSelector(createRestaurantState, state => {
    return state.avatar;
  });

const makeSelectAddress = () =>
  createSelector(createRestaurantState, state => {
    return state.address;
  });

const makeSelectLatitude = () =>
  createSelector(createRestaurantState, state => {
    return state.latitude;
  });

const makeSelectLongitude = () =>
  createSelector(createRestaurantState, state => {
    return state.longitude;
  });

export {
  makeSelectId,
  makeSelectName,
  makeSelectBio,
  makeSelectAvatar,
  makeSelectAddress,
  makeSelectLatitude,
  makeSelectLongitude,
};
