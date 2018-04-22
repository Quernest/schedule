import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import GroupsScreen from '../screens/GroupsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const RootStackNavigator = StackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen,
    },
    Groups: {
      screen: GroupsScreen,
    },
    Main: {
      screen: MainTabNavigator,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'normal',
      },
      headerStyle: {
        backgroundColor: '#eee',
      },
    }),
  },
);

const RootNavigator = () => <RootStackNavigator />;

export default RootNavigator;
