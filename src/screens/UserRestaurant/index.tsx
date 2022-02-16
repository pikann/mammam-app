import React, {useEffect, useState} from 'react';
import {
  Image,
  NativeScrollEvent,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';
import {Menu, MenuItem} from 'react-native-material-menu';
import FastImage from 'react-native-fast-image';

import * as UserRestaurantActions from './store/actions';
import * as CreateRestaurantActions from '../CreateRestaurant/store/actions';
import {BackButton, IconButton, TextButton} from '../../components/Button';
import Text from '../../components/Text';
import View, {Row} from '../../components/View';
import {makeSelectLoading, makeSelectRestaurants} from './store/selectors';
import {styles} from './styles';
import {IRestaurant} from './store/interfaces/restaurant';
import Colors from '../../constants/Colors';
import Screens from '../../constants/Screens';

interface IProp {
  navigation: StackNavigationHelpers;
  restaurants: IRestaurant[];
  isLoading: boolean;
  getUserRestaurant: (page: number) => void;
  appendUserRestaurant: (page: number) => void;
  setRestaurantInfo: (payload: any) => void;
}

const UserRestaurantScreen = ({
  navigation,
  restaurants,
  isLoading,
  getUserRestaurant,
  appendUserRestaurant,
  setRestaurantInfo,
}: IProp) => {
  const [page, setPage] = useState(1);
  const [showOptions, setShowOptions] = useState<boolean[]>([]);

  const onScroll = (e: NativeScrollEvent) => {
    if (
      e.layoutMeasurement.height + e.contentOffset.y >=
        e.contentSize.height - 20 &&
      !isLoading
    ) {
      appendUserRestaurant(page);

      setPage(page + 1);
    }
  };

  const onModify = (restaurant: IRestaurant) => {
    setRestaurantInfo(restaurant);
    navigation.navigate(Screens.CreateRestaurant);
  };

  useEffect(() => {
    getUserRestaurant(0);
  }, [getUserRestaurant]);

  useEffect(() => {
    setShowOptions(new Array(restaurants.length).fill(false));
  }, [restaurants.length]);

  return (
    <View style={styles.background}>
      <Row style={styles.topRow}>
        <BackButton
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
        <TextButton
          style={styles.registerButton}
          textStyle={styles.registerButtonText}
          onPress={() => {
            setRestaurantInfo({
              _id: '',
              name: '',
              bio: '',
              avatar: '',
              address: '',
              latitude: 0,
              longitude: 0,
            });
            navigation.navigate(Screens.CreateRestaurant);
          }}>
          New restaurant
        </TextButton>
      </Row>
      <Text style={styles.title}>Your restaurant</Text>
      <Text style={styles.description}>Manage your restaurant</Text>
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onScroll={({nativeEvent: e}) => onScroll(e)}
          scrollEventThrottle={400}>
          {restaurants.map((restaurant, index) => (
            <TouchableWithoutFeedback key={index} onPress={() => {}}>
              <Row style={styles.userRow}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: restaurant.avatar,
                  }}
                  defaultSource={require('../../assets/images/avatar-default.png')}
                />
                <View style={styles.flex}>
                  <Text style={styles.username}>{restaurant.name}</Text>
                  <Text style={styles.address}>{restaurant.address}</Text>
                </View>
                <View style={styles.optionView}>
                  <IconButton
                    style={styles.optionBtn}
                    name={'ellipsis-vertical'}
                    color={Colors.text}
                    size={27}
                    underlayColor={'transparent'}
                    onPress={() =>
                      setShowOptions(
                        showOptions.map(
                          (showOption, optionIndex) => index === optionIndex,
                        ),
                      )
                    }
                  />

                  <Menu
                    visible={showOptions[index]}
                    onRequestClose={() =>
                      setShowOptions(new Array(restaurants.length).fill(false))
                    }>
                    <MenuItem onPress={() => onModify(restaurant)}>
                      <Text style={styles.menuItem}>Modify</Text>
                    </MenuItem>
                    <MenuItem onPress={() => {}}>
                      <Text style={styles.menuItem}>Delete</Text>
                    </MenuItem>
                  </Menu>
                </View>
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
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  restaurants: makeSelectRestaurants(),
  isLoading: makeSelectLoading(),
});

const mapDispatchToProps = (dispatch: any) => ({
  getUserRestaurant: (page: number) =>
    dispatch(UserRestaurantActions.getUserRestaurant.request(page)),
  appendUserRestaurant: (page: number) =>
    dispatch(UserRestaurantActions.appendUserRestaurant.request(page)),
  setRestaurantInfo: (payload: any) =>
    dispatch(CreateRestaurantActions.setRestaurantInfo.request(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserRestaurantScreen);
