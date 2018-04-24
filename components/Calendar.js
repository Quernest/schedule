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
  selectedDate: Moment,
  onDatePress: (date: Moment) => void;
};

const Calendar = (props: Props) => {
  const { selectedDate, onDatePress } = props;

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
        selectedDate={selectedDate}
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
    backgroundColor: '#38498c',
  },
  calendarHeaderStyle: {
    marginBottom: 15,
    fontSize: 18,
    color: '#f9ffff',
  },
  dateNameStyle: {
    color: '#f9ffff',
  },
  dateNumberStyle: {
    color: '#f9ffff',
  },
  highlightDateNumberStyle: {
    color: '#39d58e',
  },
  highlightDateNameStyle: {
    color: '#39d58e',
  },
  disabledDateNameStyle: {
    color: '#39d58e',
  },
  disabledDateNumberStyle: {
    color: '#39d58e',
  },
  weekendDateNameStyle: {
    color: '#f9ffff',
  },
  weekendDateNumberStyle: {
    color: '#f9ffff',
  },
  iconContainer: {
    flex: 0.1,
  },
});

export default Calendar;
