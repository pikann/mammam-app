import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Image, ToastAndroid, View as DefaultView} from 'react-native';
import {createStructuredSelector} from 'reselect';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import * as RegisterActions from './store/actions';
import Button, {BackButton, TextButton} from '../../components/Button';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import View, {Row} from '../../components/View';
import Screens from '../../constants/Screens';
import {makeSelectLoading} from './store/selectors';
import {styles} from './styles';

interface IProp {
  navigation: StackNavigationHelpers;
  isLoading: boolean;
  register: (payload: any) => void;
}

const RegisterScreen = (props: IProp) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onRegister = () => {
    if (!email) {
      ToastAndroid.show('Enter email!', ToastAndroid.SHORT);
      return;
    }
    if (!password) {
      ToastAndroid.show('Enter password!', ToastAndroid.SHORT);
      return;
    }
    if (!confirmPassword) {
      ToastAndroid.show('Enter confirm password!', ToastAndroid.SHORT);
      return;
    }
    if (password !== confirmPassword) {
      ToastAndroid.show('Passwords didn’t match!', ToastAndroid.SHORT);
      return;
    }
    props.register({email, password});
  };
  return (
    <View style={styles.background}>
      <Row style={styles.topRow}>
        <BackButton
          style={styles.backButton}
          onPress={() => props.navigation.goBack()}
        />
        <TextButton
          style={styles.registerButton}
          textStyle={styles.registerButtonText}
          onPress={() => props.navigation.navigate(Screens.Login)}>
          Login
        </TextButton>
      </Row>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.description}>Sign up to use the application</Text>
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.emailInput}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm password"
          secureTextEntry={true}
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
        />
        <Button
          style={styles.signInButton}
          loading={props.isLoading}
          onPress={() => onRegister()}>
          Register
        </Button>
        <Button
          style={styles.registerGoogleBtn}
          underlayColor="transparent"
          onPress={() => console.log('Register')}>
          <DefaultView>
            <Row style={styles.registerRow}>
              <Image
                style={styles.registerGoogleLogo}
                source={require('../../assets/images/logo-google.png')}
              />
              <Text style={styles.registerGoogleText}>
                Continue with Google
              </Text>
            </Row>
          </DefaultView>
        </Button>
        <Button
          style={styles.registerFacebookBtn}
          underlayColor="#1877F2AA"
          onPress={() => console.log('Register')}>
          <DefaultView>
            <Row style={styles.registerRow}>
              <Image
                style={styles.registerFacebookLogo}
                source={require('../../assets/images/logo-facebook.png')}
              />
              <Text style={styles.registerFacebookText}>
                Continue with Facebook
              </Text>
            </Row>
          </DefaultView>
        </Button>
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  isLoading: makeSelectLoading(),
});

const mapDispatchToProps = (dispatch: any) => ({
  register: (payload: any) =>
    dispatch(RegisterActions.register.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
