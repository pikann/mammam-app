import React, {useEffect, useState} from 'react';
import {
  Image,
  NativeScrollEvent,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import FastImage from 'react-native-fast-image';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import * as SearchActions from './store/actions';
import * as WatchingActions from '../Watching/store/actions';
import * as UserActions from '../User/store/actions';
import View, {Row} from '../../components/View';
import {styles} from './styles';
import Button, {BackButton, TextButton} from '../../components/Button';
import TextInput from '../../components/TextInput';
import {TagSearch} from './store/enums/tag-search';
import {makeSelectUsers} from './store/selectors';
import {makeSelectLoading, makeSelectPosts} from '../Home/store/selectors';
import {IAuthor, IPost} from '../../interfaces/post';
import Text from '../../components/Text';
import ListPost from '../../components/ListPost';
import {GettingType} from '../Watching/store/enums/getting-type';
import Screens from '../../constants/Screens';

interface IProp {
  navigation: StackNavigationHelpers;
  users: IAuthor[];
  posts: IPost[];
  isLoading: boolean;
  searchUsers: (payload: any) => void;
  searchPosts: (payload: any) => void;
  setGettingType: (payload: any) => void;
  appendSearchUsers: (payload: any) => void;
  appendSearchPosts: (payload: any) => void;
  setUserInfo: (payload: any) => void;
}

const SearchScreen = ({
  navigation,
  users,
  posts,
  isLoading,
  searchUsers,
  searchPosts,
  setGettingType,
  appendSearchUsers,
  appendSearchPosts,
  setUserInfo,
}: IProp) => {
  const [keyword, setKeyword] = useState('');
  const [tagSearch, setTagSearch] = useState(TagSearch.User);
  const [page, setPage] = useState(0);

  const onPressThumbnail = (indexBegin: number) => {
    setGettingType({
      gettingType: GettingType.Search,
      gettingPayload: {
        keyword,
      },
      indexBegin,
      page,
    });
    navigation.navigate(Screens.Watching);
  };

  const onScroll = (e: NativeScrollEvent) => {
    if (
      e.layoutMeasurement.height + e.contentOffset.y >=
        e.contentSize.height - 20 &&
      !isLoading
    ) {
      if (tagSearch === TagSearch.User) {
        appendSearchUsers({
          keyword,
          page,
        });
      } else {
        appendSearchPosts({
          keyword,
          page,
        });
      }

      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (tagSearch === TagSearch.User) {
      searchUsers({
        keyword,
        page: 0,
      });
    } else {
      searchPosts({
        keyword,
        page: 0,
      });
    }

    setPage(1);
  }, [keyword, tagSearch, searchUsers, searchPosts]);

  return (
    <View style={styles.flex}>
      <Row style={styles.searchRow}>
        <BackButton
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={text => setKeyword(text)}
          value={keyword}
        />
      </Row>
      <Row style={styles.tagRow}>
        <TextButton
          textStyle={
            tagSearch === TagSearch.User
              ? {...styles.tagTitle, ...styles.choicedTag}
              : styles.tagTitle
          }
          onPress={() => {
            setTagSearch(TagSearch.User);
          }}>
          User
        </TextButton>
        <TextButton
          textStyle={
            tagSearch === TagSearch.Post
              ? {...styles.tagTitle, ...styles.choicedTag}
              : styles.tagTitle
          }
          onPress={() => {
            setTagSearch(TagSearch.Post);
          }}>
          Post
        </TextButton>
      </Row>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={({nativeEvent: e}) => onScroll(e)}
        scrollEventThrottle={400}>
        {tagSearch === TagSearch.User ? (
          <View style={styles.flex}>
            {users.map((user, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  setUserInfo({
                    userId: user._id,
                    username: user.username,
                    avatar: user.avatar,
                    bio: user.bio,
                    isFollowed: user.isFollowed,
                  });
                  navigation.navigate(Screens.User);
                }}>
                <Row style={styles.userRow}>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: user.avatar,
                    }}
                    defaultSource={require('../../assets/images/avatar-default.png')}
                  />
                  <Text style={styles.username}>{user.username}</Text>

                  <Button
                    style={styles.followBtn}
                    textChildrenStyle={styles.followBtnText}
                    onPress={() => console.log('Follow')}>
                    Follow
                  </Button>
                </Row>
              </TouchableWithoutFeedback>
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
        ) : (
          <ListPost
            style={styles.flex}
            posts={posts}
            isLoading={isLoading}
            onPressThumbnail={onPressThumbnail}
          />
        )}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  users: makeSelectUsers(),
  posts: makeSelectPosts(),
  isLoading: makeSelectLoading(),
});

const mapDispatchToProps = (dispatch: any) => ({
  searchUsers: (payload: any) =>
    dispatch(SearchActions.searchUsers.request(payload)),
  searchPosts: (payload: any) =>
    dispatch(SearchActions.searchPosts.request(payload)),
  setGettingType: (payload: any) =>
    dispatch(WatchingActions.setGettingType.request(payload)),
  appendSearchUsers: (payload: any) =>
    dispatch(SearchActions.appendSearchUsers.request(payload)),
  appendSearchPosts: (payload: any) =>
    dispatch(SearchActions.appendSearchPosts.request(payload)),
  setUserInfo: (payload: any) =>
    dispatch(UserActions.setUserInfo.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
