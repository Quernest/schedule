import React, { Component } from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Alert
} from 'react-native';
import Event from './Event';
import {
  EVENTS_BACKGROUND_COLOR,
} from '../helpers/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EVENTS_BACKGROUND_COLOR,
  },
});

class Events extends Component {
  render() {
    const { navigate, events, selectedDate } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          {events && events.map((event, index) =>
            <TouchableOpacity
              onPress={() => navigate("Third", { event, selectedDate })}
              key={index}
            >
              <Event event={event} />
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default Events;
