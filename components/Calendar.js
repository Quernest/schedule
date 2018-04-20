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
        iconContainer={styles.iconContainer}
        selectedDate={currentDate}
        onDateSelected={onDatePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarStyle: {
    height: 120,
    paddingTop: 20,
    paddingBottom: 10,
  },
  calendarHeaderStyle: {
    marginBottom: 15,
    fontSize: 18,
    color: '#343434',
  },
  dateNameStyle: {
    color: '#343434',
  },
  dateNumberStyle: {
    color: '#343434',
  },
  highlightDateNumberStyle: {
    color: '#38498C',
  },
  highlightDateNameStyle: {
    color: '#38498C',
  },
  disabledDateNameStyle: {
    color: '#989898',
  },
  disabledDateNumberStyle: {
    color: '#989898',
  },
  iconContainer: {
    flex: 0.1,
  },
});

export default Calendar;
