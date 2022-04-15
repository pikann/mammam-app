import produce from 'immer';

import * as UserActions from '../actions';

export const initialState = {
  userId: '',
  username: '',
  avatar: '',
  bio: '',
  isFollowed: false,
  followers: 0,
  followings: 0,
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
        draft.isFollowed = payload.isFollowed;
        break;
      case UserActions.Types.FOLLOW.succeeded:
        draft.isFollowed = true;
        draft.followers++;
        break;
      case UserActions.Types.UNFOLLOW.succeeded:
        draft.isFollowed = false;
        draft.followers--;
        break;
      case UserActions.Types.GET_FOLLOWERS_TOTAL.succeeded:
        draft.followers = payload.followers;
        draft.followings = payload.followings;
        break;
      default:
        break;
    }
  });

export default userReducer;
