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
    const fonts = {
      ...Ionicons.font,
      'Muli-ExtraBold': require('./assets/fonts/Muli-ExtraBold.ttf'),
      'Muli-Light': require('./assets/fonts/Muli-Light.ttf'),
      'Muli-Regular': require('./assets/fonts/Muli-Regular.ttf'),
      'Muli-Bold': require('./assets/fonts/Muli-Bold.ttf'),
    };

    await Font.loadAsync(fonts);
  };

  handleFinishLoading() {
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
          onError={console.error}
          onFinish={() => this.handleFinishLoading()}
        />
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#38498c"
        />
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
    backgroundColor: '#38498c',
  },
});
