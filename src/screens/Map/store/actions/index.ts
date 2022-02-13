import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'MAP',
  'SEARCH_RESTAURANT',
  'APPEND_SEARCH_RESTAURANT',
  'LOADING',
);

export const searchRestaurant = createActionGenerator(Types.SEARCH_RESTAURANT);
export const appendSearchRestaurant = createActionGenerator(
  Types.APPEND_SEARCH_RESTAURANT,
);
export const showLoading = createActionGenerator(Types.LOADING);
