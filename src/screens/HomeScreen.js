// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  AsyncStorage,
} from 'react-native';
import moment from 'moment';
import type Moment from 'moment';
import Loading from '../components/Loading';
import Schedule from '../components/Schedule';
import Calendar from '../components/Calendar';
import type { EventType, DataType } from '../types';
import API from '../services/api.service';
import { filterEvents } from '../helpers/filters';

type Props = {
  navigation: {
    state: Object,
    params: Object,
    getParam: (key: string) => void,
  },
  screenProps: {
    isConnected: boolean,
  },
};

type State = {
  selectedDate: string | Moment,
  group?: {
    id: number,
    name: string,
  },
  weeks?: {
    currentWeekType: number,
    total: number,
    current: number,
  },
  semesters?: Array<Object>,
  events?: Array<EventType>,
  isLoading: boolean,
};

export default class HomeScreen extends Component<Props, State> {
  static navigationOptions = {
    title: 'Розклад',
  };

  state = {
    selectedDate: moment(),
    isLoading: true,
    semesters: [],
    events: [],
    group: {},
    weeks: {},
  }

  componentDidMount() {
    const id: ?number = this.props.navigation.getParam('id');

    this.getGroupAllData(id);
  }

  onDatePress = (date: Moment): void => {
    const { semesters } = this.state;
    const { events, weeks } = filterEvents(date, semesters);

    this.setState({
      weeks,
      events,
      selectedDate: date,
    });
  }

  onUpdate = () => {
    const { isConnected } = this.props.screenProps;

    if (isConnected) {
      const { id } = this.state.group;

      this.setState({
        isLoading: true,
        selectedDate: moment(),
      });

      this.getGroupAllData(id);
    } else {
      Alert.alert('Помилка', 'Для оновлення розкладу занять необхідне інтернет-з\'єднання');
    }
  }

  getGroupAllData = async (id?: ?number) => {
    if (id) {
      try {
        const data: ?DataType = await API.getGroupAllData(id);

        await AsyncStorage.setItem('data', JSON.stringify(data));

        this.setGroupAllDataToState(data);
      } catch (error) {
        Alert.alert(JSON.stringify(error));
      }
    } else {
      try {
        const data: ?DataType = await AsyncStorage.getItem('data');

        this.setGroupAllDataToState(JSON.parse(data));
      } catch (error) {
        Alert.alert(JSON.stringify(error));
      }
    }
  }

  setGroupAllDataToState = (data: ?DataType) => {
    const { selectedDate } = this.state;

    if (data) {
      const { group, semesters } = data;
      const { events, weeks } = filterEvents(selectedDate, semesters);

      this.setState({
        group,
        semesters,
        events,
        weeks,
        isLoading: false,
      });
    }
  };

  render() {
    const {
      selectedDate,
      isLoading,
      events,
      weeks,
      group,
    } = this.state;

    if (!isLoading) {
      return (
        <View style={styles.container}>
          <Calendar
            selectedDate={selectedDate}
            onDatePress={this.onDatePress}
            onScheduleUpdate={this.onUpdate}
            group={group}
            weeks={weeks}
            showDaysAfterCurrent={30}
            showDaysBeforeCurrent={30}
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
