import React from 'react';
import { StackNavigator } from 'react-navigation';
import store from 'react-native-simple-store';

import MainTabNavigator from './MainTabNavigator';
import GroupsScreen from '../screens/GroupsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const screens = {
  Welcome: {
    screen: WelcomeScreen,
  },
  Groups: {
    screen: GroupsScreen,
  },
  Main: {
    screen: MainTabNavigator,
  },
};

const options = {
  navigationOptions: () => ({
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: 'normal',
    },
    headerStyle: {
      backgroundColor: '#eee',
    },
  }),
};

type Props = {
  screenProps: Object,
};

// check async storage if it has data
(async () => {
  const data = await store.get('data');

  if (data !== null) {
    options.initialRouteName = 'Main';
    options.screenProps = {
      data,
    };
  } else {
    options.initialRouteName = 'Welcome';
    options.screenProps = {};
  }
})();

const RootStackNavigator = ({ screenProps }: Props) => {
  const CustomNavigator = StackNavigator(screens, options);

  return (
    <CustomNavigator screenProps={{
        ...screenProps,
        ...options.screenProps,
      }}
    />
  );
};

const RootNavigator = ({ screenProps }: Props) => (
  <RootStackNavigator screenProps={screenProps} />
);

export default RootNavigator;
