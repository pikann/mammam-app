import produce from 'immer';

import * as NotificationActions from '../actions';
import {INotification} from '../interfaces/notification';

export const initialState = {
  notifications: [] as INotification[],
  totalPage: 0,
  notificationsCount: 0,
  isLoading: false,
};

export type NotificationState = typeof initialState;

const notificationReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: NotificationState) => {
    switch (type) {
      case NotificationActions.Types.GET_NOTIFICATION.succeeded:
        draft.notifications = payload.data;
        draft.totalPage = payload.totalPage;
        break;
      case NotificationActions.Types.APPEND_NOTIFICATION.succeeded:
        if (payload.data.length > 0) {
          const availableIds = draft.notifications.map(
            notification => notification._id,
          );
          draft.notifications = [
            ...draft.notifications,
            ...payload.data.filter(
              (notification: INotification) =>
                !availableIds.includes(notification._id),
            ),
          ];
          draft.totalPage = payload.totalPage;
        }
        break;
      case NotificationActions.Types.APPEND_REALTIME_NOTIFICATION.begin:
        const availableIds = draft.notifications.map(
          notification => notification._id,
        );
        if (!availableIds.includes(payload._id)) {
          draft.notifications = [payload, ...draft.notifications];
        }
        draft.notificationsCount++;
        break;
      case NotificationActions.Types.LOADING.begin:
        draft.isLoading = true;
        break;
      case NotificationActions.Types.LOADING.succeeded:
        draft.isLoading = false;
        break;
      case NotificationActions.Types.GET_NOTIFICATION_COUNT.succeeded:
        draft.notificationsCount = payload;
        break;
      default:
        break;
    }
  });

export default notificationReducer;
