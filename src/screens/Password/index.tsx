import React, {useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import * as PasswordActions from './store/actions';
import View, {Row} from '../../components/View';
import Text from '../../components/Text';
import {styles} from './styles';
import Button, {BackButton} from '../../components/Button';
import TextInput from '../../components/TextInput';
import {makeSelectLoading, makeSelectUpdated} from './store/selectors';
import Screens from '../../constants/Screens';

interface IProp {
  navigation: StackNavigationHelpers;
  isLoading: boolean;
  isUpdated: boolean;
  updatePassword: (payload: any) => void;
  resetUpdated: () => void;
}

const PasswordScreen = ({
  navigation,
  isLoading,
  isUpdated,
  updatePassword,
  resetUpdated,
}: IProp) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = () => {
    if (!oldPassword) {
      ToastAndroid.show('Enter old password!', ToastAndroid.SHORT);
      return;
    }
    if (!newPassword) {
      ToastAndroid.show('Enter new password!', ToastAndroid.SHORT);
      return;
    }
    if (!confirmPassword) {
      ToastAndroid.show('Enter confirm password!', ToastAndroid.SHORT);
      return;
    }
    if (newPassword !== confirmPassword) {
      ToastAndroid.show('Passwords didn’t match!', ToastAndroid.SHORT);
      return;
    }

    updatePassword({oldPassword, newPassword});
  };

  useEffect(() => {
    resetUpdated();
  });

  useEffect(() => {
    if (isUpdated) {
      navigation.navigate(Screens.User);
    }
  }, [isUpdated, navigation]);

  return (
    <View style={styles.background}>
      <Row style={styles.topRow}>
        <BackButton
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
      </Row>
      <Text style={styles.title}>Update password</Text>
      <Text style={styles.description}>Update your password for login</Text>
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Old password"
          secureTextEntry={true}
          onChangeText={text => setOldPassword(text)}
          value={oldPassword}
        />
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setNewPassword(text)}
          value={newPassword}
        />
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm password"
          secureTextEntry={true}
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
        />
        <Button
          style={styles.submitButton}
          loading={isLoading}
          onPress={() => onSubmit()}>
          Submit
        </Button>
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  isLoading: makeSelectLoading(),
  isUpdated: makeSelectUpdated(),
});

const mapDispatchToProps = (dispatch: any) => ({
  updatePassword: (payload: any) =>
    dispatch(PasswordActions.updatePassword.request(payload)),
  resetUpdated: () => dispatch(PasswordActions.resetUpdated.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordScreen);
