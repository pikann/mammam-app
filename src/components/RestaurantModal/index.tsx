import * as React from 'react';
import {
  Image,
  NativeScrollEvent,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useEffect, useState} from 'react';
import {Region} from 'react-native-maps';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import Geolocation from '@react-native-community/geolocation';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import {styles} from './styles';
import View, {Row} from '../View';
import TextInput from '../TextInput';
import {IRestaurant} from '../../screens/Map/store/interfaces/restaurant';
import Text from '../Text';

interface IProp {
  navigation: StackNavigationHelpers;
  modalShow: boolean;
  restaurants: IRestaurant[];
  isLoading: boolean;
  setModalShow: (modalShow: boolean) => void;
  searchRestaurant: (payload: any) => void;
  appendSearchRestaurant: (payload: any) => void;
  setRestaurant: (restaurant: IRestaurant) => void;
}

export default function RestaurantModal({
  modalShow,
  restaurants,
  isLoading,
  setModalShow,
  searchRestaurant,
  appendSearchRestaurant,
  setRestaurant,
}: IProp) {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [initialRegion, setInitialRegion] = useState<Region>({
    latitude: 16.15973172304073,
    longitude: 108.0700939334929,
    latitudeDelta: 0.9196330438574769,
    longitudeDelta: 0.5471287295222282,
  });

  const onScroll = (e: NativeScrollEvent) => {
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

  return (
    <Modal
      style={styles.container}
      backdropColor="#00000055"
      isVisible={modalShow}
      animationInTiming={500}
      animationOutTiming={500}
      statusBarTranslucent
      onBackdropPress={() => setModalShow(false)}
      swipeDirection="down"
      swipeThreshold={50}
      onSwipeComplete={() => setModalShow(false)}
      propagateSwipe={true}>
      <View style={styles.modalView}>
        <TextInput
          style={styles.place}
          placeholder="Search..."
          onChangeText={text => setKeyword(text)}
        />
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
                setRestaurant(restaurant);
                setModalShow(false);
              }}>
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
    </Modal>
  );
}
