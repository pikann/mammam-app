import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';
import {createStructuredSelector} from 'reselect';
import {useIsFocused} from '@react-navigation/native';

import {IconButton, TextButton} from '../../components/Button';
import * as HomeActions from './store/actions';
import * as UserActions from '../User/store/actions';
import * as PostActions from '../Post/store/actions';
import View, {Row} from '../../components/View';
import Colors from '../../constants/Colors';
import {styles} from './styles';
import {
  makeSelectComments,
  makeSelectCurrentPostId,
  makeSelectGetPostsTag,
  makeSelectLoading,
  makeSelectLoadingComments,
  makeSelectPageComment,
  makeSelectPosts,
  makeSelectTotalComment,
  makeSelectTotalPageComment,
} from './store/selectors';
import {IPost} from '../../interfaces/post';
import {IAuthor, IComment} from '../../interfaces/comment';
import {
  makeSelectAvatar,
  makeSelectBio,
  makeSelectId,
  makeSelectUsername,
} from '../../store/selectors';
import {GetPostsTag} from './store/enums/get-posts-tag';
import Screens from '../../constants/Screens';
import PostsComponent from '../../components/Posts';

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
  getPostsTag: string;
  getPosts: (tag: string) => void;
  appendPosts: (tag: string, availables: string) => void;
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
  setGetPostsTag: (tag: string) => void;
  setUserInfo: (payload: any) => void;
  setUpdateVideo: (payload: any) => void;
  deletePost: (id: string) => void;
}

const HomeScreen = ({
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
  getPostsTag,
  getPosts,
  appendPosts,
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
  setGetPostsTag,
  setUserInfo,
  setUpdateVideo,
  deletePost,
}: IProp) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!username || username === '') {
      navigation.navigate(Screens.UpdateProfile);
    }
  }, [navigation, username]);

  useEffect(() => {
    setCurrentIndex(0);
    getPosts(getPostsTag);
  }, [getPosts, getPostsTag, isFocused]);

  useEffect(() => {
    if (currentIndex >= posts.length - 2 && !isLoading && posts.length > 0) {
      appendPosts(
        getPostsTag,
        posts
          .slice(currentIndex, posts.length)
          .map(post => post._id)
          .join(','),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appendPosts, currentIndex, viewPost]);

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
        isFull={false}
        scrollRef={undefined}
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
      />
      <Row style={styles.tagView}>
        <TextButton
          textStyle={
            getPostsTag === GetPostsTag.ForYou
              ? {...styles.tagTitle, ...styles.choicedTag}
              : styles.tagTitle
          }
          onPress={() => {
            setGetPostsTag(GetPostsTag.ForYou);
          }}>
          For you
        </TextButton>
        <TextButton
          textStyle={
            getPostsTag === GetPostsTag.Popular
              ? {...styles.tagTitle, ...styles.choicedTag}
              : styles.tagTitle
          }
          onPress={() => {
            setGetPostsTag(GetPostsTag.Popular);
          }}>
          Popular
        </TextButton>
        <TextButton
          textStyle={
            getPostsTag === GetPostsTag.Following
              ? {...styles.tagTitle, ...styles.choicedTag}
              : styles.tagTitle
          }
          onPress={() => {
            setGetPostsTag(GetPostsTag.Following);
          }}>
          Following
        </TextButton>
        <IconButton
          style={styles.searchButton}
          name={'search'}
          color={Colors.background}
          size={15}
          onPress={() => navigation.navigate(Screens.Search)}
        />
      </Row>
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
  getPostsTag: makeSelectGetPostsTag(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getPosts: (tag: string) => dispatch(HomeActions.getPosts.request(tag)),
  appendPosts: (tag: string, availables: string) =>
    dispatch(HomeActions.appendPosts.request({tag, availables})),
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
  setGetPostsTag: (tag: string) =>
    dispatch(HomeActions.setGetPostsTag.request(tag)),
  setUserInfo: (payload: any) =>
    dispatch(UserActions.setUserInfo.request(payload)),
  setUpdateVideo: (payload: any) =>
    dispatch(PostActions.setUpdateVideo.request(payload)),
  deletePost: (id: string) => dispatch(HomeActions.deletePost.request(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
