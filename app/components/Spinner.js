import React, { Component } from 'react';
import { Constants } from 'expo';
import * as Progress from 'react-native-progress';

import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Spinner = () => (
  <View style={styles.spinnerContainer}>
    <Progress.CircleSnail
      size={width * 0.5}
      thickness={7.5}
      color={'rgb(236, 240, 241)'}
    />
  </View>
);

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#243177',
    padding: 15,
    paddingTop: Constants.statusBarHeight + 7.5,
  },
});

export default Spinner;
