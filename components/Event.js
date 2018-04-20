// @flow

import React, { Component } from 'react';
import {
  Platform,
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
  isBeforeTime,
  timeFormat,
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
    const { end } = event;

    return isBeforeDay(currentTime, currentDate)
      || (isSameDay(currentTime, currentDate) && isBeforeTime(currentTime, end));
  };

  willBegin = (event: EventType): boolean => {
    const { currentTime } = this.state;
    const { currentDate } = this.props;
    const { start } = event;

    // 'ru' hardcore, should be i18n language
    const { minutes } = this.calcTime(start, 'ru');

    if (minutes) {
      // if there are 20 minutes left before event begins
      return (minutes >= 0 && minutes < 20) && isSameDay(currentTime, currentDate);
    }

    return false;
  };

  calcTime = (time: string, language: string): ?Object => {
    const { currentTime } = this.state;

    const ms = moment(time, timeFormat).diff(currentTime);
    const duration = moment.duration(ms);
    const hours = duration.hours();
    const minutes = (hours * 60) + duration.minutes();

    if (duration && (hours || minutes)) {
      return {
        hours,
        minutes,
        humanized: humanizeDuration(duration, {
          language,
          round: true,
          // displayed units
          units: ['h', 'm', minutes && minutes < 1 && 's'],
        }),
      };
    }

    return {};
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
        <View style={[styles.container, this.isDisabled(event, currentDate) && styles.disabled]}>
          <Text>Free time</Text>
        </View>
      );
    }

    return (
      <View style={[styles.container, this.isDisabled(event, currentDate) && styles.disabled]}>
        <View>
          <Text style={styles.time}>
            {moment(start, timeFormat).format('H:mm')} - {moment(end, timeFormat).format('H:mm')}
          </Text>

          <Text style={styles.name}>{name}</Text>

          {this.willBegin(event) && (
            <Text style={styles.notify}>До начала: {this.calcTime(start, 'ru').humanized}</Text>
          )}

          {this.isActive(event, currentDate) && (
            <Text style={styles.notify}>До конца: {this.calcTime(end, 'ru').humanized}</Text>
          )}
        </View>

        <View style={styles.location}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
            size={14}
            style={styles.locationIcon}
          />
          <Text style={styles.locationValue}>{location}</Text>
        </View>
      </View>
    );
  }
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
