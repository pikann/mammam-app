import produce from 'immer';

import * as UserActions from '../actions';

export const initialState = {
  userId: '',
  username: '',
  avatar: '',
  bio: '',
};

export type UserState = typeof initialState;

const userReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: UserState) => {
    switch (type) {
      case UserActions.Types.SET_USER_INFO.begin:
        draft.userId = payload.userId;
        draft.username = payload.username;
        draft.avatar = payload.avatar;
        draft.bio = payload.bio;
        break;
      default:
        break;
    }
  });

export default userReducer;
