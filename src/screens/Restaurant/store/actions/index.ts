import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'RESTAURANT',
  'SET_RESTAURANT_INFO',
  'GET_RESTAURANT_POSTS',
  'APPEND_RESTAURANT_POSTS',
);

export const setRestaurantInfo = createActionGenerator(
  Types.SET_RESTAURANT_INFO,
);
export const getRestaurantPosts = createActionGenerator(
  Types.GET_RESTAURANT_POSTS,
);
export const appendRestaurantPosts = createActionGenerator(
  Types.APPEND_RESTAURANT_POSTS,
);
