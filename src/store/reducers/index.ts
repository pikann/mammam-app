import produce from 'immer';

import * as AppActions from '../actions';

export const initialState = {
  login: false,
  username: '',
  avatar: '',
};

export type AppState = typeof initialState;

const registerReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: AppState) => {
    switch (type) {
      case AppActions.Types.CHECK_LOGIN.succeeded:
        draft.login = payload.login;
        break;
      case AppActions.Types.GET_USER_PROFILE.succeeded:
        if (payload.username) {
          draft.username = payload.username;
        }
        if (payload.avatar) {
          draft.avatar = payload.avatar;
        }
        draft.login = true;
        break;
      default:
        break;
    }
  });

export default registerReducer;
