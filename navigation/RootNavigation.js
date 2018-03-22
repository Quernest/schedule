import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import SizeConstants from '../constants/Sizes';
import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import GroupsScreen from '../screens/GroupsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const { fontSizeLarge } = SizeConstants;

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
        fontSize: fontSizeLarge,
        fontWeight: 'normal',
      },
      headerStyle: {
        backgroundColor: '#eee',
      },
    }),
  },
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
