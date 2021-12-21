import {call, put, takeLatest} from 'redux-saga/effects';

import * as HomeAction from '../actions';
import {
  commentPostService,
  dislikeCommentService,
  dislikePostService,
  getCommentsService,
  getPostsService,
  getRepliesCommentService,
  likeCommentService,
  likePostService,
  viewPostService,
} from '../services';

interface Data {
  [key: string]: any;
}

function* getPostsSaga() {
  try {
    const response: Data = yield call(getPostsService);

    yield put({
      type: HomeAction.Types.GET_POSTS.succeeded,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.GET_POSTS.failed,
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
      type: HomeAction.Types.GET_REPLIES_COMMENT.succeeded,
      payload: {
        commentId: payload,
        replies: response.data.comments,
      },
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.GET_REPLIES_COMMENT.failed,
      payload: error,
    });
  }
}

function* appendRepliesCommentSaga({payload}: any) {
  try {
    const response: Data = yield call(getRepliesCommentService, payload);

    yield put({
      type: HomeAction.Types.APPEND_REPLIES_COMMENT.succeeded,
      payload: {
        commentId: payload.commentId,
        replies: response.data.comments,
      },
    });
  } catch (error) {
    yield put({
      type: HomeAction.Types.APPEND_REPLIES_COMMENT.failed,
      payload: error,
    });
  }
}

function* commentPostSaga({payload: {postId, content, author}}: any) {
  try {
    console.log(postId);
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

export default function* homeWatcher() {
  yield takeLatest(HomeAction.Types.GET_POSTS.begin, getPostsSaga);
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
}
