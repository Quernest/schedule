import React, { Component } from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Event from './Event';
import { colorScheme } from '../config';

import {
  Actions,
} from 'react-native-router-flux';

class Events extends Component {
  render() {
    const { events, selectedDate } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          {events && events.map((event, index) => {
            const { type } = event;

            if (type !== '') {
              return <TouchableOpacity
                onPress={() => Actions.details({ event, selectedDate })}
                key={index}
              >
                <Event event={event} selectedDate={selectedDate} />
              </TouchableOpacity>
            }

            return <Event key={index} event={event} selectedDate={selectedDate} />
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme.white.background,
  },
});

export default Events;
