import React, { Component } from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Event from './Event';

import {
  Actions,
} from 'react-native-router-flux';

class Events extends Component {
  render() {
    const {
      events,
      selectedDate
    } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          {events && events.map((event, index) =>
            <TouchableOpacity
              onPress={() => Actions.details({ event, selectedDate })}
              key={index}
            >
              <Event event={event} selectedDate={selectedDate} />
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#243177',
  },
});

export default Events;
