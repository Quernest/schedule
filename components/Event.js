import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import type Moment from 'moment';
import humanizeDuration from 'humanize-duration';
import {
  isSameDay,
  isBeforeDay,
  isBetweenTime,
} from '../helpers/helpers';
import type { EventType } from '../types';
import LayoutConstants from '../constants/Layout';

const { window: { width } } = LayoutConstants;

type Props = {
  currentDate: Moment,
  event: EventType,
};

type State = {
  currentTime: Moment,
};

export default class Event extends Component<Props, State> {
  state = {
    currentTime: moment(),
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = (): void => {
    this.setState({
      currentTime: moment(),
    });
  };

  isActive = (event: EventType, currentDate: Moment): boolean => {
    const { currentTime } = this.state;
    const { start, end } = event;

    return isSameDay(currentTime, currentDate) && isBetweenTime(currentTime, start, end);
  }

  isDisabled = (event: EventType, currentDate: Moment): boolean => {
    const { currentTime } = this.state;
    const { end, start } = event;

    return isBeforeDay(currentTime, currentDate)
      || (isSameDay(currentTime, currentDate) && !isBetweenTime(currentTime, start, end));
  };

  render() {
    const { event, currentDate } = this.props;
    const {
      name,
      location,
      teacher,
      start,
      end,
      isFreeTime,
    } = event;

    // is no lesson render empty view
    if (isFreeTime) {
      return (
        <View style={[styles.container]}>
          <Text>Free time</Text>
        </View>
      );
    }

    return (
      <View style={[styles.container]}>
        <Text>{name}</Text>
      </View>
    );
  }

  // isDisabled(event, date) {
  //   const { currentTime } = this.state;
  //   const { end } = event;

  //   const isWrongDay = isBeforeDay(currentTime, date);
  //   const isWrongTime = isSameDay(currentTime, date) && isBeforeTime(currentTime, end);

  //   return isWrongDay || isWrongTime;
  // }

  // isActive(event, date) {
  //   const { currentTime } = this.state;
  //   const { start, end } = event;

  //   const isRightDay = isSameDay(currentTime, date);
  //   const isRightTime = isBetweenTime(currentTime, start, end);

  //   return isRightDay && isRightTime;
  // }

  // willStart(start) {
  //   const { date } = this.props;
  //   const { currentTime } = this.state;
  //   const ms = moment(start, 'HH:mm:ss').diff(currentTime);
  //   const d = moment.duration(ms);
  //   const hours = d.hours();
  //   const minutes = (hours * 60) + d.minutes();

  //   if (minutes >= 0 && minutes < 20 && isSameDay(currentTime, date)) {
  //     return {
  //       in: humanizeDuration(d, {
  //         language: 'ru',
  //         round: true,
  //         units: ['h', 'm', minutes < 1 && 's'],
  //       }),
  //     };
  //   }

  //   return false;
  // }

  // willEnd(end) {
  //   const { date } = this.props;
  //   const { currentTime } = this.state;
  //   const ms = moment(end, 'HH:mm:ss').diff(currentTime);
  //   const d = moment.duration(ms);
  //   const hours = d.hours();
  //   const minutes = (hours * 60) + d.minutes();

  //   if (isSameDay(currentTime, date)) {
  //     return {
  //       in: humanizeDuration(d, {
  //         language: 'ru',
  //         round: true,
  //         units: ['h', 'm', minutes < 1 && 's'],
  //       }),
  //     };
  //   }

  //   return false;
  // }

  // render() {
    // const { event, date } = this.props;
    // const {
    //   name,
    //   location,
    //   start,
    //   end,
    //   isFreeTime,
    // } = event;

    // const formattedStartTime = moment(start, 'HH:mm:ss').format('H:mm');
    // const formattedEndTime = moment(end, 'HH:mm:ss').format('H:mm');

    // const showWillEndNotify = this.isActive(event, date) && this.willEnd(end);
    // const showWillStartNotify = !this.isActive(event, date) && this.willStart(start);

    // if (isFreeTime) {
    //   return (
    //     <View style={[styles.container, this.isDisabled(event, date) && styles.disabled]}>
    //       <Text>-</Text>
    //     </View>
    //   );
    // }

    // return (
    //   <View style={[styles.container, this.isDisabled(event, date) && styles.disabled]}>
    //     <View>
    //       <Text style={styles.time}>
    //         {formattedStartTime} - {formattedEndTime}
    //       </Text>
    //       <Text style={styles.name}>{name}</Text>
    //       {showWillEndNotify && <Text style={styles.notify}>До конца: {this.willEnd(end).in}</Text>}
    //       {showWillStartNotify && (
    //         <Text style={styles.notify}>До начала: {this.willStart(start).in}</Text>
    //       )}
    //     </View>
    //     <View style={styles.location}>
    //       <Ionicons
    //         name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
    //         size={14}
    //         style={styles.locationIcon}
    //       />
    //       <Text style={styles.locationValue}>{location}</Text>
    //     </View>
    //   </View>
    // );
  // }
  // }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 3,
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  name: {
    width: width * 0.6,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'normal',
    fontSize: 14,
    color: '#343434',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 2.5,
    color: '#989898',
  },
  locationValue: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#989898',
  },
  time: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#343434',
  },
  disabled: {
    opacity: 0.5,
  },
  notify: {
    fontSize: 12,
    color: '#989898',
  },
});
