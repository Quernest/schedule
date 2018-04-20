// @flow

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import type Moment from 'moment';
import Event from '../components/Event';
import type { EventType } from '../types';

type Props = {
  events: ?Array<EventType>,
  currentDate: Moment,
};

const Schedule = (props: Props) => {
  const { events, currentDate } = props;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.eventsContainer}>
          {events && events.map((event) => {
            const { id } = event;

            return (
              <Event
                key={id}
                event={event}
                currentDate={currentDate}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeefef',
  },
  eventsContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});

export default Schedule;

