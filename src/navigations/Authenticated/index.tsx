import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Screens from '../../constants/Screens';
import HomeScreen from '../../screens/Home';
import MapScreen from '../../screens/Map';
import RestaurantScreen from '../../screens/Restaurant';
import MeScreen from '../../screens/Me';
import Colors from '../../constants/Colors';
import PostScreen from '../../screens/Post';
import View from '../../components/View';
import {styles} from './styles';

const AuthenticatedNav = () => {
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
        component={PostScreen}
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
        name={Screens.Me}
        component={MeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthenticatedNav;
