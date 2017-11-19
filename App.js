import MainScreen from './app/screens/MainScreen';
import SecondScreen from './app/screens/SecondScreen';
import ThirdScreen from './app/screens/ThirdScreen';

import {
  StackNavigator
} from 'react-navigation';

const Navigation = StackNavigator({
  MainScreen: {
    screen: MainScreen
  },
  Second: {
    screen: SecondScreen
  },
  Third: {
    screen: ThirdScreen
  }
}, {
  initialRouteName: 'Second'
});

export default Navigation;