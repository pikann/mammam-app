import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'ENTER_ADDRESS',
  'SET_RESTAURANT_PROFILE',
  'CREATE_RESTAURANT',
  'UPDATE_RESTAURANT',
  'RESET_COMPLETE',
  'LOADING',
);

export const setRestaurantProfile = createActionGenerator(
  Types.SET_RESTAURANT_PROFILE,
);
export const createRestaurant = createActionGenerator(Types.CREATE_RESTAURANT);
export const updateRestaurant = createActionGenerator(Types.UPDATE_RESTAURANT);
export const resetComplete = createActionGenerator(Types.RESET_COMPLETE);
export const showLoading = createActionGenerator(Types.LOADING);
