import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import Screens from '../../constants/Screens';
import HomeScreen from '../../screens/Home';
import MapScreen from '../../screens/Map';
import NotificationScreen from '../../screens/Notification';
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
import {makeSelectNotificationsCount} from '../../screens/Notification/store/selectors';
import * as UserActions from '../../screens/User/store/actions';
import * as NotificationActions from '../../screens/Notification/store/actions';
import Text from '../../components/Text';
import SocketClientInstance from '../../utils/socket';
import {INotification} from '../../screens/Notification/store/interfaces/notification';

interface IProp {
  navigation: StackNavigationHelpers;
  userId: string;
  username: string;
  avatar: string;
  bio: string;
  notificationsCount: number;
  setUserInfo: (payload: any) => void;
  getNotificationCount: () => void;
  appendRealtimeNotification: (notification: INotification) => void;
}

const AuthenticatedNav = ({
  navigation,
  userId,
  username,
  avatar,
  bio,
  notificationsCount,
  setUserInfo,
  getNotificationCount,
  appendRealtimeNotification,
}: IProp) => {
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    const onMessage = (payload: any) => {
      appendRealtimeNotification(payload);
    };

    SocketClientInstance.setOnMessage(onMessage);
  }, [appendRealtimeNotification]);

  useEffect(() => {
    getNotificationCount();
  }, [getNotificationCount, userId]);

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
        name={Screens.Notification}
        component={NotificationScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <View>
              <Icon name="notifications" color={color} size={size} />
              {notificationsCount > 0 ? (
                <Text style={styles.notificationText}>
                  {'' + notificationsCount}
                </Text>
              ) : (
                <View />
              )}
            </View>
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
  notificationsCount: makeSelectNotificationsCount(),
});

const mapDispatchToProps = (dispatch: any) => ({
  setUserInfo: (payload: any) =>
    dispatch(UserActions.setUserInfo.request(payload)),
  getNotificationCount: () =>
    dispatch(NotificationActions.getNotificationCount.request()),
  appendRealtimeNotification: (notification: INotification) =>
    dispatch(
      NotificationActions.appendRealtimeNotification.request(notification),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedNav);
