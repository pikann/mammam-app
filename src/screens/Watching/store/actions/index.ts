import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'WATCHING',
  'SET_GETTING_TYPE',
  'SET_PAGE',
);

export const setGettingType = createActionGenerator(Types.SET_GETTING_TYPE);
export const setPage = createActionGenerator(Types.SET_PAGE);
