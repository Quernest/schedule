// @flow

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import moment from 'moment';
import type Moment from 'moment';

import store from 'react-native-simple-store';
import Loading from '../components/Loading';
import Schedule from '../components/Schedule';
import Calendar from '../components/Calendar';
// import { isSameSemester } from '../helpers/helpers';
// import { filterEvents } from '../helpers/filters';
import API from '../services/api.service';

export type EventType = {
  id: number,
  name: string,
  teacher: string,
  start: string,
  end: string,
  weekDay: number,
  // 1 = odd, 2 = even
  weekType: number,
  semester: number,
  location: string,
  // if no lesson
  isFreeTime: number,
  // it's usually friday
  isShortDay: number,
};

export type SemesterType = {
  id: number,
  start: string,
  end: string,
  schedule?: Array<EventType>,
  // the week type from which the semester begins
  firstWeekType: number,
};

export type dataType = {
  group: {
    id: number,
    name: string,
  },
  semesters: Array<Object>,
};

type Props = {
  navigation: {
    state: Object,
    params: Object,
  },
  id?: number,
  schedule?: Array<EventType>,
};

type State = {
  currentDate: string | Moment,
  group?: {
    id: number,
    name: string,
  },
  semesters?: Array<Object>,
  isLoading: boolean,
};

const filterEvents = (date: Moment, semesters: Array<Object>): Array<EventType> => {

  let currentSemester: SemesterType;

  // detect current semester
  if (semesters && semesters.length) {
    semesters.map((semester) => {
      const { start, end } = semester;

      const startDate = moment(start);
      const endDate = moment(end);

      // using month() for missing year
      if (startDate.month() <= date.month() && date.month() <= endDate.month()) {
        currentSemester = semester;
      }

      return semester;
    });
  }

  const { schedule } = currentSemester;

  // filter schedule of current semester
  if (schedule && schedule.length) {
    return schedule.filter((event) => {
      if (event.weekDay === moment(date).isoWeekday()) {
        return event;
      }
    });
  }

  return [];
};

export default class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
    title: 'Расписание',
  };

  state = {
    currentDate: moment(),
    isLoading: true,
  }

  componentDidMount() {
    const tmpId = 71;

    this.getGroupAllData(tmpId);
  }

  onDatePress = (date: Moment): void => {
    const { semesters } = this.state;

    console.log(filterEvents(date, semesters));

    this.setState({
      currentDate: date,
    });
  }

  getGroupAllData = async (id: number) => {
    try {
      const data: dataType = await API.getGroupAllData(id);

      this.setState({ ...data });
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
      currentDate,
      isLoading,
    } = this.state;

    if (!isLoading) {
      return (
        <View style={styles.container}>
          <Calendar
            selectedDate={currentDate}
            onDatePress={this.onDatePress}
          />
          {/* <Schedule
            events={schedule}
            date={currentDate}
          /> */}
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