import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'HOME',
  'GET_POSTS',
  'LIKE_POST',
  'DISLIKE_POST',
  'VIEW_POST',
);

export const getPosts = createActionGenerator(Types.GET_POSTS);
export const likePost = createActionGenerator(Types.LIKE_POST);
export const dislikePost = createActionGenerator(Types.DISLIKE_POST);
export const viewPost = createActionGenerator(Types.VIEW_POST);
