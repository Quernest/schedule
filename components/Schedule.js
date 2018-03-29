import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Event from '../components/Event';
import SizeConstants from '../constants/Sizes';
import ColorConstants from '../constants/Colors';

const { gutter } = SizeConstants;
const { lightgrey, grey } = ColorConstants;

const Schedule = ({ events, date }) => (
  <View style={styles.container}>
    <ScrollView>
      <View style={styles.eventsContainer}>
        {events &&
          events.map((event) => {
            const { id } = event;

            return <Event key={id} event={event} date={date} />;
          })}

        {events && events.length === 0 && <Text style={styles.message}>Пусто</Text>}
      </View>
    </ScrollView>
  </View>
);

Schedule.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightgrey,
  },
  eventsContainer: {
    paddingTop: gutter,
    paddingHorizontal: gutter,
  },
  message: {
    textAlign: 'center',
    opacity: 0.75,
    color: grey,
  },
});

export default Schedule;
