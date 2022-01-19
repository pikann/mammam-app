import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'PASSWORD',
  'UPDATE_PASSWORD',
  'LOADING',
  'RESET_UPDATED',
);

export const updatePassword = createActionGenerator(Types.UPDATE_PASSWORD);
export const showLoading = createActionGenerator(Types.LOADING);
export const resetUpdated = createActionGenerator(Types.RESET_UPDATED);
