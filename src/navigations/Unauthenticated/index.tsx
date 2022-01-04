import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Screens from '../../constants/Screens';
import WelcomeScreen from '../../screens/Welcome';
import LoginScreen from '../../screens/Login';
import RegisterScreen from '../../screens/Register';
import {verticalSlideOption} from '../animation';

const UnauthenticatedNav = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={Screens.Welcome}>
      <Stack.Screen
        name={Screens.Welcome}
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Screens.Login}
        component={LoginScreen}
        options={verticalSlideOption}
      />
      <Stack.Screen
        name={Screens.Register}
        component={RegisterScreen}
        options={verticalSlideOption}
      />
    </Stack.Navigator>
  );
};

export default UnauthenticatedNav;
