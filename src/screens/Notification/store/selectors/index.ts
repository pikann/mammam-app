import {createSelector} from 'reselect';

import {initialState} from '../reducers';

export const notificationState = (state: any) =>
  state.notificationReducer || initialState;

const makeSelectNotifications = () =>
  createSelector(notificationState, state => {
    return state.notifications;
  });

const makeSelectTotalPage = () =>
  createSelector(notificationState, state => {
    return state.totalPage;
  });

const makeSelectLoading = () =>
  createSelector(notificationState, state => {
    return state.isLoading;
  });

export {makeSelectNotifications, makeSelectTotalPage, makeSelectLoading};
