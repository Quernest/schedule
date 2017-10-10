import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class Event extends Component {
  render() {
    const { event } = this.props;
    return (
      <View style={styles.container}>
        Events will be here
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: 'rgba(255, 255, 255, .1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 15,
  },
});