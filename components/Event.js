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
              <Text style={styles.type}>
                {parseSubjectType(type)}
              </Text>
            </View>
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
    // backgroundColor: '#d2f9e7',
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
  bottomInfo: {
    alignItems: 'flex-start',
    marginTop: 10,
  },
  name: {
    marginTop: 5,
    marginBottom: 5,
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#242424',
  },
  type: {
    marginLeft: 2.5,
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#aeaeae',
  },
  location: {
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 1,
    color: '#aeaeae',
  },
  locationIconActive: {
    color: '#00c26b',
  },
  locationValue: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#aeaeae',
  },
  teacherWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  teacher: {
    width: 200,
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#aeaeae',
  },
});
