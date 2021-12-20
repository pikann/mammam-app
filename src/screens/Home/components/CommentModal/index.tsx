import * as React from 'react';
import {useEffect, useRef} from 'react';
import {
  Keyboard,
  ScrollView,
  TouchableOpacity,
  KeyboardEvent,
  Animated,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import Text from '../../../../components/Text';
import View, {Row} from '../../../../components/View';
import Comment from '../Comment';
import {styles} from './styles';
import {IComment} from '../../store/interfaces/comment';
import FastImage from 'react-native-fast-image';
import Colors from '../../../../constants/Colors';
import TextInput from '../../../../components/TextInput';
import {IconButton} from '../../../../components/Button';

interface IProp {
  navigation: StackNavigationHelpers;
  commandModelShow: boolean;
  comments: IComment[];
  loadingComments: boolean;
  currentPostId: string;
  appendComments: (postId: string, page: number) => void;
  setCommandModelShow: (commandModelShow: boolean) => void;
  likeComment: (commentId: string) => void;
  dislikeComment: (commentId: string) => void;
  getRepliesComment: (commentId: string) => void;
  appendRepliesComment: (commentId: string, page: number) => void;
}

const newLocal = 'ios-chatbubble-ellipses-sharp';

export default function CommentModal(props: IProp) {
  const height = useRef(new Animated.Value(75)).current;

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      (e: KeyboardEvent) => {
        Animated.timing(height, {
          toValue: e.endCoordinates.height + 75,
          duration: 100,
          useNativeDriver: false,
        }).start();
      },
    );
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(height, {
        toValue: 75,
        duration: 400,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [height]);

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
          onScroll={({nativeEvent: e}) => {
            if (
              e.layoutMeasurement.height + e.contentOffset.y >=
                e.contentSize.height - 20 &&
              !props.loadingComments &&
              props.comments.length / 10 ===
                Math.round(props.comments.length / 10)
            ) {
              props.appendComments(
                props.currentPostId,
                props.comments.length / 10,
              );
            }
          }}
          scrollEventThrottle={400}>
          <TouchableOpacity style={styles.scrollChild} activeOpacity={1}>
            {props.comments.map((comment, index) => (
              <Comment
                navigation={props.navigation}
                comment={comment}
                key={index}
                likeComment={props.likeComment}
                dislikeComment={props.dislikeComment}
                getRepliesComment={props.getRepliesComment}
                appendRepliesComment={props.appendRepliesComment}
              />
            ))}
            {props.loadingComments && (
              <FastImage
                source={require('../../../../assets/images/white-loading.gif')}
                style={styles.loading}
              />
            )}
            {props.comments.length === 0 && !props.loadingComments && (
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
            <TextInput style={styles.commantEdit} placeholder="Comment" />
            <IconButton
              style={styles.commantButton}
              name={'ios-send'}
              color={Colors.primary}
              size={30}
            />
          </Row>
        </Animated.View>
      </View>
    </Modal>
  );
}
