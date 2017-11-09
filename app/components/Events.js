import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
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

export default class Events extends Component {
  render() {
    const { events } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          {events && events.map((event, index) =>
            <Event event={event} key={index} />)}
        </ScrollView>
      </View>
    );
  }
}

