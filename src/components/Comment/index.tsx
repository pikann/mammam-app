import * as React from 'react';
import {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';
import {Menu, MenuItem} from 'react-native-material-menu';

import {IconButton, TextButton} from '../Button';
import Text from '../Text';
import View, {Row} from '../View';
import Colors from '../../constants/Colors';
import {styles} from './styles';
import {IComment} from '../../interfaces/comment';
import timeAgo from '../../utils/timeAgo';
import FastImage from 'react-native-fast-image';

interface IProp {
  navigation: StackNavigationHelpers;
  child: boolean;
  comment: IComment;
  userId: string;
  likeComment: (commentId: string) => void;
  dislikeComment: (commentId: string) => void;
  getRepliesComment: (commentId: string) => void;
  appendRepliesComment: (commentId: string, page: number) => void;
  setReplyingComment: (comment: IComment) => void;
  setModifyingComment: (comment: IComment) => void;
  onDelete: (id: string) => void;
}

export default function Comment({
  navigation,
  child,
  comment,
  userId,
  likeComment,
  dislikeComment,
  getRepliesComment,
  appendRepliesComment,
  setReplyingComment,
  setModifyingComment,
  onDelete,
}: IProp) {
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <Row style={styles.container}>
      <Image
        style={styles.avatarAuthor}
        source={{
          uri: comment.author.avatar,
        }}
        defaultSource={require('../../assets/images/avatar-default.png')}
      />
      <View style={styles.flex}>
        <Row>
          <Text style={styles.content}>{comment.content}</Text>
          <View style={styles.actionView}>
            <IconButton
              name={'ellipsis-vertical'}
              color={Colors.text}
              size={18}
              onPress={() => setPopupVisible(!popupVisible)}
            />
            {userId === comment.author._id ? (
              <Menu
                visible={popupVisible}
                onRequestClose={() => setPopupVisible(false)}>
                <MenuItem
                  onPress={() => {
                    setModifyingComment(comment);
                  }}>
                  <Text style={styles.menuItem}>Modify</Text>
                </MenuItem>
                <MenuItem onPress={() => onDelete(comment._id)}>
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
            )}
          </View>
        </Row>
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
            userId={userId}
            likeComment={likeComment}
            dislikeComment={dislikeComment}
            getRepliesComment={getRepliesComment}
            appendRepliesComment={appendRepliesComment}
            setReplyingComment={setReplyingComment}
            setModifyingComment={setModifyingComment}
            onDelete={onDelete}
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
            source={require('../../assets/images/white-loading.gif')}
            style={styles.loading}
          />
        )}
      </View>
    </Row>
  );
}
