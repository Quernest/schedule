// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Button } from 'react-native-elements';
import type { DataType } from '../types';

type Props = {
  screenProps: {
    isConnected: boolean,
    data: DataType,
  },
  navigation: {
    navigate: () => void,
  },
};

export default class SettingsScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Налаштування',
  }

  goToGroups = (): void => {
    const { navigate } = this.props.navigation;

    navigate('Groups');
  }

  render() {
    const { screenProps } = this.props;
    const { isConnected } = screenProps;

    return (
      <View style={styles.container}>
        <View style={styles.swtichGroup}>
          <Button
            rounded
            title="Змінити групу"
            onPress={this.goToGroups}
            backgroundColor="#38498c"
            disabled={!isConnected}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  swtichGroup: {
    marginTop: 10,
  },
});
