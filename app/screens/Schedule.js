import React, { PureComponent } from 'react';

import { 
  Font,
  Constants
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
  const startOfSemester = moment(test.startOfSemester, 'DD/MM/YYYY');
  const currentDate = moment(date, 'DD/MM/YYYY');
  const day = 1; // Monday

  const days = [];
  const current = startOfSemester.clone();
  
  let weekNumber = 0;
  
  while (current.day(7 + day).isBefore(currentDate)) {
    weekNumber++;
    days.push(current.clone());
  }

  return test.schedule[weekNumber % 2 === 0 ? test.firstWeekType : '/'].filter(lesson => {
    return lesson.day.toLowerCase() === date.format('dddd');
  });
};

class Schedule extends PureComponent {
  static navigationOptions = {
    header: null
  };

  state = {
    isFontsLoaded: false,
    events: filterEvents(moment()),
    selectedDate: moment(),
  };

  async componentDidMount() {
    await Font.loadAsync({
      'RobotoCondensed-Regular': require('../../assets/fonts/RobotoCondensed-Regular.ttf'),
      'RobotoCondensed-Bold': require('../../assets/fonts/RobotoCondensed-Bold.ttf'),
      'RobotoCondensed-Light': require('../../assets/fonts/RobotoCondensed-Light.ttf')
    }).then(() => this.setState({ isFontsLoaded: true }))
  }

  onSelectDate = (date) => {
    this.setState({
      events: filterEvents(date),
      selectedDate: date
    });
  };

  render() {
    const { isFontsLoaded, events, selectedDate } = this.state;
    const { navigate } = this.props.navigation;

    return (
      isFontsLoaded && <View style={styles.container}>
        <StatusBar hidden={true} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F53B1'
  },
});

export default Schedule;