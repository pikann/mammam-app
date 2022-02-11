import React, {useEffect, useState} from 'react';
import {Image, NativeScrollEvent, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Menu, MenuDivider, MenuItem} from 'react-native-material-menu';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import View, {Row} from '../../components/View';
import Text from '../../components/Text';
import {styles} from './styles';
import {makeSelectId} from '../../store/selectors';
import {makeSelectLoading, makeSelectPosts} from '../Home/store/selectors';
import {
  makeSelectAvatar,
  makeSelectBio,
  makeSelectFollowers,
  makeSelectFollowings,
  makeSelectIsFollowed,
  makeSelectUserId,
  makeSelectUsername,
} from './store/selectors';
import Colors from '../../constants/Colors';
import Button, {IconButton} from '../../components/Button';
import * as UserActions from './store/actions';
import * as AppActions from '../../store/actions';
import * as WatchingActions from '../Watching/store/actions';
import {IPost} from '../../interfaces/post';
import Screens from '../../constants/Screens';
import {GettingType} from '../Watching/store/enums/getting-type';
import ListPost from '../../components/ListPost';

interface IUserPayload {
  navigation: StackNavigationHelpers;
  loginUserId: string;
  userId: string;
  username: string;
  avatar: string;
  bio: string;
  isFollowed: boolean;
  posts: IPost[];
  isLoading: boolean;
  followers: number;
  followings: number;
  logout: () => void;
  getPostOfUser: (payload: any) => void;
  appendPostOfUser: (payload: any) => void;
  setGettingType: (payload: any) => void;
  follow: (userId: string) => void;
  unfollow: (userId: string) => void;
  getFollowersTotal: (userId: string) => void;
}

const UserScreen = ({
  navigation,
  loginUserId,
  userId,
  username,
  avatar,
  bio,
  isFollowed,
  posts,
  isLoading,
  followers,
  followings,
  logout,
  getPostOfUser,
  appendPostOfUser,
  setGettingType,
  follow,
  unfollow,
  getFollowersTotal,
}: IUserPayload) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getPostOfUser({
      author: {
        _id: userId,
        username,
        avatar,
        bio,
      },
      page: 0,
    });
    setPage(1);
  }, [avatar, bio, getPostOfUser, userId, username]);

  useEffect(() => {
    getFollowersTotal(userId);
  }, [userId, getFollowersTotal]);

  const onScroll = (e: NativeScrollEvent) => {
    if (
      e.layoutMeasurement.height + e.contentOffset.y >=
        e.contentSize.height - 20 &&
      !isLoading
    ) {
      appendPostOfUser({
        author: {
          _id: userId,
          username,
          avatar,
          bio,
        },
        page,
      });

      setPage(page + 1);
    }
  };

  const onPressThumbnail = (indexBegin: number) => {
    setGettingType({
      gettingType: GettingType.User,
      gettingPayload: {
        author: {
          _id: userId,
          username,
          avatar,
          bio,
        },
      },
      indexBegin,
      page,
    });
    navigation.navigate(Screens.Watching);
  };

  return (
    <View style={styles.background}>
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onScroll={({nativeEvent: e}) => onScroll(e)}
          scrollEventThrottle={400}>
          {bio && bio !== '' ? (
            <Text style={styles.bioText}>{bio}</Text>
          ) : (
            <View />
          )}
          <Row style={styles.followProfile}>
            <View style={styles.followTextGroup}>
              <Text style={styles.followNumber}>{'' + followers}</Text>
              <Text style={styles.followField}>Followers</Text>
            </View>
            <View style={styles.followTextGroup}>
              <Text style={styles.followNumber}>{'' + followings}</Text>
              <Text style={styles.followField}>Followings</Text>
            </View>
          </Row>
          {userId === loginUserId ? (
            <Button
              style={styles.followBtn}
              onPress={() => navigation.navigate(Screens.UpdateProfile)}>
              Update profile
            </Button>
          ) : isFollowed ? (
            <Button style={styles.followBtn} onPress={() => unfollow(userId)}>
              Unfollow
            </Button>
          ) : (
            <Button style={styles.followBtn} onPress={() => follow(userId)}>
              Follow
            </Button>
          )}
          <ListPost
            style={styles.listVideoView}
            posts={posts}
            isLoading={isLoading}
            onPressThumbnail={onPressThumbnail}
          />
        </ScrollView>
      </View>
      <Row style={styles.profileView}>
        <Image
          style={styles.avatar}
          source={{
            uri: avatar,
          }}
          defaultSource={require('../../assets/images/avatar-default.png')}
        />
        <Text style={styles.username}>{username}</Text>
      </Row>
      <View style={styles.optionView}>
        <IconButton
          style={styles.optionBtn}
          name={'ellipsis-vertical'}
          color={Colors.text}
          size={27}
          underlayColor={Colors.primary}
          onPress={() => setPopupVisible(!popupVisible)}
        />
        {userId === loginUserId ? (
          <Menu
            visible={popupVisible}
            onRequestClose={() => setPopupVisible(false)}>
            <MenuItem onPress={() => navigation.navigate(Screens.Password)}>
              <Text style={styles.menuItem}>Update password</Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem onPress={() => logout()}>
              <Text style={styles.menuItem}>Logout</Text>
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
    </View>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  loginUserId: makeSelectId(),
  userId: makeSelectUserId(),
  username: makeSelectUsername(),
  avatar: makeSelectAvatar(),
  bio: makeSelectBio(),
  isFollowed: makeSelectIsFollowed(),
  posts: makeSelectPosts(),
  isLoading: makeSelectLoading(),
  followers: makeSelectFollowers(),
  followings: makeSelectFollowings(),
});

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(AppActions.logout.request()),
  getPostOfUser: (payload: any) =>
    dispatch(UserActions.getUserPosts.request(payload)),
  appendPostOfUser: (payload: any) =>
    dispatch(UserActions.appendUserPosts.request(payload)),
  setGettingType: (payload: any) =>
    dispatch(WatchingActions.setGettingType.request(payload)),
  follow: (userId: string) => dispatch(UserActions.follow.request(userId)),
  unfollow: (userId: string) => dispatch(UserActions.unfollow.request(userId)),
  getFollowersTotal: (userId: string) =>
    dispatch(UserActions.getFollowersTotal.request(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
