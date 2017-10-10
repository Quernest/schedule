import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Event from './Event';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#243177',
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

