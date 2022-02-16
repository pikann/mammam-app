import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import MapView, {LatLng, Region} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import * as EnterAddressActions from './store/actions';
import Button, {BackButton} from '../../components/Button';
import View, {Row} from '../../components/View';
import {styles} from './styles';
import TextInput from '../../components/TextInput';
import {
  makeSelectAddress,
  makeSelectAvatar,
  makeSelectAvatarType,
  makeSelectBio,
  makeSelectComplete,
  makeSelectId,
  makeSelectLatitude,
  makeSelectLoading,
  makeSelectLongitude,
  makeSelectName,
} from './store/selectors';
import Screens from '../../constants/Screens';

interface IProp {
  navigation: StackNavigationHelpers;
  _id: string;
  name: string;
  bio: string;
  avatar: string;
  avatarType: string;
  address: string;
  latitude: number;
  longitude: number;
  isLoading: boolean;
  complete: boolean;
  createRestaurant: (payload: any) => void;
  updateRestaurant: (payload: any) => void;
  resetComplete: () => void;
}

const EnterAddressScreen = (props: IProp) => {
  const [address, setAddress] = useState(props.address || '');
  const [initialRegion, setInitialRegion] = useState<Region>({
    latitude: props.latitude || 16.15973172304073,
    longitude: props.longitude || 108.0700939334929,
    latitudeDelta: 0.9196330438574769,
    longitudeDelta: 0.5471287295222282,
  });
  const [marker, setMarker] = useState<LatLng>({
    latitude: props.latitude || 16.15973172304073,
    longitude: props.longitude || 108.0700939334929,
  });

  const onSubmit = () => {
    if (props._id === '') {
      props.createRestaurant({
        name: props.name,
        bio: props.bio,
        avatar: props.avatar === '' ? undefined : props.avatar,
        avatarType: props.avatarType === '' ? undefined : props.avatarType,
        address,
        latitude: marker.latitude,
        longitude: marker.longitude,
      });
    } else {
      props.updateRestaurant({
        _id: props._id,
        name: props.name,
        bio: props.bio,
        avatar: props.avatar === '' ? undefined : props.avatar,
        avatarType: props.avatarType === '' ? undefined : props.avatarType,
        address,
        latitude: marker.latitude,
        longitude: marker.longitude,
      });
    }
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        setInitialRegion({
          latitude:
            props.latitude === 0 ? info.coords.latitude : props.latitude,
          longitude:
            props.longitude === 0 ? info.coords.longitude : props.longitude,
          latitudeDelta: 0.9196330438574769,
          longitudeDelta: 0.5471287295222282,
        });
        if (props.latitude === 0 && props.longitude === 0) {
          setMarker({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          });
        }
      },
      error => console.log('ERROR', error),
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 3600000,
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.complete) {
      props.resetComplete();
      props.navigation.navigate(Screens.Home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.complete, props.navigation]);

  return (
    <View style={styles.flex}>
      <Row style={styles.topRow}>
        <BackButton
          style={styles.backButton}
          onPress={() => props.navigation.goBack()}
        />
      </Row>
      <TextInput
        style={styles.addressInput}
        placeholder="Address"
        defaultValue={props.address}
        onChangeText={text => setAddress(text)}
      />
      <View style={styles.mapView}>
        <MapView
          style={styles.flex}
          showsUserLocation={true}
          showsMyLocationButton={false}
          initialRegion={initialRegion}
          onRegionChangeComplete={(region: Region) =>
            setMarker({
              latitude: region.latitude,
              longitude: region.longitude,
            })
          }
        />
        <View style={styles.markerView}>
          <Image
            style={styles.marker}
            source={require('../../assets/icons/map-marker.jpeg')}
          />
        </View>
      </View>
      <Button
        style={styles.submitButton}
        loading={props.isLoading}
        onPress={() => onSubmit()}>
        Submit
      </Button>
    </View>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  _id: makeSelectId(),
  name: makeSelectName(),
  bio: makeSelectBio(),
  avatar: makeSelectAvatar(),
  avatarType: makeSelectAvatarType(),
  address: makeSelectAddress(),
  latitude: makeSelectLatitude(),
  longitude: makeSelectLongitude(),
  isLoading: makeSelectLoading(),
  complete: makeSelectComplete(),
});

const mapDispatchToProps = (dispatch: any) => ({
  createRestaurant: (payload: any) =>
    dispatch(EnterAddressActions.createRestaurant.request(payload)),
  updateRestaurant: (payload: any) =>
    dispatch(EnterAddressActions.updateRestaurant.request(payload)),
  resetComplete: () => dispatch(EnterAddressActions.resetComplete.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterAddressScreen);
