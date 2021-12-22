import React, {useRef, useState} from 'react';
import {Animated, Image, ToastAndroid} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import Button, {IconButton, TextButton} from '../../components/Button';
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

interface IUpdateProfilePayload {
  username: string | undefined;
  avatar: string | undefined;
  avatarType: string | undefined;
}

interface IProp {
  navigation: StackNavigationHelpers;
  isLoading: boolean;
  updateProfile: (payload: any) => void;
  logout: () => void;
}

const UpdateProfileScreen = (props: IProp) => {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarType, setAvatarType] = useState('');

  const marginTop = useRef(new Animated.Value(50)).current;

  const onFocusUsername = () => {
    Animated.timing(marginTop, {
      toValue: -80,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {});
  };
  const onBlurUsername = () => {
    Animated.timing(marginTop, {
      toValue: 50,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {});
  };

  const onUpdateProfile = () => {
    if (!username) {
      ToastAndroid.show('Enter username!', ToastAndroid.SHORT);
      return;
    }
    const payload: IUpdateProfilePayload = {
      username: undefined,
      avatar: undefined,
      avatarType: undefined,
    };
    payload.username = username;
    if (avatar) {
      payload.avatar = avatar;
    }
    if (avatarType) {
      payload.avatarType = avatarType;
    }
    props.updateProfile(payload);
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

  return (
    <View style={styles.background}>
      <Row style={styles.topRow}>
        <TextButton
          style={styles.logoutButton}
          textStyle={styles.logoutButtonText}
          onPress={() => props.logout()}>
          Logout
        </TextButton>
      </Row>
      <Text style={styles.title}>Update profile</Text>
      <Text style={styles.description}>Update your display profile</Text>
      <Animated.View style={{...styles.contentContainer, marginTop}}>
        <Image
          style={styles.avatar}
          source={
            avatar === ''
              ? require('../../assets/images/avatar-default.png')
              : {uri: avatar}
          }
          height={200}
          width={200}
        />
        <IconButton
          style={styles.changeAvatarBtn}
          name={'camera-reverse-outline'}
          color={Colors.background}
          size={32}
          underlayColor={Colors.primary}
          onPress={onPickImage}
        />
        <TextInput
          style={styles.usernameInput}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          onFocus={onFocusUsername}
          onBlur={onBlurUsername}
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
