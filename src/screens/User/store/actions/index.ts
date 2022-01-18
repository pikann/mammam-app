import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'USER',
  'GET_USER_POSTS',
  'APPEND_USER_POSTS',
  'LOADING',
);

export const getUserPosts = createActionGenerator(Types.GET_USER_POSTS);
export const appendUserPosts = createActionGenerator(Types.APPEND_USER_POSTS);
export const showLoading = createActionGenerator(Types.LOADING);
