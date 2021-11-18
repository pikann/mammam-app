import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory('REGISTER', 'REGISTER', 'LOADING');

export const register = createActionGenerator(Types.REGISTER);
export const showLoading = createActionGenerator(Types.LOADING);
