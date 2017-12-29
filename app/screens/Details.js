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

const {
  width
} = Dimensions.get('window');

class Details extends Component {
  static navigationOptions = {
    title: 'Назад',
    headerTintColor: '#FFF',
    headerStyle: {
      backgroundColor: '#3F53B1'
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

    const isVisibleProgress = Timer.checkCurrentLesson(start, end, currentTime) && currentTime.isSame(selectedDate, 'day');
  
    return (
      <View style={styles.container}>
        {/* fix it  */}
        {start && end && <View style={styles.info}>
          <Text style={styles.heading}>{name}</Text>

          <View style={styles.teacher}>
            <Text style={[styles.text, styles.label]}>Преподаватель:</Text>
            <Text style={styles.text}>Не указан</Text>
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
            color={'rgb(236, 240, 241)'}
            unfilledColor={'#3F53B1'}
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
    backgroundColor: '#243177',
    padding: 15,
  },
  text: {
    fontFamily: 'RobotoCondensed-Regular',
    color: '#FFF'
  },
  label: {
    fontFamily: 'RobotoCondensed-Bold',
    marginRight: 3.75,
  },
  heading: {
    fontFamily: 'RobotoCondensed-Light',
    fontSize: 20,
    marginBottom: 10,
    color: '#FFF'
  },

  teacher: {
    marginBottom: 10
  },
  teaherName: {
    fontFamily: 'RobotoCondensed-Regular',
  },
  teacherLabel: {
    fontFamily: 'RobotoCondensed-Bold',
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