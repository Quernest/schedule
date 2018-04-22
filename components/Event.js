// @flow

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Col,
  Row,
  Grid,
} from 'react-native-easy-grid';
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
      type,
      start,
      end,
      isFreeTime,
    } = event;

    // is no lesson render empty view
    if (isFreeTime) {
      return (
        <View style={[styles.container, this.isDisabled(event, currentDate) && styles.disabled, this.isActive(event, currentDate) && styles.active]}>
          <Text style={styles.name}>-</Text>
        </View>
      );
    }

    /**
     * TODO:
     *
     * - styles refactoring
     * - event type from api
     * - new fonts
     * - display calcTime()
     * - create getContainerStyle component
     */

    // {this.willBegin(event) && (
    //   <Text style={styles.notify}>До начала: {this.calcTime(start, 'ru').humanized}</Text>
    // )}

    // {this.isActive(event, currentDate) && (
    //   <Text style={styles.notify}>До конца: {this.calcTime(end, 'ru').humanized}</Text>
    // )}

    return (
      <View style={[styles.container, this.isDisabled(event, currentDate) && styles.disabled, this.isActive(event, currentDate) && styles.active]}>
        <Grid>
          <Row style={{ alignItems: 'center' }}>
            <Col size={20} style={{ borderRightWidth: 1, borderRightColor: '#ddd' }}>
              <Text style={styles.time}>
                {moment(start, timeFormat).format('HH:mm')}
              </Text>
              <Text style={[styles.time, styles.timeEnd]}>
                {moment(end, timeFormat).format('HH:mm')}
              </Text>
            </Col>
            <Col size={80} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.type}>Практика</Text>
              <Row style={{ marginTop: 10 }}>
                <View style={styles.location}>
                  <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
                    size={12}
                    style={styles.locationIcon}
                  />
                  <Text style={styles.locationValue}>{location}</Text>
                </View>
                <View>
                  <Text style={styles.teacher}>{teacher}</Text>
                </View>
              </Row>
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#242424',
  },
  type: {
    fontSize: 12,
    color: '#979797',
  },
  location: {
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 2.5,
    color: '#aeaeae',
  },
  locationValue: {
    fontSize: 12,
    color: '#aeaeae',
  },
  time: {
    fontSize: 16,
    color: '#343434',
  },
  timeEnd: {
    color: '#aeaeae',
  },
  teacher: {
    marginRight: 5,
    fontSize: 12,
    color: '#aeaeae',
  },
  disabled: {
    backgroundColor: '#ddd',
  },
  active: {
    backgroundColor: '#d2f9e7',
  },
  notify: {
    fontSize: 12,
    color: '#989898',
  },
});
