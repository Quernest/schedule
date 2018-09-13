// @flow
import React from 'react';
import { Platform } from 'react-native';
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BootstrapScreen from '../screens/BootstrapScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import GroupsScreen from '../screens/GroupsScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

type Props = {
  navigation: {
    state: {
      routeName: string,
    },
  },
}

const AuthStackNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  Groups: {
    screen: GroupsScreen,
    navigationOptions: () => ({
      headerTintColor: '#f9ffff',
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#f9ffff',
      },
      headerStyle: {
        backgroundColor: '#38498c',
      },
    }),
  },
});

const AppStackNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  Settings: {
    screen: SettingsScreen,
  },
}, {
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
});

const Navigator = createSwitchNavigator({
  Bootstrap: BootstrapScreen,
  Auth: AuthStackNavigator,
  App: AppStackNavigator,
}, {
  initialRouteName: 'Bootstrap',
});

export default Navigator;
