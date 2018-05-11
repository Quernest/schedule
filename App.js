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
  Font,
} from 'expo';
import { Ionicons } from '@expo/vector-icons';
import store from 'react-native-simple-store';
import moment from 'moment';
import ukLocale from 'moment/locale/uk';
import createRootNavigator from './navigation/RootNavigation';
import type { DataType } from './types';

// set uk locale as default
moment.updateLocale('uk', ukLocale);

type Props = {
  skipLoadingScreen: boolean,
};

type State = {
  isLoadingComplete: boolean,
  // data with group, semesters, schedule etc.
  data: DataType,
};

export default class App extends Component<Props, State> {
  state = {
    isLoadingComplete: false,
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
  }

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
    const { isLoadingComplete, data } = this.state;
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

    const RootNavigation = createRootNavigator(data);

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#38498c"
        />
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        <RootNavigation screenProps={{ data }} />
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
