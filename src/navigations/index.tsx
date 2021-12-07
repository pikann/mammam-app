import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {TransitionSpec} from '@react-navigation/stack/lib/typescript/src/types';
import {connect} from 'react-redux';

import WelcomeScreen from '../screens/Welcome';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import Screens from '../constants/Screens';
import UpdateProfileScreen from '../screens/UpdateProfile';
import {verticalSlide} from '../utils/navigationsAnimation';
import {createStructuredSelector} from 'reselect';
import {makeSelectLogin, makeSelectUsername} from '../store/selectors';
import * as AppActions from '../store/actions';
import HomeScreen from '../screens/Home';

const Stack = createStackNavigator();

interface IProp {
  login: boolean;
  username: string;
  checkLogin: () => void;
}

const config = {
  animation: 'timing',
  config: {
    duration: 500,
  },
} as TransitionSpec;

const AppNavContainer = (props: IProp) => {
  useEffect(() => {
    setTimeout(() => {
      props.checkLogin();
    }, 2000);
  });

  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      {!props.login ? (
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
        </Stack.Navigator>
      ) : props.username === '' ? (
        <Stack.Navigator initialRouteName={Screens.UpdateProfile}>
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
      ) : (
        <Stack.Navigator initialRouteName={Screens.Home}>
          <Stack.Screen
            name={Screens.Home}
            component={HomeScreen}
            options={{
              headerShown: false,
              cardStyleInterpolator: verticalSlide,
              transitionSpec: {
                open: config,
                close: config,
              },
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  login: makeSelectLogin(),
  username: makeSelectUsername(),
});

const mapDispatchToProps = (dispatch: any) => ({
  checkLogin: () => dispatch(AppActions.checkLogin.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppNavContainer);
