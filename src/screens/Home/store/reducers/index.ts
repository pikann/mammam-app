import produce from 'immer';

import * as HomeActions from '../actions';
import {IComment} from '../interfaces/comment';
import {IPost} from '../interfaces/post';

export const initialState = {
  posts: [] as IPost[],
  comments: [] as IComment[],
  totalComment: 0,
  totalPageComment: 0,
  pageComment: 0,
  loadingComments: false,
  currentPostId: '',
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
      case HomeActions.Types.GET_COMMENTS.succeeded:
        draft.comments = payload.comments?.map((comment: IComment) => {
          return {
            ...comment,
            replies: [],
            loadingReplies: false,
          };
        });
        draft.totalComment = payload.total;
        draft.totalPageComment = payload.totalPage;
        draft.pageComment = payload.page;
        break;
      case HomeActions.Types.APPEND_COMMENTS.succeeded:
        draft.comments = [
          ...draft.comments,
          ...payload.comments
            ?.filter(
              (comment: IComment) =>
                !draft.comments
                  .map(({_id}: IComment) => _id)
                  .includes(comment._id),
            )
            .map((comment: IComment) => {
              return {
                ...comment,
                replies: [],
                loadingReplies: false,
              };
            }),
        ];
        draft.totalComment = payload.total;
        draft.totalPageComment = payload.totalPage;
        draft.pageComment = payload.page;
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
            ...payload.replies.comments.filter(
              (reply: IComment) =>
                !draft.comments[index].replies
                  .map(({_id}: IComment) => _id)
                  .includes(reply._id),
            ),
          ];
          draft.comments[index].pageReply = payload.page;
        }
        break;
      case HomeActions.Types.COMMENT_POST.succeeded:
        index = draft.posts.findIndex(post => post._id === payload.postId);

        if (index >= 0) {
          draft.posts[index].commentTotal++;
        }
        draft.comments = [
          {
            _id: payload.commentId,
            createdAt: Date.now(),
            author: payload.author,
            content: payload.content,
            likeTotal: 0,
            replyTotal: 0,
            isLiked: false,
            replies: [],
            loadingReplies: false,
            pageReply: -1,
          },
          ...draft.comments,
        ];
        break;
      case HomeActions.Types.LOADING_REPLIES_COMMENT.begin:
        index = draft.comments.findIndex(comment => comment._id === payload);
        if (index >= 0) {
          draft.comments[index].loadingReplies = true;
        }
        break;
      case HomeActions.Types.LOADING_REPLIES_COMMENT.succeeded:
        index = draft.comments.findIndex(comment => comment._id === payload);
        if (index >= 0) {
          draft.comments[index].loadingReplies = false;
        }
        break;
      case HomeActions.Types.REPLY_COMMENT.succeeded:
        index = draft.comments.findIndex(
          comment => comment._id === payload.commentId,
        );

        if (index >= 0) {
          draft.comments[index].replyTotal++;
          draft.comments[index].replies = [
            {
              _id: payload.replyId,
              createdAt: Date.now(),
              author: payload.author,
              content: payload.content,
              likeTotal: 0,
              replyTotal: 0,
              isLiked: false,
              replies: [],
              loadingReplies: false,
              pageReply: -1,
            },
            ...draft.comments[index].replies,
          ];
        }
        break;
      default:
        break;
    }
  });

export default homeReducer;
