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
    const { event } = this.props;
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
          <Text style={styles.name}>-</Text>
        </View>
      );
    }

    return (
      <Grid style={this.getContainerStyle()}>
        <Row style={styles.row}>
          <Col size={25}>

          </Col>
          <Col size={75} style={styles.infoWrap}>
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
    backgroundColor: '#d2f9e7',
  },
  row: {
    alignItems: 'center',
  },
  infoWrap: {
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    padding: 10,
  },
  bottomInfo: {
    alignItems: 'flex-start',
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
  teacherWrap: {
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  teacher: {
    marginRight: 5,
    fontSize: 12,
    color: '#aeaeae',
  },
});
