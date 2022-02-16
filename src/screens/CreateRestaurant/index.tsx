import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Keyboard,
  ToastAndroid,
  KeyboardEvent,
} from 'react-native';
import {connect} from 'react-redux';
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

interface IProp {
  navigation: StackNavigationHelpers;
  name: string;
  avatar: string;
  bio: string;
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
      name,
      bio,
      avatar,
      avatarType,
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
      <Text style={styles.title}>Create restaurant</Text>
      <Text style={styles.description}>Create your restaurant</Text>
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

const mapDispatchToProps = (dispatch: any) => ({
  setRestaurantProfile: (payload: any) =>
    dispatch(EnterAddressActions.setRestaurantProfile.request(payload)),
});

export default connect(null, mapDispatchToProps)(CreateRestaurantScreen);
