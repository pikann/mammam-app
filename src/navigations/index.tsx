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
import {
  horizontalIOSOption,
  verticalIOSOption,
  verticalSlideOption,
} from './animation';
import PostScreen from '../screens/Post';
import CameraScreen from '../screens/Camera';
import PasswordScreen from '../screens/Password';
import WatchingScreen from '../screens/Watching';
import SearchScreen from '../screens/Search';
import UserRestaurantScreen from '../screens/UserRestaurant';
import CreateRestaurantScreen from '../screens/CreateRestaurant';
import EnterAddressScreen from '../screens/EnterAddress';
import RestaurantScreen from '../screens/Restaurant';

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
      ) : (
        <Stack.Navigator initialRouteName={Navigations.Authenticated}>
          <Stack.Screen
            name={Navigations.Authenticated}
            component={AuthenticatedNav}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Screens.Camera}
            component={CameraScreen}
            options={verticalIOSOption}
          />
          <Stack.Screen
            name={Screens.Post}
            component={PostScreen}
            options={horizontalIOSOption}
          />
          <Stack.Screen
            name={Screens.UpdateProfile}
            component={UpdateProfileScreen}
            options={horizontalIOSOption}
          />
          <Stack.Screen
            name={Screens.Password}
            component={PasswordScreen}
            options={horizontalIOSOption}
          />
          <Stack.Screen
            name={Screens.Watching}
            component={WatchingScreen}
            options={horizontalIOSOption}
          />
          <Stack.Screen
            name={Screens.Search}
            component={SearchScreen}
            options={horizontalIOSOption}
          />
          <Stack.Screen
            name={Screens.UserRestaurant}
            component={UserRestaurantScreen}
            options={horizontalIOSOption}
          />
          <Stack.Screen
            name={Screens.CreateRestaurant}
            component={CreateRestaurantScreen}
            options={horizontalIOSOption}
          />
          <Stack.Screen
            name={Screens.EnterAddress}
            component={EnterAddressScreen}
            options={verticalSlideOption}
          />
          <Stack.Screen
            name={Screens.Restaurant}
            component={RestaurantScreen}
            options={horizontalIOSOption}
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
