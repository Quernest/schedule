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

export default class Events extends Component {

  _onPressEvent(event) {}

  render() {
    const { events } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          {events && events.map((event, index) =>
            <TouchableOpacity 
              onPress={this._onPressEvent.bind(this, event)}
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

