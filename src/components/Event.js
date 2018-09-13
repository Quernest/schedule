// @flow

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Col,
  Row,
  Grid,
} from 'react-native-easy-grid';
import type Moment from 'moment';
import {
  isSameDay,
  isBeforeDay,
  isBetweenTime,
  isBeforeTime,
  parseSubjectType,
} from '../helpers/helpers';
import type { EventType } from '../types';
import Time from './Time';

type Props = {
  currentTime: Moment,
  selectedDate: Moment,
  event: EventType,
};

export default class Event extends Component<Props> {
  getContainerStyle = (): Array<any> => ([
    styles.container,
    this.isActive() && styles.containerActive,
    this.isDisabled() && styles.containerDisabled,
  ]);

  getLocationIconStyle = (): Array<any> => ([
    styles.locationIcon,
    this.isActive() && styles.locationIconActive,
  ]);

  isActive = (): boolean => {
    const {
      event,
      selectedDate,
      currentTime,
    } = this.props;
    const { start, end } = event;

    return isSameDay(currentTime, selectedDate) && isBetweenTime(currentTime, start, end);
  };

  isDisabled = (): boolean => {
    const {
      event,
      selectedDate,
      currentTime,
    } = this.props;
    const { end } = event;

    return isBeforeDay(currentTime, selectedDate)
      || (isSameDay(currentTime, selectedDate) && isBeforeTime(currentTime, end));
  };

  render() {
    const {
      event,
      selectedDate,
      currentTime,
    } = this.props;
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
        <View style={this.getContainerStyle()}>
          <Text style={[styles.name, styles.freeTimeMessage]}>-</Text>
        </View>
      );
    }

    return (
      <Grid style={this.getContainerStyle()}>
        <Row style={styles.row}>
          <Col size={25}>
            <Time
              isActive={this.isActive()}
              currentTime={currentTime}
              selectedDate={selectedDate}
              start={start}
              end={end}
            />
          </Col>
          <Col size={75} style={styles.infoWrap}>
            <Row style={styles.topInfo}>
              <Text style={styles.name}>
                {name}
              </Text>
              <View style={styles.location}>
                <Ionicons
                  name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
                  size={12}
                  style={this.getLocationIconStyle()}
                />
                <Text style={styles.locationValue}>
                  {location}
                </Text>
              </View>
            </Row>
            <Text style={styles.type}>
              {parseSubjectType(type)}
            </Text>
            <Row style={styles.bottomInfo}>
              <View style={styles.teacherWrap}>
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
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  containerDisabled: {
    backgroundColor: '#ddd',
  },
  containerActive: {
    backgroundColor: '#e0f9ee',
  },
  freeTimeMessage: {
    textAlign: 'center',
    padding: 10,
  },
  row: {
    alignItems: 'center',
  },
  infoWrap: {
    padding: 10,
  },
  topInfo: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bottomInfo: {
    alignItems: 'flex-start',
    marginTop: 10,
  },
  name: {
    flexWrap: 'wrap',
    flex: 1,
    fontFamily: 'Muli-Bold',
    fontSize: 18,
    color: '#242424',
  },
  type: {
    fontFamily: 'Muli-Bold',
    fontSize: 14,
    color: '#747d8c',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginLeft: 5,
    marginRight: 2.5,
    color: '#747d8c',
  },
  locationIconActive: {
    color: '#00c26b',
  },
  locationValue: {
    fontFamily: 'Muli-Bold',
    fontSize: 12,
    color: '#747d8c',
  },
  teacherWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  teacher: {
    flexWrap: 'wrap',
    flex: 1,
    fontFamily: 'Muli-Bold',
    fontSize: 12,
    color: '#747d8c',
  },
});
