// @flow

import React from 'react';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

type Props = {
  navigation: {
    state: {
      routeName: string,
    },
  },
}

const screens = {
  Home: {
    screen: HomeScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
};

const options = {
  navigationOptions: (props: Props) => {
    const { navigation } = props;

    return ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;

        let iconName;

        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios' ? `ios-calendar${focused ? '' : '-outline'}` : 'md-calendar';
            break;
          case 'Settings':
            iconName =
              Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options';
            break;
          default: '';
        }

        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? '#00c26b' : '#989898'}
          />
        );
      },
    });
  },
  tabBarOptions: {
    activeTintColor: '#00c26b',
  },
  animationEnabled: true,
  swipeEnabled: false,
};

export default createBottomTabNavigator(screens, options);