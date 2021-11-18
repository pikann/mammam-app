import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, Image} from 'react-native';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import Button from '../../components/Button';
import Text from '../../components/Text';
import View, {Row} from '../../components/View';
import Screens from '../../constants/Screens';
import {styles} from './styles';

interface IProp {
  navigation: StackNavigationHelpers;
}

export default function WelcomeScreen(props: IProp) {
  let disabled = useRef(true);
  const {width, height} = Dimensions.get('window');
  const top = useRef(new Animated.Value(height - 0.65 * width)).current;
  const left = useRef(new Animated.Value(-0.35 * width)).current;
  const borderRadius = useRef(new Animated.Value(0.35 * height)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(borderRadius, {
        toValue: 50,
        duration: 700,
        useNativeDriver: false,
      }).start(() => {
        disabled.current = false;
      });
      Animated.timing(top, {
        toValue: height - 0.55 * width,
        duration: 400,
        useNativeDriver: false,
      }).start();
      Animated.timing(left, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();
      Animated.timing(fade, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }).start();
    }, 3000);
  });

  return (
    <View style={styles.background}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      />
      <Text style={styles.appName}>MamMam</Text>
      <Text style={styles.description}>FOOD IMAGE AND VIDEO COLLECTION</Text>
      <View style={{...styles.decorateCircle, ...styles.decorateCircle1}} />
      <Animated.View
        style={{
          ...styles.decorateCircle,
          ...styles.decorateCircle2,
          borderRadius,
          top,
          left,
        }}>
        <Animated.View style={{...styles.welcomeContent, opacity: fade}}>
          <Text style={styles.welcomeTitle}>Welcome</Text>
          <Text style={styles.welcomeDescription}>
            Sign in to use the application
          </Text>
          <Row>
            <Button
              style={styles.signInButton}
              onPress={() => {
                if (!disabled.current) {
                  props.navigation.navigate(Screens.Login);
                }
              }}>
              Sign In
            </Button>
            <Button
              style={styles.signUpButton}
              underlayColor="#DDDDDD"
              textChildrenStyle={styles.signUpButtonText as {}}
              onPress={() => {
                if (!disabled.current) {
                  props.navigation.navigate(Screens.Register);
                }
              }}>
              Sign Up
            </Button>
          </Row>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
