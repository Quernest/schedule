import React, { PureComponent } from 'react';

import { 
  Font,
  AppLoading
} from 'expo';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';

import moment from 'moment';
import ru from 'moment/locale/ru';
moment.locale('ru');

import Calendar from '../components/Calendar';
import Events from '../components/Events';

import test from '../../API/it-14-1.json'; // testing JSON

const filterEvents = (date) => {
  const {
    startOfSemester,
    firstWeekType,
    schedule,
  } = test;
  const start = moment(startOfSemester, 'DD/MM/YYYY');
  const selectedDate = moment(date, 'DD/MM/YYYY');
  const days = []
  const day = 1;
  const current = start.clone();
  const odd  = '*';
  const even = '/';

  let currentWeek;
  let i = 1;

  while (current.day(7 + day).isBefore(selectedDate)) {
    i++;
    days.push(current.clone());
  }

  if (i % 2 !== 0) {
    currentWeek = firstWeekType === odd ? odd : even;
  } else {
    currentWeek = firstWeekType === even ? odd : even;
  }

  return schedule[currentWeek].filter(_ => {
    return _.day.toLowerCase() === date.format('dddd');
  });
};

class Schedule extends PureComponent {
  static navigationOptions = {
    header: null
  };

  state = {
    isReady: false,
    events: filterEvents(moment()),
    selectedDate: moment(),
  };

  _onSelectDate = (date) => {
    this.setState({
      events: filterEvents(date),
      selectedDate: date
    });
  };

  render() {
    const {
      selectedDate,
      isReady,
      events,
    } = this.state;

    const {
      navigation: {
        navigate
      },
    } = this.props;

    if (!isReady) {
      return (
        <AppLoading
         startAsync={this._loadFontsAsync}
         onFinish={() => this.setState({ isReady: true })}
         onError={console.warn}
        />
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Calendar
          showDaysAfterCurrent={13}
          onSelectDate={this._onSelectDate} 
        />
        <Events
          events={events}
          navigate={navigate}
          selectedDate={selectedDate}
        />
      </View>
    );
  }

  async _loadFontsAsync() {
    await Font.loadAsync({
      'RobotoCondensed-Regular': require('../../assets/fonts/RobotoCondensed-Regular.ttf'),
      'RobotoCondensed-Bold': require('../../assets/fonts/RobotoCondensed-Bold.ttf'),
      'RobotoCondensed-Light': require('../../assets/fonts/RobotoCondensed-Light.ttf')
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F53B1'
  },
});

export default Schedule;