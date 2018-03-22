import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import ColorConstants from '../constants/Colors';

const { lightblue } = ColorConstants;

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={lightblue} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
