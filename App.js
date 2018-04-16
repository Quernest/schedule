import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  AppLoading,
  Asset,
  Font,
} from 'expo';
import { Ionicons } from '@expo/vector-icons';

import ColorConstants from './constants/Colors';
import RootNavigation from './navigation/RootNavigation';

const { lightgrey } = ColorConstants;

export default class App extends Component {
  state = {
    isLoadingComplete: false,
  };

  loadResourcesAsync = async () => {
    Promise.all([
      Asset.loadAsync([]),
      Font.loadAsync({
        ...Ionicons.font,
      }),
    ]);
  }

  handleLoadingError(error) {
    console.warn(error);
  }

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  }

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        <RootNavigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightgrey,
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: lightgrey,
  },
});
