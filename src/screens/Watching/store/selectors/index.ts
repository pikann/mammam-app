import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const watchingState = (state: any) =>
  state.watchingReducer || initialState;

const makeSelectGettingType = () =>
  createSelector(watchingState, state => {
    return state.gettingType;
  });

const makeSelectGettingPayload = () =>
  createSelector(watchingState, state => {
    return state.gettingPayload;
  });

const makeSelectIndexBegin = () =>
  createSelector(watchingState, state => {
    return state.indexBegin;
  });

const makeSelectPage = () =>
  createSelector(watchingState, state => {
    return state.page;
  });

export {
  makeSelectGettingType,
  makeSelectGettingPayload,
  makeSelectIndexBegin,
  makeSelectPage,
};
