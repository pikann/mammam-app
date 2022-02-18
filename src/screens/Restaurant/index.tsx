import React, {useEffect, useState} from 'react';
import {Alert, Image, NativeScrollEvent, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Menu, MenuDivider, MenuItem} from 'react-native-material-menu';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import View, {Row} from '../../components/View';
import Text from '../../components/Text';
import {styles} from './styles';
import {makeSelectId} from '../../store/selectors';
import {makeSelectLoading, makeSelectPosts} from '../Home/store/selectors';
import Colors from '../../constants/Colors';
import Button, {BackButton, IconButton} from '../../components/Button';
import * as RestaurantActions from './store/actions';
import * as WatchingActions from '../Watching/store/actions';
import * as CreateRestaurantActions from '../CreateRestaurant/store/actions';
import * as UserRestaurantActions from '../UserRestaurant/store/actions';
import {IPost, IRestaurant} from '../../interfaces/post';
import Screens from '../../constants/Screens';
import {GettingType} from '../Watching/store/enums/getting-type';
import ListPost from '../../components/ListPost';
import {makeSelectRestaurant} from './store/selectors';

interface IUserPayload {
  navigation: StackNavigationHelpers;
  loginUserId: string;
  restaurant: IRestaurant;
  posts: IPost[];
  isLoading: boolean;
  getRestaurantPosts: (payload: any) => void;
  appendRestaurantPosts: (payload: any) => void;
  setGettingType: (payload: any) => void;
  setRestaurantInfo: (payload: any) => void;
  deleteRestaurant: (id: string) => void;
}

const RestaurantScreen = ({
  navigation,
  loginUserId,
  restaurant,
  posts,
  isLoading,
  getRestaurantPosts,
  appendRestaurantPosts,
  setGettingType,
  setRestaurantInfo,
  deleteRestaurant,
}: IUserPayload) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getRestaurantPosts({
      restaurant,
      page: 0,
    });
    setPage(1);
  }, [getRestaurantPosts, restaurant]);

  const onScroll = (e: NativeScrollEvent) => {
    if (
      e.layoutMeasurement.height + e.contentOffset.y >=
        e.contentSize.height - 20 &&
      !isLoading
    ) {
      appendRestaurantPosts({
        restaurant,
        page,
      });

      setPage(page + 1);
    }
  };

  const onPressThumbnail = (indexBegin: number) => {
    setGettingType({
      gettingType: GettingType.Restaurant,
      gettingPayload: {
        restaurant,
      },
      indexBegin,
      page,
    });
    navigation.navigate(Screens.Watching);
  };

  const onModify = () => {
    setRestaurantInfo(restaurant);
    navigation.navigate(Screens.CreateRestaurant);
  };

  const onDelete = () => {
    Alert.alert('Delete restaurant', 'Do you want to delete this restaurant?', [
      {
        text: 'Yes',
        onPress: () => {
          deleteRestaurant(restaurant._id);
        },
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
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
          {restaurant.bio && restaurant.bio !== '' ? (
            <Text style={styles.bioText}>{restaurant.bio}</Text>
          ) : (
            <View />
          )}
          {restaurant.address && restaurant.address !== '' ? (
            <Text
              style={
                styles.addressText
              }>{`Address: ${restaurant.address}`}</Text>
          ) : (
            <View />
          )}
          <Button style={styles.followBtn} onPress={() => {}}>
            Go to
          </Button>
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
            uri: restaurant.avatar,
          }}
          defaultSource={require('../../assets/images/avatar-default.png')}
        />
        <Text style={styles.username}>{restaurant.name}</Text>
      </Row>
      <Row style={styles.topRow}>
        <BackButton
          style={styles.backButton}
          onPress={() => navigation.navigate(Screens.Home)}
        />
        <View style={styles.optionView}>
          <IconButton
            style={styles.optionBtn}
            name={'ellipsis-vertical'}
            color={Colors.text}
            size={27}
            underlayColor={Colors.primary}
            onPress={() => setPopupVisible(!popupVisible)}
          />
          {restaurant.admin === loginUserId ? (
            <Menu
              visible={popupVisible}
              onRequestClose={() => setPopupVisible(false)}>
              <MenuItem onPress={() => onModify()}>
                <Text style={styles.menuItem}>Modify</Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem onPress={() => onDelete()}>
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
    </View>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  loginUserId: makeSelectId(),
  restaurant: makeSelectRestaurant(),
  posts: makeSelectPosts(),
  isLoading: makeSelectLoading(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getRestaurantPosts: (payload: any) =>
    dispatch(RestaurantActions.getRestaurantPosts.request(payload)),
  appendRestaurantPosts: (payload: any) =>
    dispatch(RestaurantActions.appendRestaurantPosts.request(payload)),
  setGettingType: (payload: any) =>
    dispatch(WatchingActions.setGettingType.request(payload)),
  setRestaurantInfo: (payload: any) =>
    dispatch(CreateRestaurantActions.setRestaurantInfo.request(payload)),
  deleteRestaurant: (id: string) =>
    dispatch(UserRestaurantActions.deleteRestaurant.request(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantScreen);
