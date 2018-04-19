// @flow

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import moment from 'moment';
import type Moment from 'moment';

import Loading from '../components/Loading';
import Schedule from '../components/Schedule';
import Calendar from '../components/Calendar';

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
  events?: Array<EventType>,
  isLoading: boolean,
};

/**
 * TODO:
 * 
 * - create external file for filterEvents
 * - create external file for types
 */

const filterEvents = (date: Moment, semesters?: Array<Object>): Array<EventType> => {
  let currentSemester: SemesterType;

  const dateFormat: string = 'DD/MM/YYYY';
  const dateFormatWithoutYear: string = 'DD/MM/____';

  // detect current semester
  if (semesters && semesters.length) {
    semesters.map((semester) => {
      const { start, end } = semester;

      const startDate = moment(new Date(start)).format(dateFormat);
      const endDate = moment(new Date(end)).format(dateFormat);

      const isMonthBetween = date.isBetween(
        moment(startDate, dateFormatWithoutYear),
        moment(endDate, dateFormatWithoutYear),
        'month',
        '[]',
      );

      // using month() for missing year
      if (isMonthBetween) {
        currentSemester = semester;
      }

      return semester;
    });
  }

  // get filtered schedule
  const {
    schedule,
    end,
    start,
    firstWeekType,
  } = currentSemester;

  const startDate = moment(new Date(start)).format(dateFormat);
  const endDate = moment(new Date(end)).format(dateFormat);

  const weeksTotal = moment(endDate, dateFormatWithoutYear).isoWeek() - moment(startDate, dateFormatWithoutYear).isoWeek();
  const weeksAfterStart = date.isoWeek() - moment(startDate, dateFormatWithoutYear).isoWeek();
  const weeksBeforeEnd = moment(endDate, dateFormatWithoutYear).isoWeek() - date.isoWeek();

  // console.log(weeksAfterStart, weeksBeforeEnd, weeksTotal);

  let currentWeekType: number;

  const oddWeek: number = 1;
  const evenWeek: number = 2;

  if (weeksAfterStart % 2 !== 0) {
    currentWeekType = firstWeekType === oddWeek ? oddWeek : evenWeek;
  } else {
    currentWeekType = firstWeekType === evenWeek ? oddWeek : evenWeek;
  }

  if (schedule && schedule.length) {
    return schedule.filter((event) => {
      const isSameWeekType = event.weekType === currentWeekType;
      const isSameWeekDay = event.weekDay === date.isoWeekday();

      if (isSameWeekType && isSameWeekDay) {
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
    events: [],
  }

  componentDidMount() {
    const id: number = 71;

    this.getGroupAllData(id);
  }

  onDatePress = (date: Moment): void => {
    const { semesters } = this.state;

    this.setState({
      events: filterEvents(date, semesters),
      currentDate: date,
    });
  }

  getGroupAllData = async (id: number) => {
    const { currentDate } = this.state;

    try {
      const data: dataType = await API.getGroupAllData(id);
      const { group, semesters } = data;

      this.setState({
        group,
        semesters,
        events: filterEvents(currentDate, semesters),
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
      currentDate,
      isLoading,
      events,
    } = this.state;

    if (!isLoading) {
      return (
        <View style={styles.container}>
          <Calendar
            selectedDate={currentDate}
            onDatePress={this.onDatePress}
          />
          <Schedule
            events={events}
            date={currentDate}
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