import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Keyboard,
  ToastAndroid,
  KeyboardEvent,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import Button, {
  BackButton,
  IconButton,
  TextButton,
} from '../../components/Button';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import View, {Row} from '../../components/View';
import Colors from '../../constants/Colors';
import {styles} from './styles';
import * as UpdateProfileActions from './store/actions';
import * as AppActions from '../../store/actions';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectLoading} from './store/selectors';
import {
  makeSelectAvatar,
  makeSelectBio,
  makeSelectUsername,
} from '../../store/selectors';
import Screens from '../../constants/Screens';

interface IUpdateProfilePayload {
  username: string | undefined;
  bio: string | undefined;
  avatar: string | undefined;
  avatarType: string | undefined;
}

interface IProp {
  navigation: StackNavigationHelpers;
  username: string;
  avatar: string;
  bio: string;
  isLoading: boolean;
  updateProfile: (payload: any) => void;
  logout: () => void;
}

const UpdateProfileScreen = (props: IProp) => {
  const [username, setUsername] = useState(props.username);
  const [bio, setBio] = useState(props.bio);
  const [avatar, setAvatar] = useState('');
  const [avatarType, setAvatarType] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  const top = useRef(new Animated.Value(200)).current;

  const onUpdateProfile = () => {
    if (!username) {
      ToastAndroid.show('Enter username!', ToastAndroid.SHORT);
      return;
    }
    const payload: IUpdateProfilePayload = {
      username: undefined,
      bio: undefined,
      avatar: undefined,
      avatarType: undefined,
    };
    payload.username = username;
    if (bio !== '') {
      payload.bio = bio;
    }
    if (avatar !== '') {
      payload.avatar = avatar;
    }
    if (avatarType !== '') {
      payload.avatarType = avatarType;
    }
    props.updateProfile(payload);
    setIsUpdated(true);
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

  useEffect(() => {
    if (isUpdated) {
      props.navigation.navigate(Screens.Home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.username, props.bio, props.avatar, props.navigation]);

  return (
    <View style={styles.background}>
      <Row style={styles.topRow}>
        {props.username && props.username !== '' ? (
          <BackButton
            style={styles.backButton}
            onPress={() => props.navigation.goBack()}
          />
        ) : (
          <View />
        )}
        {!props.username || props.username === '' ? (
          <TextButton
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
            onPress={() => props.logout()}>
            Logout
          </TextButton>
        ) : (
          <View />
        )}
      </Row>
      <Text style={styles.title}>Update profile</Text>
      <Text style={styles.description}>Update your display profile</Text>
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
          placeholder="Username"
          defaultValue={props.username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.bioInput}
          placeholder="Bio"
          multiline={true}
          numberOfLines={4}
          defaultValue={props.bio}
          onChangeText={text => setBio(text)}
        />
        <Button
          style={styles.submitButton}
          loading={props.isLoading}
          onPress={() => onUpdateProfile()}>
          Submit
        </Button>
      </Animated.View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  username: makeSelectUsername(),
  avatar: makeSelectAvatar(),
  bio: makeSelectBio(),
  isLoading: makeSelectLoading(),
});

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(AppActions.logout.request()),
  updateProfile: (payload: any) =>
    dispatch(UpdateProfileActions.updateProfile.request(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateProfileScreen);
