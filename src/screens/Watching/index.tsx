import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import View from '../../components/View';
import {IAuthor, IComment} from '../../interfaces/comment';
import {IPost} from '../../interfaces/post';
import {
  makeSelectAvatar,
  makeSelectBio,
  makeSelectId,
  makeSelectUsername,
} from '../../store/selectors';
import {
  makeSelectComments,
  makeSelectCurrentPostId,
  makeSelectLoading,
  makeSelectLoadingComments,
  makeSelectPageComment,
  makeSelectPosts,
  makeSelectTotalComment,
  makeSelectTotalPageComment,
} from '../Home/store/selectors';
import {styles} from './styles';
import * as WatchingActions from './store/actions';
import * as HomeActions from '../Home/store/actions';
import * as UserActions from '../User/store/actions';
import * as SearchActions from '../Search/store/actions';
import * as RestaurantActions from '../Restaurant/store/actions';
import * as PostActions from '../Post/store/actions';
import {
  makeSelectGettingPayload,
  makeSelectGettingType,
  makeSelectIndexBegin,
  makeSelectPage,
} from './store/selectors';
import {GettingType} from './store/enums/getting-type';
import {BackButton} from '../../components/Button';
import Colors from '../../constants/Colors';
import PostsComponent from '../../components/Posts';

const {height} = Dimensions.get('window');

interface IProp {
  navigation: StackNavigationHelpers;
  posts: IPost[];
  comments: IComment[];
  totalComment: number;
  totalPageComment: number;
  pageComment: number;
  loadingComments: boolean;
  currentPostId: string;
  userId: string;
  username: string;
  avatar: string;
  bio: string;
  isLoading: boolean;
  gettingType: string;
  gettingPayload: any;
  indexBegin: number;
  page: number;
  likePost: (postId: string) => void;
  dislikePost: (postId: string) => void;
  viewPost: (postId: string) => void;
  getComments: (postId: string) => void;
  appendComments: (postId: string, page: number) => void;
  likeComment: (commentId: string) => void;
  dislikeComment: (commentId: string) => void;
  getRepliesComment: (commentId: string) => void;
  appendRepliesComment: (commentId: string, page: number) => void;
  commentPost: (postId: string, content: string, author: IAuthor) => void;
  replyComment: (commentId: string, content: string, author: IAuthor) => void;
  loadingVideo: (postId: string) => void;
  displayVideo: (postId: string) => void;
  appendPostOfUser: (payload: any) => void;
  appendSearchPosts: (payload: any) => void;
  appendRestaurantPosts: (payload: any) => void;
  setUserInfo: (payload: any) => void;
  setPage: (page: number) => void;
  setUpdateVideo: (payload: any) => void;
  deletePost: (id: string) => void;
  updateComment: (payload: any) => void;
  deleteComment: (payload: any) => void;
  setRestaurantWatchInfo: (payload: any) => void;
}

