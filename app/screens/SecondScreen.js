import React from 'react';

import { 
  Font,
  Constants
} from 'expo';

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
} from '../helpers/helpers';

import Calendar from '../components/Calendar';
import Events from '../components/Events';

import {
  APP_BACKGROUND_COLOR,
} from '../helpers/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? 0 : Constants.statusBarHeight,
    backgroundColor: APP_BACKGROUND_COLOR
  },
});

export default class SecondScreen extends React.Component {
  static navigationOptions = {
    title: 'Second Screen',
    header: null
  };

  state = {
    isReady: false,
    events: filterEvents(moment()),
    selectedDate: moment(),
  };

  async componentDidMount() {
    await Font.loadAsync({
      'RobotoCondensed-Regular': require('../../assets/fonts/RobotoCondensed-Regular.ttf'),
      'RobotoCondensed-Bold'   : require('../../assets/fonts/RobotoCondensed-Bold.ttf'),
      'RobotoCondensed-Light'  : require('../../assets/fonts/RobotoCondensed-Light.ttf'),
      'RobotoCondensed-Italic' : require('../../assets/fonts/RobotoCondensed-Italic.ttf')
    })

    this.setState({ isReady: true });
  }

  onSelectDate = (date) => {
    this.setState({ events: filterEvents(date), selectedDate: date });
  };

  render() {
    const { isReady, events, selectedDate } = this.state;
    const { navigate } = this.props.navigation;

    return (
      isReady && <View style={styles.container}>
        <Calendar
          showDaysAfterCurrent={13}
          onSelectDate={this.onSelectDate} 
        />
        <Events
          events={events}
          navigate={navigate}
          selectedDate={selectedDate}
        />
      </View>
    );
  }
}