import produce from 'immer';

import * as HomeActions from '../actions';
import {IPost} from '../interfaces/post';

export const initialState = {
  posts: [] as IPost[],
};

export type HomeState = typeof initialState;

const homeReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: HomeState) => {
    let index = 0;
    switch (type) {
      case HomeActions.Types.GET_POSTS.succeeded:
        draft.posts = [...draft.posts, ...payload];
        break;
      case HomeActions.Types.LIKE_POST.succeeded:
        index = draft.posts.findIndex(post => post._id === payload);
        if (!draft.posts[index].isLiked) {
          draft.posts[index].isLiked = true;
          draft.posts[index].likeTotal++;
        }
        break;
      case HomeActions.Types.DISLIKE_POST.succeeded:
        index = draft.posts.findIndex(post => post._id === payload);
        if (draft.posts[index].isLiked) {
          draft.posts[index].isLiked = false;
          draft.posts[index].likeTotal--;
        }
        break;
      default:
        break;
    }
  });

export default homeReducer;
