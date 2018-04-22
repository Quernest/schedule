// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
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
  },
  id?: number,
  schedule?: Array<EventType>,
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
    const { id } = this.getParamsFromNavigatorProps(this.props);

    this.getGroupAllData(id);
  }

  onDatePress = (date: Moment): void => {
    const { semesters } = this.state;

    this.setState({
      events: filterEvents(date, semesters),
      selectedDate: date,
    });
  }

  getParamsFromNavigatorProps = (props: Object): Object => {
    const { navigation } = props;
    const { state } = navigation;
    const { params } = state;

    return {
      ...params,
    };
  }

  getGroupAllData = async (id: number) => {
    const { selectedDate } = this.state;

    try {
      const data: DataType = await API.getGroupAllData(id);
      const { group, semesters } = data;

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
