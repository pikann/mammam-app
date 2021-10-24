import React from 'react';
import {Image, View as DefaultView} from 'react-native';

import Button, {BackButton, TextButton} from '../../components/Button';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import View, {Row} from '../../components/View';
import Screens from '../../constants/Screens';
import {styles} from './styles';

export default function LoginScreen({navigation}: any) {
  return (
    <View style={styles.background}>
      <Row style={styles.topRow}>
        <BackButton
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
        <TextButton
          style={styles.registerButton}
          textStyle={styles.registerButtonText}
          onPress={() => navigation.navigate(Screens.Register)}>
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
        />
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextButton
          style={styles.forgotPassButton}
          textStyle={styles.forgotButtonText}
          onPress={() => console.log('Forgot password?')}>
          Forgot password?
        </TextButton>
        <Button
          style={styles.signInButton}
          onPress={() => console.log('Sign In')}>
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
}
