import React from 'react';
import { Font } from 'expo';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import moment from 'moment';
import ru from 'moment/locale/ru';
moment.locale('ru');

import {
  filterEvents
} from './app/helpers/helpers';

import Calendar from './app/components/Calendar';
import Events from './app/components/Events';

import {
  APP_BACKGROUND_COLOR,
  IOS_TOP_PADDING,
  ANDROID_TOP_PADDING
} from './app/helpers/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? IOS_TOP_PADDING : ANDROID_TOP_PADDING,
    backgroundColor: APP_BACKGROUND_COLOR
  },
});

export default class App extends React.Component {
  state = {
    isReady: false,
    events: filterEvents(moment()),
  };

  async componentDidMount() {
    await Font.loadAsync({
      'RobotoCondensed-Regular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
      'RobotoCondensed-Bold'   : require('./assets/fonts/RobotoCondensed-Bold.ttf'),
      'RobotoCondensed-Light'  : require('./assets/fonts/RobotoCondensed-Light.ttf'),
      'RobotoCondensed-Italic' : require('./assets/fonts/RobotoCondensed-Italic.ttf')
    })

    this.setState({ isReady: true });
  }

  onSelectDate = (date) => {
    this.setState({ events: filterEvents(date)});
  };

  render() {
    const { events } = this.state;
    const { isReady } = this.state;

    return (
      isReady && <View style={styles.container}>
        <Calendar
          showDaysAfterCurrent={13}
          onSelectDate={this.onSelectDate} 
        />
        <Events
          events={events}
        />
      </View>
    );
  }
}
