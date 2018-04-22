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
  parseSubjectType,
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

  getContainerStyle = (event: EventType, currentDate: Moment) => ([
    styles.container,
    this.isActive(event, currentDate) && styles.containerActive,
    this.isDisabled(event, currentDate) && styles.containerDisabled,
  ]);

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

  tick = (): void => {
    this.setState({
      currentTime: moment(),
    });
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
        <View style={this.getContainerStyle(event, currentDate)}>
          <Text style={styles.name}>-</Text>
        </View>
      );
    }

    /**
     * TODO:
     *
     * - new fonts
     * - display calcTime()
     */

    // {this.willBegin(event) && (
    //   <Text style={styles.notify}>До начала: {this.calcTime(start, 'ru').humanized}</Text>
    // )}

    // {this.isActive(event, currentDate) && (
    //   <Text style={styles.notify}>До конца: {this.calcTime(end, 'ru').humanized}</Text>
    // )}

    return (
      <Grid style={this.getContainerStyle(event, currentDate)}>
        <Row style={styles.row}>
          <Col size={20} style={styles.timeWrap}>
            <Text style={styles.time}>
              {moment(start, timeFormat).format('HH:mm')}
            </Text>
            <Text style={[styles.time, styles.timeEnd]}>
              {moment(end, timeFormat).format('HH:mm')}
            </Text>
          </Col>
          <Col size={80} style={styles.infoWrap}>
            <Text style={styles.name}>
              {name}
            </Text>
            <Text style={styles.type}>
              {parseSubjectType(type)}
            </Text>
            <Row style={styles.bottomInfo}>
              <View style={styles.location}>
                <Ionicons
                  name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
                  size={12}
                  style={styles.locationIcon}
                />
                <Text style={styles.locationValue}>
                  {location}
                </Text>
              </View>
              <View>
                <Text style={styles.teacher}>
                  {teacher}
                </Text>
              </View>
            </Row>
          </Col>
        </Row>
      </Grid>
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
  row: {
    alignItems: 'center',
  },
  infoWrap: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  bottomInfo: {
    marginTop: 10,
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
  timeWrap: {
    borderRightWidth: 1,
    borderRightColor: '#ddd',
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
  containerDisabled: {
    backgroundColor: '#ddd',
  },
  containerActive: {
    backgroundColor: '#d2f9e7',
  },
  notify: {
    fontSize: 12,
    color: '#989898',
  },
});
