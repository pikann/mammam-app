import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'USER_RESTAURANT',
  'GET_USER_RESTAURANT',
  'APPEND_USER_RESTAURANT',
  'DELETE_RESTAURANT',
  'LOADING',
);

export const getUserRestaurant = createActionGenerator(
  Types.GET_USER_RESTAURANT,
);
export const appendUserRestaurant = createActionGenerator(
  Types.APPEND_USER_RESTAURANT,
);
export const deleteRestaurant = createActionGenerator(Types.DELETE_RESTAURANT);
export const showLoading = createActionGenerator(Types.LOADING);
