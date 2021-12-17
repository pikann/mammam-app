import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'HOME',
  'GET_POSTS',
  'LIKE_POST',
  'DISLIKE_POST',
  'VIEW_POST',
  'GET_COMMENTS',
  'APPEND_COMMENTS',
  'LOADING_COMMENTS',
  'LIKE_COMMENT',
  'DISLIKE_COMMENT',
  'SET_CURRENT_POST_ID',
  'GET_REPLIES_COMMENT',
  'APPEND_REPLIES_COMMENT',
);

export const getPosts = createActionGenerator(Types.GET_POSTS);
export const likePost = createActionGenerator(Types.LIKE_POST);
export const dislikePost = createActionGenerator(Types.DISLIKE_POST);
export const viewPost = createActionGenerator(Types.VIEW_POST);
export const getComments = createActionGenerator(Types.GET_COMMENTS);
export const appendComments = createActionGenerator(Types.APPEND_COMMENTS);
export const loadingComment = createActionGenerator(Types.LOADING_COMMENTS);
export const likeComment = createActionGenerator(Types.LIKE_COMMENT);
export const dislikeComment = createActionGenerator(Types.DISLIKE_COMMENT);
export const setCurrentPostId = createActionGenerator(
  Types.SET_CURRENT_POST_ID,
);
export const getRepliesComment = createActionGenerator(
  Types.GET_REPLIES_COMMENT,
);
export const appendRepliesComment = createActionGenerator(
  Types.APPEND_REPLIES_COMMENT,
);
