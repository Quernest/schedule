// @flow

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import localization from 'moment/locale/ru';
import CelendarStrip from 'react-native-calendar-strip';
import type Moment from 'moment';

const conifg = {
  locale: {
    name: 'ru',
    config: localization,
  },
  calendarAnimation: {
    type: 'parallel',
    duration: 200,
  },
  daySelectionAnimation: {},
  calendarColor: '#eeefef',
};

type Props = {
  currentDate: Moment,
  onDatePress: (date: Moment) => void;
};

const Calendar = (props: Props) => {
  const { currentDate, onDatePress } = props;

  return (
    <View>
      <CelendarStrip
        {...conifg}
        style={styles.calendarStyle}
        calendarHeaderStyle={styles.calendarHeaderStyle}
        dateNumberStyle={styles.dateNumberStyle}
        dateNameStyle={styles.dateNameStyle}
        highlightDateNumberStyle={styles.highlightDateNumberStyle}
        highlightDateNameStyle={styles.highlightDateNameStyle}
        disabledDateNameStyle={styles.disabledDateNameStyle}
        disabledDateNumberStyle={styles.disabledDateNumberStyle}
        weekendDateNameStyle={styles.weekendDateNameStyle}
        weekendDateNumberStyle={styles.weekendDateNumberStyle}
        iconContainer={styles.iconContainer}
        selectedDate={currentDate}
        onDateSelected={onDatePress}
        iconLeft={require('../assets/images/left-arrow.png')}
        iconRight={require('../assets/images/right-arrow.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarStyle: {
    height: 120,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#00c26b',
  },
  calendarHeaderStyle: {
    marginBottom: 15,
    fontSize: 18,
    color: '#f9ffff',
  },
  dateNameStyle: {
    color: '#39d58e',
  },
  dateNumberStyle: {
    color: '#39d58e',
  },
  highlightDateNumberStyle: {
    color: '#f9ffff',
  },
  highlightDateNameStyle: {
    color: '#f9ffff',
  },
  disabledDateNameStyle: {
    color: '#39d58e',
  },
  disabledDateNumberStyle: {
    color: '#39d58e',
  },
  weekendDateNameStyle: {
    color: '#39d58e',
  },
  weekendDateNumberStyle: {
    color: '#39d58e',
  },
  iconContainer: {
    flex: 0.1,
  },
});

export default Calendar;
