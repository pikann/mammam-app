import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'USER',
  'SET_USER_INFO',
  'GET_USER_POSTS',
  'APPEND_USER_POSTS',
  'FOLLOW',
  'UNFOLLOW',
  'GET_FOLLOWERS_TOTAL',
  'LOADING',
);

export const setUserInfo = createActionGenerator(Types.SET_USER_INFO);
export const getUserPosts = createActionGenerator(Types.GET_USER_POSTS);
export const appendUserPosts = createActionGenerator(Types.APPEND_USER_POSTS);
export const follow = createActionGenerator(Types.FOLLOW);
export const unfollow = createActionGenerator(Types.UNFOLLOW);
export const getFollowersTotal = createActionGenerator(
  Types.GET_FOLLOWERS_TOTAL,
);
export const showLoading = createActionGenerator(Types.LOADING);
