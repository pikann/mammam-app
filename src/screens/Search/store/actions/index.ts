import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'SEARCH',
  'SEARCH_USERS',
  'SEARCH_POSTS',
  'APPEND_SEARCH_USERS',
  'APPEND_SEARCH_POSTS',
);

export const searchUsers = createActionGenerator(Types.SEARCH_USERS);
export const searchPosts = createActionGenerator(Types.SEARCH_POSTS);
export const appendSearchUsers = createActionGenerator(
  Types.APPEND_SEARCH_USERS,
);
export const appendSearchPosts = createActionGenerator(
  Types.APPEND_SEARCH_POSTS,
);
