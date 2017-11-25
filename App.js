import {StackNavigator} from 'react-navigation';

import Selection from './app/screens/Selection';
import Schedule  from './app/screens/Schedule';
import Details   from './app/screens/Details';

export default Navigation = StackNavigator({
  Selection: {
    screen: Selection
  },
  Schedule: {
    screen: Schedule
  },
  Details: {
    screen: Details
  }
}, {
  initialRouteName: 'Schedule'
});