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
        <View style={styles.timeContainer}>
          {!!start && <Text style={styles.time}>
            {start}
          </Text>}
          {!!end && <Text style={styles.time}>
            {end}
          </Text>}
        </View>

        <View style={styles.lessonContainer}>
          {!!name && <Text style={styles.lesson}>
            {name}
          </Text>}
        </View>

        <View style={styles.lessonDetails}>
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
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },

  containerActive: {
    backgroundColor: 'green',
    opacity: 1
  },
  containerDeactive: {
    opacity: .35
  },

  timeContainer: {
    width: width * .1,
    marginRight: 15,
  },
  time: {
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 14,
    color: 'lightgrey',
  },

  lessonContainer: {
    width: width * .7,
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
    fontSize: 16,
    textAlign: 'center',
    color: '#fff'
  },

  locationContainer: {
    width: width * .1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 15,
  },
  location: {
    marginLeft: 7.5,
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 14,
    textAlign: 'right',
    color: 'lightgrey'
  },
});

export default Event;

