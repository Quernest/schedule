/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  NetInfo,
} from 'react-native';
import store from 'react-native-simple-store';
import moment from 'moment';
import ukLocale from 'moment/locale/uk';
import createRootNavigator from './navigation/RootNavigation';
import Loading from './components/Loading';
import type { DataType } from './types';

// set uk locale as default
moment.updateLocale('uk', ukLocale);

type State = {
  isConnected: boolean,
  isLoading: boolean,
  data: DataType,
};

export default class App extends Component<State> {
  state = {
    isConnected: true,
    isLoading: true,
    data: null,
  };

  componentDidMount() {
    this.checkDataInStore();

    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  rootNavigation = createRootNavigator();

  handleConnectionChange = (isConnected: boolean): void => {
    if (isConnected) {
      setTimeout(() => {
        this.setState({
          isConnected,
        });
      }, 2500);
    } else {
      this.setState({
        isConnected,
      });
    }
  }

  checkDataInStore = async (): void => {
    const data: DataType = await store.get('data');

    if (data !== null) {
      this.rootNavigation = createRootNavigator(data);

      this.setState({
        data,
      });
    }

    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { isConnected, isLoading, data } = this.state;

    // HOC
    const RootNavigation = this.rootNavigation;

    if (!isLoading) {
      return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#38498c"
            barStyle="light-content"
          />
          <RootNavigation screenProps={{ isConnected, data }} />
        </View>
      );
    }

    return <Loading />;
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
