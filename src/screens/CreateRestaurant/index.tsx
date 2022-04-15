import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Keyboard,
  ToastAndroid,
  KeyboardEvent,
} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {launchImageLibrary} from 'react-native-image-picker';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import * as EnterAddressActions from '../EnterAddress/store/actions';
import Button, {BackButton, IconButton} from '../../components/Button';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import View, {Row} from '../../components/View';
import Colors from '../../constants/Colors';
import {styles} from './styles';
import Screens from '../../constants/Screens';
import {
  makeSelectAddress,
  makeSelectAvatar,
  makeSelectBio,
  makeSelectId,
  makeSelectLatitude,
  makeSelectLongitude,
  makeSelectName,
} from './store/selectors';

interface IProp {
  navigation: StackNavigationHelpers;
  _id: string;
  name: string;
  avatar: string;
  bio: string;
  address: string;
  latitude: string;
  longitude: string;
  setRestaurantProfile: (payload: any) => void;
}

const CreateRestaurantScreen = (props: IProp) => {
  const [name, setName] = useState(props.name || '');
  const [bio, setBio] = useState(props.bio || '');
  const [avatar, setAvatar] = useState('');
  const [avatarType, setAvatarType] = useState('');

  const top = useRef(new Animated.Value(200)).current;

  const onNext = () => {
    if (!name || name === '') {
      ToastAndroid.show('Enter name!', ToastAndroid.SHORT);
      return;
    }

    props.setRestaurantProfile({
      _id: props._id,
      name,
      bio,
      avatar,
      avatarType,
      address: props.address,
      latitude: props.latitude,
      longitude: props.longitude,
    });

    props.navigation.navigate(Screens.EnterAddress);
  };

  const onPickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });
    if (result?.assets && result.assets[0].uri && result.assets[0].type) {
      setAvatar(result.assets[0].uri);
      setAvatarType(result.assets[0].type);
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      (e: KeyboardEvent) => {
        Animated.timing(top, {
          toValue: 200 - e.endCoordinates.height,
          duration: 400,
          useNativeDriver: false,
        }).start(() => {});
      },
    );
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(top, {
        toValue: 200,
        duration: 400,
        useNativeDriver: false,
      }).start(() => {});
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [top]);

  return (
    <View style={styles.background}>
      <Row style={styles.topRow}>
        <BackButton
          style={styles.backButton}
          onPress={() => props.navigation.goBack()}
        />
      </Row>
      <Text style={styles.title}>
        {props._id === '' ? 'Create restaurant' : 'Modify restaurant'}
      </Text>
      <Text style={styles.description}>
        {props._id === '' ? 'Create your restaurant' : 'Modify your restaurant'}
      </Text>
      <Animated.View style={{...styles.contentContainer, top}}>
        <Image
          style={styles.avatar}
          source={
            avatar === ''
              ? props.avatar === ''
                ? require('../../assets/images/avatar-default.png')
                : {uri: props.avatar}
              : {uri: avatar}
          }
          height={150}
          width={150}
        />
        <IconButton
          style={styles.changeAvatarBtn}
          name={'camera-reverse-outline'}
          color={Colors.background}
          size={25}
          underlayColor={Colors.primary}
          onPress={onPickImage}
        />
        <TextInput
          style={styles.usernameInput}
          placeholder="Name"
          defaultValue={props.name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.bioInput}
          placeholder="Bio"
          multiline={true}
          numberOfLines={4}
          defaultValue={props.bio}
          onChangeText={text => setBio(text)}
        />
        <Button style={styles.submitButton} onPress={() => onNext()}>
          Next
        </Button>
      </Animated.View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  _id: makeSelectId(),
  name: makeSelectName(),
  bio: makeSelectBio(),
  avatar: makeSelectAvatar(),
  address: makeSelectAddress(),
  latitude: makeSelectLatitude(),
  longitude: makeSelectLongitude(),
});

const mapDispatchToProps = (dispatch: any) => ({
  setRestaurantProfile: (payload: any) =>
    dispatch(EnterAddressActions.setRestaurantProfile.request(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateRestaurantScreen);
