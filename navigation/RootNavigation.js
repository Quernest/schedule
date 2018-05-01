import { StackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import GroupsScreen from '../screens/GroupsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import type { DataType } from '../types';

const createRootNavigator = (data: DataType) => {
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
    initialRouteName: data === null ? 'Welcome' : 'Main',
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
  };

  return StackNavigator(screens, options);
};

export default createRootNavigator;
