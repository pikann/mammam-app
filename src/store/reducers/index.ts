import produce from 'immer';

import * as AppActions from '../actions';

export const initialState = {
  started: false,
  login: false,
  id: '',
  username: '',
  avatar: '',
};

export type AppState = typeof initialState;

const appReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: AppState) => {
    switch (type) {
      case AppActions.Types.CHECK_LOGIN.succeeded:
        draft.login = payload.login;
        if (!draft.started) {
          draft.started = true;
        }
        break;
      case AppActions.Types.GET_USER_PROFILE.succeeded:
        if (payload.id) {
          draft.id = payload.id;
        }
        if (payload.username) {
          draft.username = payload.username;
        }
        if (payload.avatar) {
          draft.avatar = payload.avatar;
        }
        draft.login = true;
        if (!draft.started) {
          draft.started = true;
        }
        break;
      default:
        break;
    }
  });

export default appReducer;
