import React, {useEffect, useState} from 'react';
import {Dimensions, Image} from 'react-native';
import Video from 'react-native-video';
import {connect} from 'react-redux';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';
import {createStructuredSelector} from 'reselect';

import {IconButton, TextButton} from '../../components/Button';
import * as HomeActions from './store/actions';
import Text from '../../components/Text';
import View, {DoublePressView, Row} from '../../components/View';
import Colors from '../../constants/Colors';
import {styles} from './styles';
import {
  makeSelectComments,
  makeSelectCurrentPostId,
  makeSelectLoadingComments,
  makeSelectPosts,
} from './store/selectors';
import {ScrollView} from 'react-native-gesture-handler';
import {IPost} from './store/interfaces/post';
import timeAgo from '../../utils/timeAgo';
import CommentModal from './components/CommentModal';
import {IComment} from './store/interfaces/comment';

const {height} = Dimensions.get('window');

interface IProp {
  navigation: StackNavigationHelpers;
  posts: IPost[];
  comments: IComment[];
  loadingComments: boolean;
  currentPostId: string;
  getPosts: () => void;
  likePost: (postId: string) => void;
  dislikePost: (postId: string) => void;
  viewPost: (postId: string) => void;
  getComments: (postId: string) => void;
  appendComments: (postId: string, page: number) => void;
  likeComment: (commentId: string) => void;
  dislikeComment: (commentId: string) => void;
  getRepliesComment: (commentId: string) => void;
  appendRepliesComment: (commentId: string, page: number) => void;
}

const HomeScreen = ({
  navigation,
  posts,
  comments,
  loadingComments,
  currentPostId,
  getPosts,
  likePost,
  dislikePost,
  viewPost,
  getComments,
  appendComments,
  likeComment,
  dislikeComment,
  getRepliesComment,
  appendRepliesComment,
}: IProp) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [commandModelShow, setCommandModelShow] = useState(false);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    if (posts.length > 0) {
      viewPost(posts[currentIndex]._id);
    }
  }, [currentIndex, posts, viewPost]);

  return (
    <View style={styles.background}>
      <ScrollView
        snapToInterval={height - 55}
        disableIntervalMomentum={true}
        onMomentumScrollEnd={event => {
          setCurrentIndex(
            Math.round(event.nativeEvent.contentOffset.y / (height - 55)),
          );
        }}
        style={styles.flex}>
        {posts.map((post, index) => {
          return index - currentIndex < 3 && index - currentIndex > -2 ? (
            <View style={styles.videoFrame} key={index}>
              <Video
                source={{
                  uri: post.url,
                }}
                style={styles.video}
                resizeMode={'contain'}
                repeat={true}
                paused={index !== currentIndex}
              />
              <DoublePressView
                onDoublePress={() => {
                  likePost(post._id);
                }}>
                <Row style={styles.absoluteView}>
                  <View style={styles.descriptionView}>
                    <Text style={styles.views}>{timeAgo(post.createdAt)}</Text>
                    <Text style={styles.description}>{post.description}</Text>
                    <Text
                      style={styles.views}>{`${post.viewTotal} views`}</Text>
                  </View>
                  <View style={styles.actionView}>
                    <IconButton
                      style={styles.likeActionButton}
                      name={'heart'}
                      color={
                        post.isLiked ? Colors.secondary : Colors.background
                      }
                      size={45}
                      onPress={() => {
                        if (post.isLiked) {
                          dislikePost(post._id);
                        } else {
                          likePost(post._id);
                        }
                      }}
                    />
                    <Text style={styles.actionCount}>
                      {'' + post.likeTotal}
                    </Text>
                    <IconButton
                      style={styles.actionButton}
                      name={'ios-chatbubble-ellipses-sharp'}
                      color={Colors.background}
                      size={30}
                      onPress={() => {
                        getComments(post._id);
                        setCommandModelShow(true);
                      }}
                    />
                    <Text style={styles.actionCount}>
                      {'' + post.commentTotal}
                    </Text>
                    <IconButton
                      style={styles.actionButton}
                      name={'share-social'}
                      color={Colors.background}
                      size={30}
                    />
                    <Text style={styles.actionCount}>
                      {'' + post.shareTotal}
                    </Text>
                    <Image
                      style={styles.avatarAuthor}
                      source={{
                        uri: post.author.avatar,
                      }}
                    />
                  </View>
                </Row>
              </DoublePressView>
            </View>
          ) : (
            <View style={styles.videoFrame} key={index} />
          );
        })}
      </ScrollView>

      <Row style={styles.tagView}>
        <TextButton textStyle={{...styles.tagTitle, ...styles.choicedTag}}>
          For you
        </TextButton>
        <TextButton textStyle={{...styles.tagTitle}}>Popular</TextButton>
        <TextButton textStyle={{...styles.tagTitle}}>Following</TextButton>
        <IconButton
          style={styles.searchButton}
          name={'search'}
          color={Colors.background}
          size={15}
        />
      </Row>
      <CommentModal
        commandModelShow={commandModelShow}
        setCommandModelShow={setCommandModelShow}
        navigation={navigation}
        comments={comments}
        appendComments={appendComments}
        loadingComments={loadingComments}
        likeComment={likeComment}
        dislikeComment={dislikeComment}
        currentPostId={currentPostId}
        getRepliesComment={getRepliesComment}
        appendRepliesComment={appendRepliesComment}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  posts: makeSelectPosts(),
  comments: makeSelectComments(),
  loadingComments: makeSelectLoadingComments(),
  currentPostId: makeSelectCurrentPostId(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getPosts: () => dispatch(HomeActions.getPosts.request()),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
