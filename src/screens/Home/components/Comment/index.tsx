import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import {IconButton, TextButton} from '../../../../components/Button';
import Text from '../../../../components/Text';
import View, {Row} from '../../../../components/View';
import Colors from '../../../../constants/Colors';
import {styles} from './styles';
import {IComment} from '../../../../interfaces/comment';
import timeAgo from '../../../../utils/timeAgo';
import FastImage from 'react-native-fast-image';

interface IProp {
  navigation: StackNavigationHelpers;
  child: boolean;
  comment: IComment;
  likeComment: (commentId: string) => void;
  dislikeComment: (commentId: string) => void;
  getRepliesComment: (commentId: string) => void;
  appendRepliesComment: (commentId: string, page: number) => void;
  setReplyingComment: (comment: IComment) => void;
}

export default function Comment({
  navigation,
  child,
  comment,
  likeComment,
  dislikeComment,
  getRepliesComment,
  appendRepliesComment,
  setReplyingComment,
}: IProp) {
  return (
    <Row style={styles.container}>
      <Image
        style={styles.avatarAuthor}
        source={{
          uri: comment.author.avatar,
        }}
        defaultSource={require('../../../../assets/images/avatar-default.png')}
      />
      <View style={styles.flex}>
        <Text style={styles.content}>{comment.content}</Text>
        <Row>
          <Text style={styles.createAt}>{timeAgo(comment.createdAt)}</Text>
          <IconButton
            style={styles.likeActionButton}
            name={'heart'}
            color={comment.isLiked ? Colors.secondary : Colors.textGray}
            size={15}
            onPress={() => {
              if (comment.isLiked) {
                dislikeComment(comment._id);
              } else {
                likeComment(comment._id);
              }
            }}
          />
          <Text style={styles.likeTotal}>{'' + comment.likeTotal}</Text>
          {!child && (
            <TextButton
              style={styles.reply}
              textStyle={styles.replyText}
              onPress={() => {
                setReplyingComment(comment);
              }}>
              Reply
            </TextButton>
          )}
        </Row>
        {comment.replies?.map((reply, index) => (
          <Comment
            child={true}
            navigation={navigation}
            comment={reply}
            key={index}
            likeComment={likeComment}
            dislikeComment={dislikeComment}
            getRepliesComment={getRepliesComment}
            appendRepliesComment={appendRepliesComment}
            setReplyingComment={setReplyingComment}
          />
        ))}
        {comment.replyTotal > 0 &&
          comment.replies?.length === 0 &&
          !comment.loadingReplies && (
            <TouchableOpacity
              onPress={() => {
                getRepliesComment(comment._id);
              }}>
              <Row style={styles.repliesRow}>
                <IconButton
                  name={'chevron-down-outline'}
                  color={Colors.text}
                  size={17}
                />
                <Text
                  style={
                    styles.showRepliesText
                  }>{`Read ${comment.replyTotal} replies`}</Text>
              </Row>
            </TouchableOpacity>
          )}
        {comment.replyTotal > 0 &&
          comment.replies?.length > 0 &&
          comment.replies?.length < comment.replyTotal && (
            <TouchableOpacity
              onPress={() => {
                if (comment.replies.length < comment.replyTotal) {
                  appendRepliesComment(comment._id, comment.pageReply + 1);
                }
              }}>
              <Row style={styles.repliesRow}>
                <IconButton
                  name={'chevron-down-outline'}
                  color={Colors.text}
                  size={17}
                />
                <Text style={styles.showRepliesText}>{`Read more ${
                  comment.replyTotal - comment.replies?.length
                } replies`}</Text>
              </Row>
            </TouchableOpacity>
          )}
        {comment.loadingReplies && (
          <FastImage
            source={require('../../../../assets/images/white-loading.gif')}
            style={styles.loading}
          />
        )}
      </View>
    </Row>
  );
}
