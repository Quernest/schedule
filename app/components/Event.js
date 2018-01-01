import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {
  Ionicons 
} from '@expo/vector-icons';
import moment from 'moment';
import Timer from '../helpers/Timer';
import * as Progress from 'react-native-progress';
import { colorScheme } from '../config';

const { width } = Dimensions.get('window');

class Event extends Component {
  state = {
    currentTime: moment()
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timeUpdate.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timeUpdate() {
    this.setState({ currentTime: moment() })
  }

  render() {
    const { event, selectedDate } = this.props;
    const { currentTime } = this.state;

    const {
      start,
      end,
      name,
      location,
      type
    } = event;

    const isCurrentLesson = Timer.checkCurrentLesson(start, end, currentTime) && currentTime.isSame(selectedDate, 'day');
    const isPastLesson = Timer.checkPastLesson(end, currentTime) && currentTime.isSame(selectedDate, 'day') || selectedDate.isBefore(currentTime, 'day');

    return (
      <View style={[styles.container, isCurrentLesson && styles.containerActive, isPastLesson && styles.containerDeactive]}>
        <View style={styles.lessonContainer}>
          {!!name && <Text style={styles.lesson}>
            {name}
          </Text>}
          {!!location && <View style={styles.locationContainer}>
            <Text style={styles.location}>
              <Ionicons 
                name="md-pin"
                size={14}
                color={'lightgrey'}
              /> {location}
            </Text>
          </View>}
        </View>

        {/* <View style={styles.lessonDetails}>
          <View style={styles.locationContainer}>
            <Ionicons 
              name="md-pin"
              size={14}
              color={'lightgrey'}
            />
            {!!location && <Text style={styles.location}>
              {location}
            </Text>}
          </View>
          <View>
            {!!type && <Text style={styles.lessonType}>
              {type}
            </Text>}
          </View>
        </View> */}
        <View style={styles.timeContainer}>
          {!!start && <Text style={[styles.time, styles.timeStart]}>
            {start}
          </Text>}
          {!!end && <Text style={[styles.time, styles.timeEnd]}>
            {end}
          </Text>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 10,
    marginHorizontal: 7.5,
    borderRadius: 1.5,
    backgroundColor: '#fff',
  },

  containerActive: {
    backgroundColor: '#CDE53F',
    opacity: 1
  },
  containerDeactive: {
    opacity: .35
  },

  timeContainer: {
    flexDirection: 'row',
  },
  time: {
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    fontFamily: 'RobotoCondensed-Light',
    fontSize: 16,
    color: 'lightgrey',
  },
  timeStart: {
    backgroundColor: '#3E4A51',
  },
  timeEnd: {
    backgroundColor: '#49545B'
  },

  lessonContainer: {
    flex: 1,
  },
  lessonDetails: {
    alignItems: 'flex-end'
  },
  lessonType: {
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 12,
    textAlign: 'center',
    color: 'lightgrey'
  },
  lesson: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 21,
    color: '#3E4A51'
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginVertical: 5,
    fontFamily: 'RobotoCondensed-Light',
    fontSize: 16,
    color: '#A4A4A4'
  },
});

export default Event;

