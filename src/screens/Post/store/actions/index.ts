import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'POST',
  'PICK_VIDEO',
  'POST_VIDEO',
  'UPDATE_POST',
  'LOADING',
  'SET_UPDATE_VIDEO',
);

export const pickVideo = createActionGenerator(Types.PICK_VIDEO);
export const postVideo = createActionGenerator(Types.POST_VIDEO);
export const updatePost = createActionGenerator(Types.UPDATE_POST);
export const loading = createActionGenerator(Types.LOADING);
export const setUpdateVideo = createActionGenerator(Types.SET_UPDATE_VIDEO);
