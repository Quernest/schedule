import React, { PureComponent } from 'react';
import { Constants } from 'expo';
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

import Header from '../components/Header';
import Calendar from '../components/Calendar';
import Events from '../components/Events';

import { filterEvents } from '../helpers/Filters';

class Schedule extends PureComponent {
  static navigationOptions = {
    title: 'Назад',
    headerTintColor: '#FFF',
    headerStyle: {
      backgroundColor: '#3F53B1'
    }
  };
  
  state = {
    fontLoaded: false,
    events: filterEvents(moment(), this.props),
    selectedDate: moment(),
  };

  _onSelectDate = (date) => {
    this.setState({
      events: filterEvents(date, this.props),
      selectedDate: date
    });
  };

  render() {
    const {
      selectedDate,
      events,
    } = this.state;

    return (
      <View style={styles.container}>
        <Header />
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
    flex: 1
  },
});

export default Schedule;