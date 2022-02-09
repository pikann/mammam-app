import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory(
  'NOTIFICATION',
  'GET_NOTIFICATION',
  'APPEND_NOTIFICATION',
  'GET_ONE_POST',
  'APPEND_REALTIME_NOTIFICATION',
  'GET_NOTIFICATION_COUNT',
  'LOADING',
);

export const getNotification = createActionGenerator(Types.GET_NOTIFICATION);
export const appendNotification = createActionGenerator(
  Types.APPEND_NOTIFICATION,
);
export const getOnePost = createActionGenerator(Types.GET_ONE_POST);
export const appendRealtimeNotification = createActionGenerator(
  Types.APPEND_REALTIME_NOTIFICATION,
);
export const getNotificationCount = createActionGenerator(
  Types.GET_NOTIFICATION_COUNT,
);
export const loading = createActionGenerator(Types.LOADING);
