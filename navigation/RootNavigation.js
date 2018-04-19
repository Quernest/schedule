import React from 'react';
import { StackNavigator } from 'react-navigation';
import SizeConstants from '../constants/Sizes';
import MainTabNavigator from './MainTabNavigator';
import GroupsScreen from '../screens/GroupsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const { fontSizeLarge } = SizeConstants;

const RootStackNavigator = StackNavigator(
  {
    // Welcome: {
    //   screen: WelcomeScreen,
    // },
    // Groups: {
    //   screen: GroupsScreen,
    // },
    Main: {
      screen: MainTabNavigator,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontSize: fontSizeLarge,
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
