import produce from 'immer';

import * as HomeActions from '../actions';
import {IComment} from '../interfaces/comment';
import {IPost} from '../interfaces/post';

export const initialState = {
  posts: [] as IPost[],
  comments: [] as IComment[],
  loadingComments: false,
  currentPostId: '',
};

export type HomeState = typeof initialState;

const homeReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: HomeState) => {
    let index = 0;
    switch (type) {
      case HomeActions.Types.GET_POSTS.succeeded:
        draft.posts = [
          ...draft.posts,
          ...payload.map((post: IPost) => {
            return {...post, loadingReplies: false};
          }),
        ];
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
      case HomeActions.Types.GET_COMMENTS.succeeded:
        draft.comments = payload.map((comment: IComment) => {
          return {
            ...comment,
            replies: [],
          };
        });
        break;
      case HomeActions.Types.APPEND_COMMENTS.succeeded:
        draft.comments = [
          ...draft.comments,
          ...payload.map((comment: IComment) => {
            return {
              ...comment,
              replies: [],
            };
          }),
        ];
        break;
      case HomeActions.Types.LOADING_COMMENTS.begin:
        draft.loadingComments = true;
        break;
      case HomeActions.Types.LOADING_COMMENTS.succeeded:
        draft.loadingComments = false;
        break;
      case HomeActions.Types.LIKE_COMMENT.succeeded:
        index = draft.comments.findIndex(comment => comment._id === payload);

        if (index >= 0) {
          if (!draft.comments[index].isLiked) {
            draft.comments[index].isLiked = true;
            draft.comments[index].likeTotal++;
          }
        } else {
          draft.comments.forEach(comment => {
            index = comment.replies.findIndex(reply => reply._id === payload);
            if (index >= 0) {
              if (!comment.replies[index].isLiked) {
                comment.replies[index].isLiked = true;
                comment.replies[index].likeTotal++;
              }
            }
          });
        }
        break;
      case HomeActions.Types.DISLIKE_COMMENT.succeeded:
        index = draft.comments.findIndex(comment => comment._id === payload);

        if (index >= 0) {
          if (draft.comments[index].isLiked) {
            draft.comments[index].isLiked = false;
            draft.comments[index].likeTotal--;
          }
        } else {
          draft.comments.forEach(comment => {
            index = comment.replies.findIndex(reply => reply._id === payload);
            if (index >= 0) {
              if (comment.replies[index].isLiked) {
                comment.replies[index].isLiked = false;
                comment.replies[index].likeTotal--;
              }
            }
          });
        }
        break;
      case HomeActions.Types.SET_CURRENT_POST_ID.begin:
        draft.currentPostId = payload;
        break;
      case HomeActions.Types.GET_REPLIES_COMMENT.succeeded:
        index = draft.comments.findIndex(
          comment => comment._id === payload.commentId,
        );
        if (index >= 0) {
          draft.comments[index].replies = payload.replies;
        }
        break;
      case HomeActions.Types.APPEND_REPLIES_COMMENT.succeeded:
        index = draft.comments.findIndex(
          comment => comment._id === payload.commentId,
        );
        if (index >= 0) {
          draft.comments[index].replies = [
            ...draft.comments[index].replies,
            ...payload.replies,
          ];
        }
        break;
      default:
        break;
    }
  });

export default homeReducer;
