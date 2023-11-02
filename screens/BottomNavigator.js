import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TransitionPresets } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import AlarmScreen from './AlarmScreen';
import ListScreen from './ListScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
  screenOptions={{
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    cardStyle: { backgroundColor: 'transparent' },
    tabBarStyle: {
      // Add styles for the tab bar
      backgroundColor: 'white', // Change this to your preferred color
      borderTopWidth: 0,
      elevation: 0,
    },
    tabBarItemStyle: {
      // Add styles for the tab items
      justifyContent: 'center',
      alignItems: 'center',
    },
    transitionSpec: {
      open: TransitionPresets.SlideFromRightIOS,
      close: TransitionPresets.SlideToRightIOS,
    },
  }}
>
    <Tab.Screen
      name="Dashboard"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Calendar"
      component={AlarmScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings" color={color} size={size} />
        ),
      }}
    />
     <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={size} />
        ),
      }}
    />
   
    <Tab.Screen
      name="List"
      component={ListScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="list" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;