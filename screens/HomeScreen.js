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
import Header from '../components/Header';
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
    getParam: (key: string) => void,
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
    semesters: [],
    events: [],
    group: {},
  }

  componentDidMount() {
    const id: ?number = this.props.navigation.getParam('id');

    this.getGroupAllData(id);
  }

  onDatePress = (date: Moment): void => {
    const { semesters } = this.state;

    this.setState({
      events: filterEvents(date, semesters),
      selectedDate: date,
    });
  }

  onUpdate = () => {
    const { group } = this.state;

    if (group) {
      const { id } = group;

      this.setState({
        isLoading: true,
      });

      this.getGroupAllData(id);
    }
  }

  getGroupAllData = async (id?: ?number) => {
    const { screenProps } = this.props;

    if (id) {
      try {
        const data: ?DataType = await API.getGroupAllData(id);

        store.update('data', data);

        this.setGroupAllDataToState(data);
      } catch (error) {
        console.error(error);
      }
    } else if (!id && screenProps && screenProps.data) {
      const { data } = screenProps;

      this.setGroupAllDataToState(data);
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  setGroupAllDataToState = (data: ?DataType) => {
    const { selectedDate } = this.state;

    if (data) {
      const { group, semesters } = data;

      this.setState({
        group,
        semesters,
        events: filterEvents(selectedDate, semesters),
        isLoading: false,
      });
    }
  };

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
          <Header
            onUpdate={this.onUpdate}
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
