import {call, put, takeLatest} from 'redux-saga/effects';

import * as HomeAction from '../actions';
import {
  appendPostsService,
  commentPostService,
  deleteCommentService,
  deletePostService,
  dislikeCommentService,
  dislikePostService,
  getCommentsService,
  getPostsService,
  getRepliesCommentService,
  likeCommentService,
  likePostService,
  replyCommentService,
  updateCommentService,
  viewPostService,
} from '../services';

interface Data {
  [key: string]: any;
}

function* getPostsSaga({payload}: any) {
  try {
    yield put({
      type: HomeAction.Types.GET_POSTS.succeeded,
      payload: [],
    });

    yield put({
      type: HomeAction.Types.LOADING.begin,
    });

    const response: Data = yield call(getPostsService, payload);

    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });

    yield put({
      type: HomeAction.Types.GET_POSTS.succeeded,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });

    yield put({
      type: HomeAction.Types.GET_POSTS.failed,
      payload: error,
    });
  }
}

function* appendPostsSaga({payload}: any) {
  try {
    yield put({
      type: HomeAction.Types.LOADING.begin,
    });

    const response: Data = yield call(appendPostsService, payload);

    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });

    yield put({
      type: HomeAction.Types.APPEND_POSTS.succeeded,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LOADING.succeeded,
    });

    yield put({
      type: HomeAction.Types.APPEND_POSTS.failed,
      payload: error,
    });
  }
}

function* likePostSaga({payload}: any) {
  try {
    yield call(likePostService, payload);

    yield put({
      type: HomeAction.Types.LIKE_POST.succeeded,
      payload,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LIKE_POST.failed,
      payload: error,
    });
  }
}

function* dislikePostSaga({payload}: any) {
  try {
    yield call(dislikePostService, payload);

    yield put({
      type: HomeAction.Types.DISLIKE_POST.succeeded,
      payload,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.DISLIKE_POST.failed,
      payload: error,
    });
  }
}

function* viewPostSaga({payload}: any) {
  try {
    yield call(viewPostService, payload);

    yield put({
      type: HomeAction.Types.VIEW_POST.succeeded,
      payload,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.VIEW_POST.failed,
      payload: error,
    });
  }
}

function* getCommentsSaga({payload}: any) {
  try {
    yield put({
      type: HomeAction.Types.GET_COMMENTS.succeeded,
      payload: [],
    });
    yield put({
      type: HomeAction.Types.SET_CURRENT_POST_ID.begin,
      payload: payload,
    });
    yield put({
      type: HomeAction.Types.LOADING_COMMENTS.begin,
    });
    const response: Data = yield call(getCommentsService, {
      postId: payload,
      page: 0,
    });

    yield put({
      type: HomeAction.Types.GET_COMMENTS.succeeded,
      payload: response.data,
    });
    yield put({
      type: HomeAction.Types.LOADING_COMMENTS.succeeded,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LOADING_COMMENTS.succeeded,
    });
    yield put({
      type: HomeAction.Types.GET_COMMENTS.failed,
      payload: error,
    });
  }
}

function* appendCommentsSaga({payload}: any) {
  try {
    yield put({
      type: HomeAction.Types.LOADING_COMMENTS.begin,
    });
    const response: Data = yield call(getCommentsService, payload);

    yield put({
      type: HomeAction.Types.APPEND_COMMENTS.succeeded,
      payload: response.data,
    });
    yield put({
      type: HomeAction.Types.LOADING_COMMENTS.succeeded,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LOADING_COMMENTS.succeeded,
    });
    yield put({
      type: HomeAction.Types.APPEND_COMMENTS.failed,
      payload: error,
    });
  }
}

function* likeCommentSaga({payload}: any) {
  try {
    yield call(likeCommentService, payload);

    yield put({
      type: HomeAction.Types.LIKE_COMMENT.succeeded,
      payload,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LIKE_COMMENT.failed,
      payload: error,
    });
  }
}

function* dislikeCommentSaga({payload}: any) {
  try {
    yield call(dislikeCommentService, payload);

    yield put({
      type: HomeAction.Types.DISLIKE_COMMENT.succeeded,
      payload,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.DISLIKE_COMMENT.failed,
      payload: error,
    });
  }
}

