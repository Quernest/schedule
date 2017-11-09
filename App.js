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
import {
  APP_BACKGROUND_COLOR,
  IOS_TOP_PADDING,
  ANDROID_TOP_PADDING
} from './app/helpers/constants';

import moment from 'moment';
import ru from 'moment/locale/ru';
moment.locale('ru');

export default class App extends React.Component {

  state = {
  //  events: filterEvents(moment()),
    events: [
      {
      data: [
          {
            time: '8:00',
            title: '1 пара',
            description: 'Информация о 1 паре',
            circleColor: '#27ae60',
            lineColor: '#27ae60'
          },
          {
            time: '9:25',
            title: 'Перерыв',
          },
          {
            time: '9:45',
            title: '2 пара',
            description: 'Информация о 2 паре'
          },
          {
            time: '11:10',
            title: 'Перерыв',
          },
          {
            time: '11:35',
            title: '3 пара',
            description: 'Информация о 3 паре'
          }
        ]
      }
    ]
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
    paddingTop: (Platform.OS === 'ios') ? IOS_TOP_PADDING : ANDROID_TOP_PADDING,
    backgroundColor: APP_BACKGROUND_COLOR
  },
});
