import React from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import store from 'react-native-simple-store';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import Schedule from '../components/Schedule';
import Calendar from '../components/Calendar';
import ColorConstants from '../constants/Colors';
import { isEmptyObject } from '../helpers/helpers';
import { filterEvents } from '../helpers/filters';
import API from '../services/api.service';

const { lightgrey } = ColorConstants;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Расписание',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.object,
      params: PropTypes.object,
    }).isRequired,
  };

  static defaultProp = {
    id: PropTypes.number,
    schedule: PropTypes.object,
  };

  state = {
    selectedDate: moment(),
    schedule: {},
    events: [],
    isLoading: true,
  };

  componentDidMount() {
    const { id, schedule } = this.props.navigation.state.params;

    if (!isEmptyObject(schedule)) {
      this.setScheduleToState(schedule);
    } else {
      API.getGroupSchedule(id)
        .then((groupSchedule) => {
          if (!isEmptyObject(groupSchedule)) {
            store.update('schedule', groupSchedule);

            this.setScheduleToState(groupSchedule);
          }
        })
        .catch((err) => {
          console.error(err);

          this.setState({
            isLoading: false,
          });
        });
    }
  }

  setScheduleToState(schedule) {
    const events = filterEvents(schedule, moment());

    this.setState({
      schedule,
      events,
      isLoading: false,
    });
  }

  handleDatePress = (date) => {
    const { schedule } = this.state;

    this.setState({
      events: filterEvents(schedule, date),
      selectedDate: date,
    });
  };

  render() {
    const { isLoading } = this.state;

    if (!isLoading) {
      const { events, selectedDate, schedule } = this.state;
      const { semester } = schedule;
      const { start, end } = semester;

      return (
        <View style={styles.container}>
          <Calendar
            minDate={moment(start, 'DD-MM-YYYY')}
            maxDate={moment(end, 'DD-MM-YYYY')}
            selectedDate={selectedDate}
            onDatePress={this.handleDatePress}
          />
          <Schedule events={events} date={selectedDate} />
        </View>
      );
    }

    return <Loading />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightgrey,
  },
});