function* getRepliesCommentSaga({payload}: any) {
  try {
    yield put({
      type: HomeAction.Types.LOADING_REPLIES_COMMENT.begin,
      payload: payload,
    });

    yield put({
      type: HomeAction.Types.GET_REPLIES_COMMENT.succeeded,
      payload: {
        commentId: payload,
        replies: [],
      },
    });
    const response: Data = yield call(getRepliesCommentService, {
      commentId: payload,
      page: 0,
    });

    yield put({
      type: HomeAction.Types.LOADING_REPLIES_COMMENT.succeeded,
      payload: payload,
    });

    yield put({
      type: HomeAction.Types.GET_REPLIES_COMMENT.succeeded,
      payload: {
        commentId: payload,
        replies: response.data.comments,
      },
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LOADING_REPLIES_COMMENT.succeeded,
      payload: payload,
    });
    yield put({
      type: HomeAction.Types.GET_REPLIES_COMMENT.failed,
      payload: error,
    });
  }
}

function* appendRepliesCommentSaga({payload}: any) {
  try {
    yield put({
      type: HomeAction.Types.LOADING_REPLIES_COMMENT.begin,
      payload: payload,
    });

    const response: Data = yield call(getRepliesCommentService, payload);

    yield put({
      type: HomeAction.Types.LOADING_REPLIES_COMMENT.succeeded,
      payload: payload,
    });

    yield put({
      type: HomeAction.Types.APPEND_REPLIES_COMMENT.succeeded,
      payload: {
        commentId: payload.commentId,
        replies: response.data,
      },
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.LOADING_REPLIES_COMMENT.succeeded,
      payload: payload,
    });
    yield put({
      type: HomeAction.Types.APPEND_REPLIES_COMMENT.failed,
      payload: error,
    });
  }
}

function* commentPostSaga({payload: {postId, content, author}}: any) {
  try {
    const response: Data = yield call(commentPostService, postId, content);

    yield put({
      type: HomeAction.Types.COMMENT_POST.succeeded,
      payload: {postId, content, commentId: response.data._id, author},
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.COMMENT_POST.failed,
      payload: error,
    });
  }
}

function* replyCommentSaga({payload: {commentId, content, author}}: any) {
  try {
    const response: Data = yield call(replyCommentService, commentId, content);

    yield put({
      type: HomeAction.Types.REPLY_COMMENT.succeeded,
      payload: {commentId, content, replyId: response.data._id, author},
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.REPLY_COMMENT.failed,
      payload: error,
    });
  }
}

function* deletePostSaga({payload}: any) {
  try {
    yield call(deletePostService, payload);
  } catch (error) {
    yield put({
      type: HomeAction.Types.DELETE_POST.failed,
      payload: error,
    });
  }
}

function* updateCommentSaga({payload}: any) {
  try {
    yield call(updateCommentService, {
      _id: payload._id,
      content: payload.content,
    });

    yield put({
      type: HomeAction.Types.UPDATE_COMMENT.succeeded,
      payload,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.UPDATE_COMMENT.failed,
      payload: error,
    });
  }
}

function* deleteCommentSaga({payload}: any) {
  try {
    yield call(deleteCommentService, payload);
    yield put({
      type: HomeAction.Types.DELETE_COMMENT.succeeded,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.DELETE_COMMENT.failed,
      payload: error,
    });
  }
}

export default function* homeWatcher() {
  yield takeLatest(HomeAction.Types.GET_POSTS.begin, getPostsSaga);
  yield takeLatest(HomeAction.Types.APPEND_POSTS.begin, appendPostsSaga);
  yield takeLatest(HomeAction.Types.LIKE_POST.begin, likePostSaga);
  yield takeLatest(HomeAction.Types.DISLIKE_POST.begin, dislikePostSaga);
  yield takeLatest(HomeAction.Types.VIEW_POST.begin, viewPostSaga);
  yield takeLatest(HomeAction.Types.GET_COMMENTS.begin, getCommentsSaga);
  yield takeLatest(HomeAction.Types.APPEND_COMMENTS.begin, appendCommentsSaga);
  yield takeLatest(HomeAction.Types.LIKE_COMMENT.begin, likeCommentSaga);
  yield takeLatest(HomeAction.Types.DISLIKE_COMMENT.begin, dislikeCommentSaga);
  yield takeLatest(
    HomeAction.Types.GET_REPLIES_COMMENT.begin,
    getRepliesCommentSaga,
  );
  yield takeLatest(
    HomeAction.Types.APPEND_REPLIES_COMMENT.begin,
    appendRepliesCommentSaga,
  );
  yield takeLatest(HomeAction.Types.COMMENT_POST.begin, commentPostSaga);
  yield takeLatest(HomeAction.Types.REPLY_COMMENT.begin, replyCommentSaga);
  yield takeLatest(HomeAction.Types.DELETE_POST.begin, deletePostSaga);
  yield takeLatest(HomeAction.Types.UPDATE_COMMENT.begin, updateCommentSaga);
  yield takeLatest(HomeAction.Types.DELETE_COMMENT.begin, deleteCommentSaga);
}
