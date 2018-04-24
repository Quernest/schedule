// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import store from 'react-native-simple-store';
import moment from 'moment';
import type Moment from 'moment';
import Loading from '../components/Loading';
import Schedule from '../components/Schedule';
import Calendar from '../components/Calendar';
import type {
  EventType,
  DataType,
} from '../types';
import API from '../services/api.service';
import { filterEvents } from '../helpers/filters';

type Props = {
  navigation: {
    state: Object,
    params: Object,
    getParam: () => void,
  },
  screenProps: Object,
};

type State = {
  selectedDate: string | Moment,
  group?: {
    id: number,
    name: string,
  },
  semesters?: Array<Object>,
  events?: Array<EventType>,
  isLoading: boolean,
};

export default class HomeScreen extends Component<Props, State> {
  static navigationOptions = {
    header: null,
    title: 'Расписание',
  };

  state = {
    selectedDate: moment(),
    isLoading: true,
    events: [],
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    const { screenProps } = this.props;

    if (screenProps) {
      const { data } = screenProps;

      this.getGroupAllData(id, data);
    }
  }

  onDatePress = (date: Moment): void => {
    const { semesters } = this.state;

    this.setState({
      events: filterEvents(date, semesters),
      selectedDate: date,
    });
  }

  getGroupAllData = async (id: number, cache: DataType) => {
    const { selectedDate } = this.state;

    try {
      const data: DataType = cache || await API.getGroupAllData(id);
      const { group, semesters } = data;

      store.save('data', data);

      this.setState({
        group,
        semesters,
        events: filterEvents(selectedDate, semesters),
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const {
      selectedDate,
      isLoading,
      events,
    } = this.state;

    if (!isLoading) {
      return (
        <View style={styles.container}>
          <Calendar
            selectedDate={selectedDate}
            onDatePress={this.onDatePress}
          />
          <Schedule
            events={events}
            selectedDate={selectedDate}
          />
        </View>
      );
    }

    return <Loading />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeefef',
  },
});
