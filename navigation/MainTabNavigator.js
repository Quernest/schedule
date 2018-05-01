// @flow

import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  TabNavigator,
  TabBarBottom,
} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

type Props = {
  navigation: {
    state: {
      routeName: string,
    },
  },
}

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },

    Settings: {
      screen: SettingsScreen,
    },
  },
  {
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
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
  },
);
