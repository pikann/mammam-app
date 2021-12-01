import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'UPDATE_PROFILE',
  'UPDATE_PROFILE',
  'LOADING',
);

export const updateProfile = createActionGenerator(Types.UPDATE_PROFILE);
export const showLoading = createActionGenerator(Types.LOADING);
