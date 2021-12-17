import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import {IconButton} from '../../../../components/Button';
import Text from '../../../../components/Text';
import View, {Row} from '../../../../components/View';
import Colors from '../../../../constants/Colors';
import {styles} from './styles';
import {IComment} from '../../store/interfaces/comment';
import timeAgo from '../../../../utils/timeAgo';

interface IProp {
  navigation: StackNavigationHelpers;
  comment: IComment;
  likeComment: (commentId: string) => void;
  dislikeComment: (commentId: string) => void;
  getRepliesComment: (commentId: string) => void;
  appendRepliesComment: (commentId: string, page: number) => void;
}

export default function Comment({
  navigation,
  comment,
  likeComment,
  dislikeComment,
  getRepliesComment,
  appendRepliesComment,
}: IProp) {
  return (
    <Row style={styles.container}>
      <Image
        style={styles.avatarAuthor}
        source={{
          uri: comment.author.avatar,
        }}
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
          <Text style={styles.reply}>Reply</Text>
        </Row>
        {comment.replies?.map((reply, index) => (
          <Comment
            navigation={navigation}
            comment={reply}
            key={index}
            likeComment={likeComment}
            dislikeComment={dislikeComment}
            getRepliesComment={getRepliesComment}
            appendRepliesComment={appendRepliesComment}
          />
        ))}
        {comment.replyTotal > 0 && comment.replies?.length === 0 && (
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
                if (
                  comment.replies.length / 10 ===
                  Math.round(comment.replies.length / 10)
                ) {
                  appendRepliesComment(
                    comment._id,
                    comment.replies.length / 10,
                  );
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
      </View>
    </Row>
  );
}
