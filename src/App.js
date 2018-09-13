/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { NetInfo, View, StatusBar, StyleSheet } from 'react-native';
import moment from 'moment';
import ukLocale from 'moment/locale/uk';
import Navigator from './navigation/Navigator';

// set uk locale as default
moment.updateLocale('uk', ukLocale);

type State = {
  isConnected: boolean,
}

class App extends Component<State> {
  state = {
    isConnected: true,
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

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

  render() {
    const { isConnected } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#38498c"
          barStyle="light-content"
        />
        <Navigator screenProps={{ isConnected }} />
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

export default App;
