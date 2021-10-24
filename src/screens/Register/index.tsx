import React from 'react';
import {Image, View as DefaultView} from 'react-native';

import Button, {BackButton, TextButton} from '../../components/Button';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import View, {Row} from '../../components/View';
import Screens from '../../constants/Screens';
import {styles} from './styles';

export default function RegisterScreen({navigation}: any) {
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
          onPress={() => navigation.navigate(Screens.Login)}>
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
        />
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm password"
          secureTextEntry={true}
        />
        <Button
          style={styles.signInButton}
          onPress={() => console.log('Register')}>
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
}
