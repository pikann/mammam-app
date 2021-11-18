import {createActionGenerator} from '../../utils/actionGenerator';
import {actionTypesFactory} from '../../utils/actionTypesFactory';

export const Types = actionTypesFactory('APP', 'CHECK_LOGIN', 'LOGOUT');

export const checkLogin = createActionGenerator(Types.CHECK_LOGIN);
export const logout = createActionGenerator(Types.LOGOUT);
