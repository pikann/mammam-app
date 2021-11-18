import React, {useState} from 'react';
import {Image, ToastAndroid, View as DefaultView} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import * as LoginActions from './store/actions';
import Button, {BackButton, TextButton} from '../../components/Button';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import View, {Row} from '../../components/View';
import Screens from '../../constants/Screens';
import {styles} from './styles';
import {makeSelectLoading} from './store/selectors';

interface IProp {
  navigation: StackNavigationHelpers;
  isLoading: boolean;
  login: (payload: any) => void;
}

const LoginScreen = (props: IProp) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (!email) {
      ToastAndroid.show('Enter email!', ToastAndroid.SHORT);
      return;
    }
    if (!password) {
      ToastAndroid.show('Enter password!', ToastAndroid.SHORT);
      return;
    }
    props.login({email, password});
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
          onPress={() => props.navigation.navigate(Screens.Register)}>
          Register
        </TextButton>
      </Row>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.description}>Sign in to use the application</Text>
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
        <TextButton
          style={styles.forgotPassButton}
          textStyle={styles.forgotButtonText}
          onPress={() => console.log('Forgot password?')}>
          Forgot password?
        </TextButton>
        <Button
          style={styles.signInButton}
          loading={props.isLoading}
          onPress={() => onLogin()}>
          Sign In
        </Button>
        <Button
          style={styles.loginGoogleBtn}
          underlayColor="transparent"
          onPress={() => console.log('Sign In')}>
          <DefaultView>
            <Row style={styles.loginRow}>
              <Image
                style={styles.loginGoogleLogo}
                source={require('../../assets/images/logo-google.png')}
              />
              <Text style={styles.loginGoogleText}>Continue with Google</Text>
            </Row>
          </DefaultView>
        </Button>
        <Button
          style={styles.loginFacebookBtn}
          underlayColor="#1877F2AA"
          onPress={() => console.log('Sign In')}>
          <DefaultView>
            <Row style={styles.loginRow}>
              <Image
                style={styles.loginFacebookLogo}
                source={require('../../assets/images/logo-facebook.png')}
              />
              <Text style={styles.loginFacebookText}>
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
  login: (payload: any) => dispatch(LoginActions.login.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
