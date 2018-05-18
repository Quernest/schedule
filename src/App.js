/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  NetInfo,
  Alert,
} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import store from 'react-native-simple-store';
import moment from 'moment';
import ukLocale from 'moment/locale/uk';
import createRootNavigator from './navigation/RootNavigation';
import Loading from './components/Loading';
import type { DataType } from './types';

// set uk locale as default
moment.updateLocale('uk', ukLocale);

type State = {
  isLoading: boolean,
  data: DataType,
};

export default class App extends Component<State> {
  state = {
    isLoading: true,
    data: null,
  };

  componentDidMount() {
    this.checkDataInStore();
  }

  checkDataInStore = async (): void => {
    const data: DataType = await store.get('data');

    if (data !== null) {
      this.setState({
        data,
      });
    }

    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { isLoading, data } = this.state;

    if (!isLoading) {
      const RootNavigation = createRootNavigator(data);

      return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#38498c"
            barStyle="light-content"
          />
          <RootNavigation screenProps={{ data }} />
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
