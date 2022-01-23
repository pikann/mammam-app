import React from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import Screens from '../../constants/Screens';
import HomeScreen from '../../screens/Home';
import MapScreen from '../../screens/Map';
import RestaurantScreen from '../../screens/Restaurant';
import UserScreen from '../../screens/User';
import Colors from '../../constants/Colors';
import View from '../../components/View';
import {styles} from './styles';
import CameraScreen from '../../screens/Camera';
import {
  makeSelectAvatar,
  makeSelectBio,
  makeSelectId,
  makeSelectUsername,
} from '../../store/selectors';
import * as UserActions from '../../screens/User/store/actions';

interface IProp {
  navigation: StackNavigationHelpers;
  userId: string;
  username: string;
  avatar: string;
  bio: string;
  setUserInfo: (payload: any) => void;
}

const AuthenticatedNav = ({
  navigation,
  userId,
  username,
  avatar,
  bio,
  setUserInfo,
}: IProp) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textGray,
        tabBarStyle: {backgroundColor: Colors.background, height: 55},
      }}>
      <Tab.Screen
        name={Screens.Home}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={Screens.Map}
        component={MapScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="map" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={Screens.Post}
        component={CameraScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({size}) => (
            <View style={styles.addButton}>
              <Icon
                style={styles.addIcon}
                name="add"
                color={Colors.background}
                size={size}
              />
            </View>
          ),
          unmountOnBlur: true,
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              onPress={() => navigation.navigate(Screens.Camera)}
              activeOpacity={0.9}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.Restaurant}
        component={RestaurantScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="restaurant" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={Screens.User}
        component={UserScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
          unmountOnBlur: true,
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                setUserInfo({
                  userId,
                  username,
                  avatar,
                  bio,
                });
                navigation.navigate(Screens.User);
              }}
              activeOpacity={0.9}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  userId: makeSelectId(),
  username: makeSelectUsername(),
  avatar: makeSelectAvatar(),
  bio: makeSelectBio(),
});

const mapDispatchToProps = (dispatch: any) => ({
  setUserInfo: (payload: any) =>
    dispatch(UserActions.setUserInfo.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedNav);
