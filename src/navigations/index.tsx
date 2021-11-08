import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {TransitionSpec} from '@react-navigation/stack/lib/typescript/src/types';

import WelcomeScreen from '../screens/Welcome';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import Screens from '../constants/Screens';
import UpdateProfileScreen from '../screens/UpdateProfile';
import {verticalSlide} from '../utils/navigationsAnimation';

const Stack = createStackNavigator();

const config = {
  animation: 'timing',
  config: {
    duration: 500,
  },
} as TransitionSpec;

const AppNavContainer = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Stack.Navigator initialRouteName={Screens.Welcome}>
        <Stack.Screen
          name={Screens.Welcome}
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Screens.Login}
          component={LoginScreen}
          options={{
            headerShown: false,
            cardStyleInterpolator: verticalSlide,
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
        <Stack.Screen
          name={Screens.Register}
          component={RegisterScreen}
          options={{
            headerShown: false,
            cardStyleInterpolator: verticalSlide,
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
        <Stack.Screen
          name={Screens.UpdateProfile}
          component={UpdateProfileScreen}
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavContainer;
