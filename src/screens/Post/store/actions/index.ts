import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory('POST', 'PICK_VIDEO');

export const pickVideo = createActionGenerator(Types.PICK_VIDEO);
