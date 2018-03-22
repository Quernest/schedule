import React from 'react';
import { View, StyleSheet } from 'react-native';
import localization from 'moment/locale/ru';
import PropTypes from 'prop-types';
import CelendarStrip from 'react-native-calendar-strip';
import SizeConstants from '../constants/Sizes';
import ColorConstants from '../constants/Colors';

const { fontSizeLarge } = SizeConstants;
const {
  lightblue, lightgrey, black, grey,
} = ColorConstants;

const calendarConifg = {
  locale: {
    name: 'ru',
    config: localization,
  },
  calendarAnimation: {
    type: 'parallel',
    duration: 200,
  },
  daySelectionAnimation: {},
  calendarColor: lightgrey,
};

const Calendar = ({
  selectedDate, onDatePress, minDate, maxDate,
}) => (
  <View>
    <CelendarStrip
      {...calendarConifg}
      style={styles.calendarStyle}
      calendarHeaderStyle={styles.calendarHeaderStyle}
      dateNumberStyle={styles.dateNumberStyle}
      dateNameStyle={styles.dateNameStyle}
      highlightDateNumberStyle={styles.highlightDateNumberStyle}
      highlightDateNameStyle={styles.highlightDateNameStyle}
      disabledDateNameStyle={styles.disabledDateNameStyle}
      disabledDateNumberStyle={styles.disabledDateNumberStyle}
      iconContainer={styles.iconContainer}
      selectedDate={selectedDate}
      onDateSelected={onDatePress}
      minDate={minDate}
      maxDate={maxDate}
    />
  </View>
);

Calendar.propTypes = {
  selectedDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onDatePress: PropTypes.func.isRequired,
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

const styles = StyleSheet.create({
  calendarStyle: {
    height: 120,
    paddingTop: 20,
    paddingBottom: 10,
  },
  calendarHeaderStyle: {
    marginBottom: 15,
    fontSize: fontSizeLarge,
    color: black,
  },
  dateNameStyle: {
    color: black,
  },
  dateNumberStyle: {
    color: black,
  },
  highlightDateNumberStyle: {
    color: lightblue,
  },
  highlightDateNameStyle: {
    color: lightblue,
  },
  disabledDateNameStyle: {
    color: grey,
  },
  disabledDateNumberStyle: {
    color: grey,
  },
  iconContainer: {
    flex: 0.1,
  },
});

export default Calendar;
