// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import moment from 'moment';
import type Moment from 'moment';
import humanizeDuration from 'humanize-duration';
import {
  timeFormatWithoutSeconds,
  timeFormat,
  isSameDay,
} from '../helpers/helpers';

const formatTime = (value: string): string => {
  return moment(value, timeFormat).format(timeFormatWithoutSeconds);
};

type Props = {
  selectedDate: Moment,
  currentTime: Moment,
  start: string,
  end: string,
};

type State = {
  currentTime: Moment,
};

export default class Time extends Component<Props, State> {
  willBegin = (): boolean => {
    const {
      selectedDate,
      currentTime,
      start,
    } = this.props;

    // 'ru' hardcore, should be i18n language
    const { minutes } = this.calculate(start, 'ru');

    if (minutes) {
      // if there are 20 minutes left before event begins
      return (minutes >= 0 && minutes <= 20) && isSameDay(currentTime, selectedDate);
    }

    return false;
  };

  calculate = (time: string, language: string): ?Object => {
    const { currentTime } = this.props;

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
          units: ['m'],
        }),
      };
    }

    return {};
  };

  render() {
    const {
      isActive,
      willBegin,
      start,
      end,
    } = this.props;
  
    if (!isActive && !willBegin) {
      return (
        <View style={styles.wrap}>
          <Text style={styles.time}>
            {formatTime(start)}
          </Text>
          <Text style={[styles.time, styles.timeEnd]}>
            {formatTime(end)}
          </Text>
        </View>
      );
    }
  
    if (isActive) {
      const time = calculateTime(end, currentTime);
  
      const value = o.humanized.split(/\s(.+)/)[0];
      const label = o.humanized.split(/\s(.+)/)[1];
  
      return (
        <View style={styles.wrap}>
          <Text style={styles.label}>
            до конца:
          </Text>
          <Text style={styles.time}>
            {value}
          </Text>
          <Text style={styles.label}>
            {label}
          </Text>
        </View>
      );
    }
  
    if (willBegin) {
      const value = o.humanized.split(/\s(.+)/)[0];
      const label = o.humanized.split(/\s(.+)/)[1];
  
      return (
        <View style={styles.wrap}>
          <Text style={styles.label}>
            до начала:
          </Text>
          <Text style={styles.time}>
            {value}
          </Text>
          <Text style={styles.label}>
            {label}
          </Text>
        </View>
      );
    }
  
    return null;
  }
}

const styles = StyleSheet.create({
  timeWrap: {
    padding: 10,
  },
  time: {
    textAlign: 'center',
    fontSize: 21,
    color: '#343434',
  },
  timeEnd: {
    color: '#aeaeae',
  },
  label: {
    textAlign: 'center',
    fontSize: 12,
    color: '#aeaeae',
  },
});
