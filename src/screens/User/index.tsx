import React, {useEffect, useState} from 'react';
import {Image, NativeScrollEvent, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Menu, MenuItem} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import View, {Row} from '../../components/View';
import Text from '../../components/Text';
import {styles} from './styles';
import {
  makeSelectAvatar,
  makeSelectBio,
  makeSelectId,
  makeSelectUsername,
} from '../../store/selectors';
import {makeSelectPosts} from '../Home/store/selectors';
import Colors from '../../constants/Colors';
import Button, {IconButton} from '../../components/Button';
import * as UserActions from './store/actions';
import * as AppActions from '../../store/actions';
import {IPost} from '../../interfaces/post';
import FastImage from 'react-native-fast-image';
import {makeSelectLoading} from './store/selectors';
import Screens from '../../constants/Screens';

interface IUserPayload {
  navigation: StackNavigationHelpers;
  userId: string;
  username: string;
  avatar: string;
  bio: string;
  posts: IPost[];
  isLoading: boolean;
  logout: () => void;
  getPostOfUser: (payload: any) => void;
  appendPostOfUser: (payload: any) => void;
}

const UserScreen = ({
  navigation,
  userId,
  username,
  avatar,
  bio,
  posts,
  isLoading,
  logout,
  getPostOfUser,
  appendPostOfUser,
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
              <Text style={styles.followNumber}>10</Text>
              <Text style={styles.followField}>Followers</Text>
            </View>
            <View style={styles.followTextGroup}>
              <Text style={styles.followNumber}>10</Text>
              <Text style={styles.followField}>Followings</Text>
            </View>
          </Row>
          <Button
            style={styles.followBtn}
            onPress={() => navigation.navigate(Screens.UpdateProfile)}>
            Update profile
          </Button>
          <View style={styles.listVideoView}>
            {[...Array(Math.ceil(posts.length / 3)).keys()].map(rowId => (
              <Row key={rowId}>
                {[...Array(3).keys()].map(colId => {
                  if (rowId * 3 + colId < posts.length) {
                    return (
                      <View key={colId} style={styles.thumbnailView}>
                        <Image
                          style={styles.thumbnailImage}
                          source={{uri: posts[rowId * 3 + colId].thumbnail}}
                        />
                        <Row style={styles.viewBlurThumbnail}>
                          <Icon
                            style={styles.likeIconThumbnail}
                            name="heart"
                            size={16}
                            color={Colors.background}
                          />
                          <Text style={styles.viewTotalThumbnail}>
                            {'' + posts[rowId * 3 + colId].likeTotal}
                          </Text>
                        </Row>
                      </View>
                    );
                  } else {
                    return <View key={colId} />;
                  }
                })}
              </Row>
            ))}
            {isLoading ? (
              <FastImage
                source={require('../../assets/images/white-loading.gif')}
                style={styles.loading}
              />
            ) : (
              <View />
            )}
          </View>
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
        <Menu
          visible={popupVisible}
          onRequestClose={() => setPopupVisible(false)}>
          <MenuItem onPress={() => logout()}>Logout</MenuItem>
        </Menu>
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  userId: makeSelectId(),
  username: makeSelectUsername(),
  avatar: makeSelectAvatar(),
  bio: makeSelectBio(),
  posts: makeSelectPosts(),
  isLoading: makeSelectLoading(),
});

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(AppActions.logout.request()),
  getPostOfUser: (payload: any) =>
    dispatch(UserActions.getUserPosts.request(payload)),
  appendPostOfUser: (payload: any) =>
    dispatch(UserActions.appendUserPosts.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
