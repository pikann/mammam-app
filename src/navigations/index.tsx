import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

import Screens from '../constants/Screens';
import UpdateProfileScreen from '../screens/UpdateProfile';
import {createStructuredSelector} from 'reselect';
import {makeSelectLogin, makeSelectUsername} from '../store/selectors';
import * as AppActions from '../store/actions';
import UnauthenticatedNav from './Unauthenticated';
import Navigations from '../constants/Navigations';
import AuthenticatedNav from './Authenticated';
import {horizontalIOSOption} from './animation';

const Stack = createStackNavigator();

interface IProp {
  login: boolean;
  username: string;
  checkLogin: () => void;
}

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
        <Stack.Navigator initialRouteName={Navigations.Unauthenticated}>
          <Stack.Screen
            name={Navigations.Unauthenticated}
            component={UnauthenticatedNav}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : props.username === '' ? (
        <Stack.Navigator initialRouteName={Screens.UpdateProfile}>
          <Stack.Screen
            name={Screens.UpdateProfile}
            component={UpdateProfileScreen}
            options={horizontalIOSOption}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName={Navigations.Authenticated}>
          <Stack.Screen
            name={Navigations.Authenticated}
            component={AuthenticatedNav}
            options={{headerShown: false}}
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