const WatchingScreen = ({
  navigation,
  posts,
  comments,
  totalComment,
  totalPageComment,
  pageComment,
  loadingComments,
  currentPostId,
  userId,
  username,
  avatar,
  bio,
  isLoading,
  gettingType,
  gettingPayload,
  indexBegin,
  page,
  likePost,
  dislikePost,
  viewPost,
  getComments,
  appendComments,
  likeComment,
  dislikeComment,
  getRepliesComment,
  appendRepliesComment,
  commentPost,
  replyComment,
  loadingVideo,
  displayVideo,
  appendPostOfUser,
  appendSearchPosts,
  appendRestaurantPosts,
  setUserInfo,
  setPage,
  setUpdateVideo,
  deletePost,
  updateComment,
  deleteComment,
  setRestaurantWatchInfo,
}: IProp) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(indexBegin);
  }, [setCurrentIndex, indexBegin]);

  useEffect(() => {
    if (currentIndex >= posts.length - 2 && !isLoading && posts.length > 0) {
      if (gettingType === GettingType.User) {
        appendPostOfUser({
          ...gettingPayload,
          page,
        });
        setPage(page + 1);
      } else if (gettingType === GettingType.Search) {
        appendSearchPosts({
          ...gettingPayload,
          page,
        });
        setPage(page + 1);
      } else if (gettingType === GettingType.Restaurant) {
        appendRestaurantPosts({
          ...gettingPayload,
          page,
        });
        setPage(page + 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gettingType, gettingPayload, currentIndex, viewPost]);

  return (
    <View style={styles.background}>
      <PostsComponent
        navigation={navigation}
        posts={posts}
        comments={comments}
        totalComment={totalComment}
        totalPageComment={totalPageComment}
        pageComment={pageComment}
        loadingComments={loadingComments}
        currentPostId={currentPostId}
        userId={userId}
        username={username}
        avatar={avatar}
        bio={bio}
        isLoading={isLoading}
        currentIndex={currentIndex}
        isFull={true}
        scrollRef={ref => {
          ref?.scrollTo({y: indexBegin * height, animated: false});
        }}
        likePost={likePost}
        dislikePost={dislikePost}
        viewPost={viewPost}
        getComments={getComments}
        appendComments={appendComments}
        likeComment={likeComment}
        dislikeComment={dislikeComment}
        getRepliesComment={getRepliesComment}
        appendRepliesComment={appendRepliesComment}
        commentPost={commentPost}
        replyComment={replyComment}
        loadingVideo={loadingVideo}
        displayVideo={displayVideo}
        setCurrentIndex={setCurrentIndex}
        setUserInfo={setUserInfo}
        setUpdateVideo={setUpdateVideo}
        deletePost={deletePost}
        updateComment={updateComment}
        deleteComment={deleteComment}
        setRestaurantInfo={setRestaurantWatchInfo}
      />
      <BackButton
        style={styles.backButton}
        colorIcon={Colors.background}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  posts: makeSelectPosts(),
  comments: makeSelectComments(),
  totalComment: makeSelectTotalComment(),
  totalPageComment: makeSelectTotalPageComment(),
  pageComment: makeSelectPageComment(),
  loadingComments: makeSelectLoadingComments(),
  currentPostId: makeSelectCurrentPostId(),
  userId: makeSelectId(),
  username: makeSelectUsername(),
  avatar: makeSelectAvatar(),
  bio: makeSelectBio(),
  isLoading: makeSelectLoading(),
  gettingType: makeSelectGettingType(),
  gettingPayload: makeSelectGettingPayload(),
  indexBegin: makeSelectIndexBegin(),
  page: makeSelectPage(),
});

const mapDispatchToProps = (dispatch: any) => ({
  likePost: (postId: string) => dispatch(HomeActions.likePost.request(postId)),
  dislikePost: (postId: string) =>
    dispatch(HomeActions.dislikePost.request(postId)),
  viewPost: (postId: string) => dispatch(HomeActions.viewPost.request(postId)),
  getComments: (postId: string) =>
    dispatch(HomeActions.getComments.request(postId)),
  appendComments: (postId: string, page: number) =>
    dispatch(HomeActions.appendComments.request({postId, page})),
  likeComment: (commentId: string) =>
    dispatch(HomeActions.likeComment.request(commentId)),
  dislikeComment: (commentId: string) =>
    dispatch(HomeActions.dislikeComment.request(commentId)),
  getRepliesComment: (commentId: string) =>
    dispatch(HomeActions.getRepliesComment.request(commentId)),
  appendRepliesComment: (commentId: string, page: number) =>
    dispatch(HomeActions.appendRepliesComment.request({commentId, page})),
  commentPost: (postId: string, content: string, author: IAuthor) =>
    dispatch(HomeActions.commentPost.request({postId, content, author})),
  replyComment: (commentId: string, content: string, author: IAuthor) =>
    dispatch(HomeActions.replyComment.request({commentId, content, author})),
  loadingVideo: (postId: string) =>
    dispatch(HomeActions.loadingVideo.request(postId)),
  displayVideo: (postId: string) =>
    dispatch(HomeActions.displayVideo.request(postId)),
  appendPostOfUser: (payload: any) =>
    dispatch(UserActions.appendUserPosts.request(payload)),
  setUserInfo: (payload: any) =>
    dispatch(UserActions.setUserInfo.request(payload)),
  setPage: (page: number) => dispatch(WatchingActions.setPage.request(page)),
  appendSearchPosts: (payload: any) =>
    dispatch(SearchActions.appendSearchPosts.request(payload)),
  appendRestaurantPosts: (payload: any) =>
    dispatch(RestaurantActions.appendRestaurantPosts.request(payload)),
  setUpdateVideo: (payload: any) =>
    dispatch(PostActions.setUpdateVideo.request(payload)),
  deletePost: (id: string) => dispatch(HomeActions.deletePost.request(id)),
  updateComment: (payload: any) =>
    dispatch(HomeActions.updateComment.request(payload)),
  deleteComment: (payload: any) =>
    dispatch(HomeActions.deleteComment.request(payload)),
  setRestaurantWatchInfo: (payload: any) =>
    dispatch(RestaurantActions.setRestaurantInfo.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchingScreen);
