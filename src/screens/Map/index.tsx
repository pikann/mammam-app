import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Keyboard,
  NativeScrollEvent,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import MapView, {Marker, Region} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Menu, MenuItem} from 'react-native-material-menu';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';
import FastImage from 'react-native-fast-image';

import * as MapActions from './store/actions';
import View, {Row} from '../../components/View';
import {styles} from './styles';
import TextInput from '../../components/TextInput';
import Button, {IconButton} from '../../components/Button';
import Colors from '../../constants/Colors';
import Text from '../../components/Text';
import {makeSelectLoading, makeSelectRestaurants} from './store/selectors';
import {IRestaurant} from './store/interfaces/restaurant';

const {height} = Dimensions.get('window');

interface IProp {
  navigation: StackNavigationHelpers;
  restaurants: IRestaurant[];
  isLoading: boolean;
  searchRestaurant: (payload: any) => void;
  appendSearchRestaurant: (payload: any) => void;
}

const MapScreen = ({
  restaurants,
  isLoading,
  searchRestaurant,
  appendSearchRestaurant,
}: IProp) => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [popupVisible, setPopupVisible] = useState(false);
  const [initialRegion, setInitialRegion] = useState<Region>({
    latitude: 16.15973172304073,
    longitude: 108.0700939334929,
    latitudeDelta: 0.9196330438574769,
    longitudeDelta: 0.5471287295222282,
  });

  const containerHeight = useRef(new Animated.Value(height - 200)).current;
  const mapRef = React.createRef<MapView>();

  const onChooseRestaurant = (restaurant: IRestaurant) => {
    Animated.timing(containerHeight, {
      toValue: 200,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {});

    mapRef?.current?.animateToRegion({
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      latitudeDelta: 0.1196330438574769,
      longitudeDelta: 0.1471287295222282,
    });
  };

  const onScroll = (e: NativeScrollEvent) => {
    Animated.timing(containerHeight, {
      toValue: height - 200,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {});

    if (
      e.layoutMeasurement.height + e.contentOffset.y >=
        e.contentSize.height - 20 &&
      !isLoading
    ) {
      appendSearchRestaurant({
        keyword,
        page,
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
      });

      setPage(page + 1);
    }
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        setInitialRegion({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.9196330438574769,
          longitudeDelta: 0.5471287295222282,
        });
      },
      error => console.log('ERROR', error),
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 3600000,
      },
    );
  }, []);

  useEffect(() => {
    searchRestaurant({
      keyword,
      page: 0,
      latitude: initialRegion.latitude,
      longitude: initialRegion.longitude,
    });
  }, [keyword, initialRegion, searchRestaurant]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(containerHeight, {
        toValue: height - 200,
        duration: 400,
        useNativeDriver: false,
      }).start(() => {});
    });

    return () => {
      showSubscription.remove();
    };
  }, [containerHeight]);

  return (
    <View style={styles.flex}>
      <MapView
        ref={mapRef}
        style={styles.flex}
        showsUserLocation={true}
        showsMyLocationButton={false}
        initialRegion={initialRegion}>
        {restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            title={restaurant.name}
          />
        ))}
      </MapView>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={text => setKeyword(text)}
        value={keyword}
      />
      <View style={styles.optionView}>
        <IconButton
          style={styles.optionBtn}
          name={'ellipsis-vertical'}
          color={Colors.text}
          size={27}
          underlayColor={'transparent'}
          onPress={() => setPopupVisible(!popupVisible)}
        />

        <Menu
          visible={popupVisible}
          onRequestClose={() => setPopupVisible(false)}>
          <MenuItem onPress={() => console.log('Your restaurant')}>
            <Text style={styles.menuItem}>Your restaurant</Text>
          </MenuItem>
        </Menu>
      </View>
      <Animated.View
        style={{
          ...styles.contentContainer,
          height: containerHeight,
          marginTop: Animated.subtract(height - 55, containerHeight),
        }}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onScroll={({nativeEvent: e}) => onScroll(e)}
          scrollEventThrottle={400}>
          {restaurants.map((restaurant, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                onChooseRestaurant(restaurant);
              }}>
              <Row style={styles.userRow}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: restaurant.avatar,
                  }}
                  defaultSource={require('../../assets/images/avatar-default.png')}
                />
                <Text style={styles.username}>{restaurant.name}</Text>

                <Button
                  style={styles.followBtn}
                  textChildrenStyle={styles.followBtnText}
                  onPress={() => console.log('Detail')}>
                  Detail
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
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  restaurants: makeSelectRestaurants(),
  isLoading: makeSelectLoading(),
});

const mapDispatchToProps = (dispatch: any) => ({
  searchRestaurant: (payload: any) =>
    dispatch(MapActions.searchRestaurant.request(payload)),
  appendSearchRestaurant: (payload: any) =>
    dispatch(MapActions.appendSearchRestaurant.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
