import React, { Component } from 'react';
import { Constants } from 'expo';
import * as Progress from 'react-native-progress';
import { View, StyleSheet, Dimensions } from 'react-native';
import { colorScheme } from '../config';
const { width } = Dimensions.get('window');

const Spinner = () => (
  <View style={styles.spinnerContainer}>
    <Progress.CircleSnail
      size={width * 0.25}
      thickness={7.5}
      color={colorScheme.white.text}
    />
  </View>
);

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorScheme.white.background,
    padding: 15,
    paddingTop: Constants.statusBarHeight + 7.5,
  },
});

export default Spinner;
