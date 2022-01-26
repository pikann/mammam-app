import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';
import {Menu, MenuItem} from 'react-native-material-menu';

import Text from '../Text';
import View, {DoublePressView, Row} from '../View';
import {styles} from './styles';
import timeAgo from '../../utils/timeAgo';
import {IconButton} from '../Button';
import Colors from '../../constants/Colors';
import CommentModal from '../CommentModal';
import {IAuthor, IComment} from '../../interfaces/comment';
import {IPost} from '../../interfaces/post';
import Screens from '../../constants/Screens';

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
  currentIndex: number;
  isFull: boolean;
  scrollRef: ((ref: ScrollView | null) => void) | undefined;
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
  setCurrentIndex: (currentIndex: number) => void;
  setUserInfo: (payload: any) => void;
  setUpdateVideo: (payload: any) => void;
  deletePost: (id: string) => void;
  updateComment: (payload: any) => void;
  deleteComment: (payload: any) => void;
}

export default function PostsComponent({
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
  currentIndex,
  isFull,
  scrollRef,
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
  setCurrentIndex,
  setUserInfo,
  setUpdateVideo,
  deletePost,
  updateComment,
  deleteComment,
}: IProp) {
  const [commandModelShow, setCommandModelShow] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const onDelete = (id: string) => {
    Alert.alert('Delete post', 'Do you want to delete this post?', [
      {
        text: 'Yes',
        onPress: () => {
          deletePost(id);
          navigation.navigate(Screens.Home);
        },
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
  };

  useEffect(() => {
    if (posts.length > 0) {
      viewPost(posts[currentIndex]._id);
    }
  }, [currentIndex, posts, viewPost]);

  return (
    <View style={styles.background}>
      {posts.length > 0 ? (
        <ScrollView
          ref={ref => scrollRef && scrollRef(ref)}
          snapToOffsets={[...Array(posts.length)].map(
            (x, i) => i * Math.floor(isFull ? height : height - 55),
          )}
          disableIntervalMomentum={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={event => {
            setCurrentIndex(
              Math.round(
                event.nativeEvent.contentOffset.y /
                  Math.floor(isFull ? height : height - 55),
              ),
            );
          }}
          style={styles.flex}>
          {posts.map((post, index) => {
            return index - currentIndex < 3 && index - currentIndex > -2 ? (
              <View
                style={isFull ? styles.videoFrameFull : styles.videoFrame}
                key={index}>
                {post.loading && index === currentIndex && (
                  <FastImage
                    source={require('../../assets/images/white-loading.gif')}
                    style={styles.loading}
                  />
                )}
                <Video
                  source={{
                    uri: post.url,
                  }}
                  style={isFull ? styles.videoFull : styles.video}
                  resizeMode={'contain'}
                  repeat={true}
                  paused={index !== currentIndex}
                  onLoadStart={() => {
                    loadingVideo(post._id);
                  }}
                  onReadyForDisplay={() => {
                    displayVideo(post._id);
                  }}
                />
                <DoublePressView
                  onDoublePress={() => {
                    likePost(post._id);
                  }}>
                  <Row
                    style={
                      isFull ? styles.absoluteViewFull : styles.absoluteView
                    }>
                    <View style={styles.descriptionView}>
                      <Text style={styles.views}>
                        {timeAgo(post.createdAt)}
                      </Text>
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
                      <View style={styles.actionButton}>
                        <IconButton
                          style={styles.actionButton}
                          name={'ellipsis-vertical'}
                          color={Colors.background}
                          size={30}
                          onPress={() => setPopupVisible(!popupVisible)}
                        />
                        {index === currentIndex ? (
                          userId === post.author._id ? (
                            <Menu
                              visible={popupVisible}
                              onRequestClose={() => setPopupVisible(false)}>
                              <MenuItem
                                onPress={() => {
                                  setUpdateVideo({
                                    videoURI: post.url,
                                    updateId: post._id,
                                    defaultDescription: post.description,
                                  });
                                  navigation.navigate(Screens.Post);
                                }}>
                                <Text style={styles.menuItem}>Modify</Text>
                              </MenuItem>
                              <MenuItem onPress={() => onDelete(post._id)}>
                                <Text style={styles.menuItem}>Delete</Text>
                              </MenuItem>
                            </Menu>
                          ) : (
                            <Menu
                              visible={popupVisible}
                              onRequestClose={() => setPopupVisible(false)}>
                              <MenuItem onPress={() => console.log('Report')}>
                                <Text style={styles.menuItem}>Report</Text>
                              </MenuItem>
                            </Menu>
                          )
                        ) : (
                          <View />
                        )}
                      </View>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setUserInfo({
                            userId: post?.author?._id,
                            username: post?.author?.username,
                            avatar: post?.author?.avatar,
                            bio: post?.author?.bio,
                          });
                          navigation.navigate(Screens.User);
                        }}>
                        <Image
                          style={styles.avatarAuthor}
                          source={{
                            uri: post?.author?.avatar,
                          }}
                          defaultSource={require('../../assets/images/avatar-default.png')}
                        />
                      </TouchableWithoutFeedback>
                    </View>
                  </Row>
                </DoublePressView>
              </View>
            ) : (
              <View
                style={isFull ? styles.videoFrameFull : styles.videoFrame}
                key={index}
              />
            );
          })}
        </ScrollView>
      ) : isLoading ? (
        <FastImage
          source={require('../../assets/images/white-loading.gif')}
          style={styles.loading}
        />
      ) : (
        <View style={styles.noPostView}>
          <Icon
            style={styles.center}
            name={'newspaper-outline'}
            color={Colors.text}
            size={200}
          />
          <Text style={styles.noPostText}>No video available</Text>
        </View>
      )}

      <CommentModal
        commandModelShow={commandModelShow}
        setCommandModelShow={setCommandModelShow}
        navigation={navigation}
        comments={comments}
        totalComment={totalComment}
        totalPageComment={totalPageComment}
        pageComment={pageComment}
        userId={userId}
        username={username}
        avatar={avatar}
        bio={bio}
        appendComments={appendComments}
        loadingComments={loadingComments}
        likeComment={likeComment}
        dislikeComment={dislikeComment}
        currentPostId={currentPostId}
        getRepliesComment={getRepliesComment}
        appendRepliesComment={appendRepliesComment}
        commentPost={commentPost}
        replyComment={replyComment}
        updateComment={updateComment}
        deleteComment={deleteComment}
      />
    </View>
  );
}
