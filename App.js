import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  filterEvents
} from './app/helpers/helpers';

import Calendar from './app/components/Calendar';
import Events from './app/components/Events';

import moment from 'moment';
import ru from 'moment/locale/ru';
moment.locale('ru');

export default class App extends React.Component {

  state = {
  //  events: filterEvents(moment()),
    events: []
  };

  onSelectDate = (date) => {
    //this.setState({ events: filterEvents(date)});
    this.setState({ events: []})
  };

  render() {
    const { events } = this.state;

    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#3F53B1',
  },
});
