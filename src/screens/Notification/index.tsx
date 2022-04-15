import React, {useEffect, useState} from 'react';
import {Image, NativeScrollEvent, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';
import FastImage from 'react-native-fast-image';

import * as NotificationActions from './store/actions';
import * as WatchingActions from '../Watching/store/actions';
import View, {Row} from '../../components/View';
import Text from '../../components/Text';
import {styles} from './styles';
import {
  makeSelectLoading,
  makeSelectNotifications,
  makeSelectTotalPage,
} from './store/selectors';
import {INotification} from './store/interfaces/notification';
import {NotificationType} from './store/enums/notification-type';
import timeAgo from '../../utils/timeAgo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GettingType} from '../Watching/store/enums/getting-type';
import Screens from '../../constants/Screens';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

interface IProp {
  navigation: StackNavigationHelpers;
  notifications: INotification[];
  totalPage: number;
  isLoading: boolean;
  getNotification: (page: number) => void;
  appendNotification: (page: number) => void;
  getOnePost: (id: string) => void;
  setGettingType: (payload: any) => void;
  getNotificationCount: () => void;
}

const NotificationScreen = ({
  navigation,
  notifications,
  totalPage,
  isLoading,
  getNotification,
  appendNotification,
  getOnePost,
  setGettingType,
  getNotificationCount,
}: IProp) => {
  const [page, setPage] = useState(1);

  const showContent = (notification: INotification) => {
    switch (notification.type) {
      case NotificationType.Comment:
        return `${notification.from
          .map(user => user.username)
          .join(', ')} comment your post`;
      case NotificationType.Follow:
        return `${notification.from
          .map(user => user.username)
          .join(', ')} follow you`;
      case NotificationType.Like:
        return `${notification.from
          .map(user => user.username)
          .join(', ')} like your post`;
      case NotificationType.NewPost:
        return `${notification.from
          .map(user => user.username)
          .join(', ')} post a new video`;
      case NotificationType.ReplyComment:
        return `${notification.from
          .map(user => user.username)
          .join(', ')} reply your comment`;
      default:
        return '';
    }
  };

  const onScroll = (e: NativeScrollEvent) => {
    if (
      e.layoutMeasurement.height + e.contentOffset.y >=
        e.contentSize.height - 20 &&
      !isLoading &&
      page < totalPage
    ) {
      appendNotification(page);
      setPage(page + 1);
    }
  };

  const onShowPost = (id: string) => {
    getOnePost(id);
    setGettingType({
      gettingType: GettingType.ShowOne,
      gettingPayload: {},
      indexBegin: 0,
      page: 0,
    });
    navigation.navigate(Screens.Watching);
  };

  useEffect(() => {
    getNotification(0);
  }, [getNotification]);

  useEffect(() => {
    getNotificationCount();
  }, [notifications, getNotificationCount]);

  return (
    <View style={styles.flex}>
      <Text style={styles.title}>Notifications</Text>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        onScroll={({nativeEvent: e}) => onScroll(e)}
        scrollEventThrottle={400}>
        {notifications.map((notification, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onShowPost(notification.about)}>
            <Row style={styles.notificationRow}>
              <Image
                style={styles.avatarAuthor}
                source={{
                  uri: notification.from[0].avatar,
                }}
                defaultSource={require('../../assets/images/avatar-default.png')}
              />
              <View>
                <Text
                  style={
                    notification.isSeen ? styles.content : styles.contentBold
                  }>
                  {showContent(notification)}
                </Text>
                <Text style={styles.createAt}>{timeAgo(notification.at)}</Text>
              </View>
            </Row>
          </TouchableOpacity>
        ))}
        {isLoading ? (
          <FastImage
            source={require('../../assets/images/white-loading.gif')}
            style={styles.loading}
          />
        ) : (
          <View />
        )}
        {notifications.length === 0 && !isLoading && (
          <View style={styles.noNotificationsView}>
            <Icon
              style={styles.noNotifications}
              name="newspaper-outline"
              color={Colors.gray}
              size={170}
            />
            <Text style={styles.noNotificationsText}>No notification yet</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  notifications: makeSelectNotifications(),
  totalPage: makeSelectTotalPage(),
  isLoading: makeSelectLoading(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getNotification: (page: number) =>
    dispatch(NotificationActions.getNotification.request(page)),
  appendNotification: (page: number) =>
    dispatch(NotificationActions.appendNotification.request(page)),
  getOnePost: (id: string) =>
    dispatch(NotificationActions.getOnePost.request(id)),
  setGettingType: (payload: any) =>
    dispatch(WatchingActions.setGettingType.request(payload)),
  getNotificationCount: () =>
    dispatch(NotificationActions.getNotificationCount.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
