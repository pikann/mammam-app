import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'CREATE_RESTAURANT',
  'SET_RESTAURANT_INFO',
);

export const setRestaurantInfo = createActionGenerator(
  Types.SET_RESTAURANT_INFO,
);
