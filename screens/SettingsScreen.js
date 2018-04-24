// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Button } from 'react-native-elements';

type Props = {
  navigation: {
    navigate: () => void,
  },
};

export default class SettingsScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Настройки',
  };

  goToGroups = (): void => {
    const { navigate } = this.props.navigation;

    navigate('Groups');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.swtichGroup}>
          <Button
            rounded
            title="Сменить группу"
            onPress={this.goToGroups}
            backgroundColor="#38498c"
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
