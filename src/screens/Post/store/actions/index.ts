import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'POST',
  'PICK_VIDEO',
  'POST_VIDEO',
  'LOADING',
);

export const pickVideo = createActionGenerator(Types.PICK_VIDEO);
export const postVideo = createActionGenerator(Types.POST_VIDEO);
export const loading = createActionGenerator(Types.LOADING);
