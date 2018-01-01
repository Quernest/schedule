import React, { Component } from 'react';
import { AppLoading, Font } from 'expo';
import { AsyncStorage } from 'react-native';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';

import Selection from './app/screens/Selection';
import Schedule from './app/screens/Schedule';
import Details from './app/screens/Details';
import Settings from './app/screens/Settings';

const assets = {
  fonts: {
    'RobotoCondensed-Regular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
    'RobotoCondensed-Light': require('./assets/fonts/RobotoCondensed-Light.ttf'),
    'RobotoCondensed-Bold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      isCached: false,
      group: {}, // object with semester, schedule, group etc.
    };
  }

  async componentWillMount() {
    try {
      const group = await AsyncStorage.getItem('group');
    
      if (group !== null) {
        this.setState({
          isCached: true,
          group: JSON.parse(group),
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async loadAssets() {
    const { fonts } = assets;

    await Promise.all([Font.loadAsync(fonts)]);
  }

  render() {
    const { isReady, isCached, group } = this.state;

    if (!isReady) {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Router backAndroidHandler={() => Actions.pop()}>
        <Stack key="root">
          <Scene key="selection" component={Selection} hideNavBar />
          <Scene key="schedule" component={Schedule} hideNavBar initial={isCached} group={group} />
          <Scene key="details" component={Details} />
          <Scene key="settings" component={Settings} />
        </Stack>
      </Router>
    );
  }
}

