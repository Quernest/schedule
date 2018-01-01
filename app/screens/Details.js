import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Dimensions,
} from 'react-native';

import moment from 'moment';
import * as Progress from 'react-native-progress';
import Timer from '../helpers/Timer';
import { colorScheme } from '../config';

const {
  width
} = Dimensions.get('window');

class Details extends Component {
  static navigationOptions = {
    title: 'Назад',
    headerTintColor: colorScheme.white.background,
    headerStyle: {
      backgroundColor: "#1B1F22"
    }
  };

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
    const {
      currentTime
    } = this.state;
    const {
      navigation: {
        navigate, 
        state
      }
    } = this.props;
    const {
      params: {
        event, 
        selectedDate
      }
    } = state;
    const {
      day,
      name,
      location,
      start,
      end,
      type,
      teacher
    } = event;

    const isVisibleProgress = Timer.checkCurrentLesson(start, end, currentTime) && currentTime.isSame(selectedDate, 'day');
  
    return (
      <View style={styles.container}>
        {/* fix it  */}
        {start && end && <View style={styles.info}>
          <Text style={styles.heading}>{name}</Text>

          <View style={styles.teacher}>
            <Text style={[styles.text, styles.label]}>Преподаватель:</Text>
            <Text style={styles.text}>{teacher}</Text>
          </View>

          <View style={styles.duration}>
            <Text style={[styles.text, styles.label]}>Время и длительность пары:</Text>
            <Text style={styles.text}>С {start} до {end} ({Timer.calcTimeDifference(start, end).minutes} мин.)</Text>
          </View>

          <View style={styles.location}>
            <Text style={[styles.text, styles.label]}>Аудитория:</Text>
            <Text style={styles.text}>{location}</Text>
          </View>
        </View>}

        {isVisibleProgress && <View style={styles.circle}>
          <Progress.Circle
            size={width * .65}
            progress={Timer.calcCurrentLessonProgress(start, Timer.calcTimeDifference(start, end).minutes, 1)}
            color={'#3E4A51'}
            unfilledColor={'#CDE53F'}
            showsText={true}
            formatText={() => Timer.calcRemainingTime(end, currentTime).join(':')}
            borderWidth={0}
            thickness={10}
            animated={false}
          />
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme.white.background,
    padding: 15,
  },
  text: {
    fontSize: 18,
    fontFamily: 'RobotoCondensed-Light',
    color: '#3E4A51'
  },
  label: {
    fontFamily: 'RobotoCondensed-Regular',
    marginRight: 3.75,
  },
  heading: {
    fontFamily: 'RobotoCondensed-Light',
    fontSize: 24,
    marginBottom: 10,
    color: '#3E4A51'
  },

  teacher: {
    marginBottom: 10
  },
  teaherName: {
    fontFamily: 'RobotoCondensed-Light',
  },
  teacherLabel: {
    fontFamily: 'RobotoCondensed-Regular',
  },

  duration: {
    marginBottom: 10,
  },

  location: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  circle: {
    maxWidth: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  info: {
    padding: 7.5,
  }
});

export default Details;