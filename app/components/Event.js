import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {
  EVENT_BACKGROUND_COLOR,
  EVENT_TIME_COLOR,
  EVENT_TIME_SIZE,
  EVENT_LESSON_COLOR,
  EVENT_LESSON_SIZE,
  EVENT_LOCATION_COLOR,
  EVENT_LOCATION_SIZE,
  PADDING_DEFAULT,
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
  BORDER_RADIUS_DEFAULT,
  BOLD,
  REGULAR,
} from '../helpers/constants';
import {
  Ionicons 
} from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: PADDING_DEFAULT,
    marginTop: PADDING_VERTICAL,
    marginLeft: PADDING_HORIZONTAL / 2,
    marginRight: PADDING_HORIZONTAL / 2,
    borderRadius: BORDER_RADIUS_DEFAULT,
    backgroundColor: EVENT_BACKGROUND_COLOR,
  },

  timeContainer: {
    marginRight: PADDING_HORIZONTAL,
  },
  time: {
    fontFamily: BOLD,
    fontSize: EVENT_TIME_SIZE,
    textAlign: 'center',
    color: EVENT_TIME_COLOR,
  },

  lessonContainer: {
    flex: 1,
  },
  lesson: {
    fontFamily: REGULAR,
    fontSize: EVENT_LESSON_SIZE,
    textAlign: 'center',
    color: EVENT_LESSON_COLOR
  },

  locationContainer: {
    marginLeft: PADDING_HORIZONTAL,
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginLeft: PADDING_HORIZONTAL / 2,
    fontFamily: BOLD,
    fontSize: EVENT_LOCATION_SIZE,
    textAlign: 'center',
    color: EVENT_LOCATION_COLOR
  },

});

export default class Event extends Component {
  render() {
    const { event } = this.props;
    const { data } = event;

    return (
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>8:00</Text>
          <Text style={styles.time}>9:25</Text>
        </View>

        <View style={styles.lessonContainer}>
          <Text style={styles.lesson}>
            Экономика и бизнес
          </Text>
        </View>

        <View style={styles.locationContainer}>
          <Ionicons 
            name="md-pin"
            size={EVENT_LOCATION_SIZE}
            color={EVENT_LOCATION_COLOR} 
          />
          <Text style={styles.location}>2231</Text>
        </View>
      </View>
    );
  }
}

