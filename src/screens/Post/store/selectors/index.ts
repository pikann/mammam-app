import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const postState = (state: any) => state.postReducer || initialState;

const makeSelectVideoURI = () =>
  createSelector(postState, state => {
    return state.videoURI;
  });

const makeSelectVideoType = () =>
  createSelector(postState, state => {
    return state.videoType;
  });

const makeSelectVideoDuration = () =>
  createSelector(postState, state => {
    return state.videoDuration;
  });

const makeSelectIsLoading = () =>
  createSelector(postState, state => {
    return state.isLoading;
  });

const makeSelectUpdateId = () =>
  createSelector(postState, state => {
    return state.updateId;
  });

const makeSelectDefaultDescription = () =>
  createSelector(postState, state => {
    return state.defaultDescription;
  });

export {
  makeSelectVideoURI,
  makeSelectVideoType,
  makeSelectVideoDuration,
  makeSelectIsLoading,
  makeSelectUpdateId,
  makeSelectDefaultDescription,
};
