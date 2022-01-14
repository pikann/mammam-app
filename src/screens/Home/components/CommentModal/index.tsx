import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  ScrollView,
  TouchableOpacity,
  KeyboardEvent,
  Animated,
  ToastAndroid,
  NativeScrollEvent,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import Text from '../../../../components/Text';
import View, {Row} from '../../../../components/View';
import Comment from '../Comment';
import {styles} from './styles';
import {IAuthor, IComment} from '../../store/interfaces/comment';
import FastImage from 'react-native-fast-image';
import Colors from '../../../../constants/Colors';
import TextInput from '../../../../components/TextInput';
import {IconButton} from '../../../../components/Button';

interface IProp {
  navigation: StackNavigationHelpers;
  commandModelShow: boolean;
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
  appendComments: (postId: string, page: number) => void;
  setCommandModelShow: (commandModelShow: boolean) => void;
  likeComment: (commentId: string) => void;
  dislikeComment: (commentId: string) => void;
  getRepliesComment: (commentId: string) => void;
  appendRepliesComment: (commentId: string, page: number) => void;
  commentPost: (postId: string, content: string, author: IAuthor) => void;
  replyComment: (commentId: string, content: string, author: IAuthor) => void;
}

const newLocal = 'ios-chatbubble-ellipses-sharp';

export default function CommentModal(props: IProp) {
  const [commentContent, setCommentContent] = useState('');
  const [replyingComment, setReplyingComment] = useState<IComment | undefined>(
    undefined,
  );

  const scrollRef = useRef<ScrollView | null>(null);
  const height = useRef(new Animated.Value(75)).current;

  const onScroll = (e: NativeScrollEvent) => {
    if (
      e.layoutMeasurement.height + e.contentOffset.y >=
        e.contentSize.height - 20 &&
      !props.loadingComments &&
      props.comments.length < props.totalComment
    ) {
      props.appendComments(props.currentPostId, props.pageComment + 1);
    }
  };

  const onComment = () => {
    if (commentContent.length === 0) {
      ToastAndroid.show('Enter comment!', ToastAndroid.SHORT);
    } else {
      setCommentContent('');
      Keyboard.dismiss();
      if (replyingComment) {
        setReplyingComment(undefined);
        props.replyComment(
          replyingComment._id,
          commentContent,
          replyingComment.author,
        );
      } else {
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
        props.commentPost(props.currentPostId, commentContent, {
          _id: props.userId,
          username: props.username,
          avatar: props.avatar,
          bio: props.bio,
        });
      }
    }
  };

  useEffect(() => {
    setReplyingComment(undefined);
  }, [props.currentPostId]);

  useEffect(() => {
    const defaultHeight = replyingComment ? 100 : 75;
    Animated.timing(height, {
      toValue: defaultHeight,
      duration: 400,
      useNativeDriver: false,
    }).start();

    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      (e: KeyboardEvent) => {
        Animated.timing(height, {
          toValue: e.endCoordinates.height + defaultHeight,
          duration: 100,
          useNativeDriver: false,
        }).start();
      },
    );
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(height, {
        toValue: defaultHeight,
        duration: 400,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [height, replyingComment]);

  return (
    <Modal
      style={styles.container}
      backdropColor="#00000055"
      isVisible={props.commandModelShow}
      animationInTiming={500}
      animationOutTiming={500}
      statusBarTranslucent
      onBackdropPress={() => props.setCommandModelShow(false)}
      swipeDirection="down"
      swipeThreshold={50}
      onSwipeComplete={() => props.setCommandModelShow(false)}
      propagateSwipe={true}>
      <View style={styles.modalView}>
        <Text style={styles.title}>Comment</Text>
        <ScrollView
          ref={scrollRef}
          onScroll={({nativeEvent: e}) => onScroll(e)}
          scrollEventThrottle={400}>
          <TouchableOpacity style={styles.scrollChild} activeOpacity={1}>
            {props.comments?.map((comment, index) => (
              <Comment
                child={false}
                navigation={props.navigation}
                comment={comment}
                key={index}
                likeComment={props.likeComment}
                dislikeComment={props.dislikeComment}
                getRepliesComment={props.getRepliesComment}
                appendRepliesComment={props.appendRepliesComment}
                setReplyingComment={setReplyingComment}
              />
            ))}
            {props.loadingComments && (
              <FastImage
                source={require('../../../../assets/images/white-loading.gif')}
                style={styles.loading}
              />
            )}
            {props.comments?.length === 0 && !props.loadingComments && (
              <View style={styles.noCommentsView}>
                <Icon
                  style={styles.noComments}
                  name={newLocal}
                  color={Colors.gray}
                  size={170}
                />
                <Text style={styles.noCommentsText}>No comments yet</Text>
              </View>
            )}
          </TouchableOpacity>
        </ScrollView>
        <Animated.View style={{...styles.commantEditView, height}}>
          <Row>
            <TextInput
              style={styles.commantEdit}
              placeholder="Comment"
              value={commentContent}
              onChangeText={e => setCommentContent(e)}
            />
            <IconButton
              style={styles.commantButton}
              name={'ios-send'}
              color={Colors.primary}
              size={30}
              onPress={onComment}
            />
          </Row>
          {replyingComment && (
            <Row style={styles.replyingText}>
              <Text>
                {'Replying comment of ' + replyingComment.author.username}
              </Text>
              <IconButton
                style={styles.cancelReplying}
                name={'close'}
                color={Colors.text}
                size={15}
                onPress={() => {
                  setReplyingComment(undefined);
                }}
              />
            </Row>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}
