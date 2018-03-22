import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#38498C" />
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
