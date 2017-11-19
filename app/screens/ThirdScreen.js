import React, { Component } from 'react';

import {
  Text,
  View,
  Button,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {
  APP_BACKGROUND_COLOR,
  EVENTS_BACKGROUND_COLOR,
  PADDING_DEFAULT,
  CIRCLE_PROGRESS_COLOR,
  REGULAR,
  PADDING_VERTICAL,
  BOLD,
  LIGHT,
  PADDING_HORIZONTAL,
} from '../helpers/constants';

import {
  calcCurrentLessonProgress,
  calcRemainingTime,
  checkCurrentDay,
  checkCurrentLesson,
  calcTimeDifference,
} from '../helpers/helpers';

import moment from 'moment';

import * as Progress from 'react-native-progress';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EVENTS_BACKGROUND_COLOR,
    padding: PADDING_DEFAULT,
  },
  text: {
    fontFamily: REGULAR,
    color: '#FFF'
  },
  label: {
    fontFamily: BOLD,
    marginRight: PADDING_HORIZONTAL / 4,
  },
  heading: {
    fontFamily: LIGHT,
    fontSize: 20,
    marginBottom: PADDING_VERTICAL,
    // borderBottomColor: 'rgba(255, 255, 255, .25)',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    color: '#FFF'
  },

  teacher: {
    marginBottom: PADDING_VERTICAL
  },
  teaherName: {
    fontFamily: REGULAR
  },
  teacherLabel: {
    fontFamily: BOLD
  },

  duration: {
    marginBottom: PADDING_VERTICAL,
  },

  location: {
    flexDirection: 'row',
    marginBottom: PADDING_VERTICAL,
  },

  circle: {
    maxWidth: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: PADDING_VERTICAL
  },
  info: {
    padding: PADDING_DEFAULT / 2,
    // borderBottomColor: 'rgba(255, 255, 255, .25)',
    // borderBottomWidth: StyleSheet.hairlineWidth,
  }
});

class ThirdScreen extends Component {
  static navigationOptions = {
    title: 'Назад',
    headerTintColor: '#FFF',
    headerStyle: {
      backgroundColor: APP_BACKGROUND_COLOR
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
      type
    } = event;

    const isVisibleProgress = checkCurrentLesson(start, end, currentTime);
  
    return (
      <View style={styles.container}>
        
        <View style={styles.info}>
          <Text style={styles.heading}>{name}</Text>
          
          <View style={styles.teacher}>
            <Text style={[styles.text, styles.label]}>Преподаватель:</Text>
            <Text style={styles.text}>Тарасов Александр Фёдорович</Text>
          </View>

          <View style={styles.duration}>
            <Text style={[styles.text, styles.label]}>Время и длительность пары:</Text>
            <Text style={styles.text}>С {start} до {end} ({calcTimeDifference(start, end).minutes} мин.)</Text>
          </View>

          <View style={styles.location}>
            <Text style={[styles.text, styles.label]}>Аудитория:</Text>
            <Text style={styles.text}>{location}</Text>
          </View>

        </View>

        {isVisibleProgress && <View style={styles.circle}>
          <Progress.Circle
            size={width * .65}
            progress={calcCurrentLessonProgress(start, calcTimeDifference(start, end).minutes, 1)}
            color={CIRCLE_PROGRESS_COLOR}
            unfilledColor={APP_BACKGROUND_COLOR}
            showsText={true}
            formatText={() => calcRemainingTime(end, currentTime).join(':')}
            borderWidth={0}
            thickness={10}
            animated={false}
          />
        </View>}
      </View>
    );
  }
}

export default ThirdScreen;