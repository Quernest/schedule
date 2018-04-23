// @flow

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

import RootNavigation from './navigation/RootNavigation';

type Props = {
  skipLoadingScreen: boolean,
};

type State = {
  isLoadingComplete: boolean,
};

export default class App extends Component<Props, State> {
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

  handleLoadingError = (error): void => {
    console.warn(error);
  }

  handleFinishLoading = (): void => {
    this.setState({
      isLoadingComplete: true,
    });
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
    backgroundColor: '#eeefef',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: '#00c26b',
  },
});
