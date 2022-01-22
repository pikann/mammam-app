import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory('WATCHING', 'SET_GETTING_TYPE');

export const setGettingType = createActionGenerator(Types.SET_GETTING_TYPE);
