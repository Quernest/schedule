// @flow

import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import moment from 'moment';
import type Moment from 'moment';
import Event from '../components/Event';
import type { EventType } from '../types';

type Props = {
  events: ?Array<EventType>,
  selectedDate: Moment,
};

type State = {
  currentTime: Moment,
};

export default class Schedule extends Component<Props, State> {
  state = {
    currentTime: moment(),
  }

  componentDidMount() {
    const second = 1000;

    this.interval = setInterval(this.tick, second);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  interval: IntervalID;

  tick = (): void => {
    this.setState({
      currentTime: moment(),
    });
  }

  render() {
    const { events, selectedDate } = this.props;
    const { currentTime } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.eventsContainer}>
            {events && events.map(event => (
              <Event
                key={event.id}
                event={event}
                selectedDate={selectedDate}
                currentTime={currentTime}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeefef',
  },
  eventsContainer: {
    paddingTop: 5,
    paddingHorizontal: 5,
  },
});

