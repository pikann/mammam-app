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

const makeSelectIsLoading = () =>
  createSelector(postState, state => {
    return state.isLoading;
  });

export {makeSelectVideoURI, makeSelectVideoType, makeSelectIsLoading};
