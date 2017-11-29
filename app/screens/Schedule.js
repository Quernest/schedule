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
  Button
} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';

import moment from 'moment';
import ru from 'moment/locale/ru';
moment.locale('ru');

import Calendar from '../components/Calendar';
import Events from '../components/Events';

const filterEvents = (date, props) => {
  const {
    startOfSemester,
    firstWeekType,
    schedule,
  } = props;
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
    title: 'Назад',
    headerTintColor: '#FFF',
    headerStyle: {
      backgroundColor: '#3F53B1'
    }
  };
  state = {
    isReady: false,
    events: filterEvents(moment(), this.props),
    selectedDate: moment(),
  };

  _onSelectDate = (date) => {
    this.setState({
      events: filterEvents(date, this.props),
      selectedDate: date
    });
  };

  async componentDidMount() {
    await Font.loadAsync({
      'RobotoCondensed-Regular': require('../../assets/fonts/RobotoCondensed-Regular.ttf'),
      'RobotoCondensed-Bold': require('../../assets/fonts/RobotoCondensed-Bold.ttf'),
      'RobotoCondensed-Light': require('../../assets/fonts/RobotoCondensed-Light.ttf')
    }).then(() => this.setState({ isReady: true }));
  }

  render() {
    const {
      selectedDate,
      isReady,
      events,
    } = this.state;

    return (
      isReady && <View style={styles.container}>
        <Calendar
          showDaysAfterCurrent={14}
          onSelectDate={this._onSelectDate} 
        />
        <Events
          events={events}
          selectedDate={selectedDate}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F53B1'
  },
});

export default Schedule;