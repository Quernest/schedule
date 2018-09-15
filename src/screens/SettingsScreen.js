// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  Text,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import { DataType } from '../types';

type Props = {
  screenProps: {
    isConnected: boolean,
    data: DataType,
  },
  navigation: {
    dispatch: () => null,
  },
};

export default class SettingsScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Налаштування',
  }

  state = {
    group: {
      id: undefined,
      name: '',
    },
  }

  componentDidMount() {
    this.getAsyncCurrentGroup();
  }

  getAsyncCurrentGroup = async () => {
    const data = await AsyncStorage.getItem('data');
    const parsedData = JSON.parse(data);

    this.setState({
      group: parsedData.group,
    });
  }

  goToGroups = (): void => {
    const navigateAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Groups' })],
    });

    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    const { screenProps } = this.props;
    const { isConnected } = screenProps;
    const { group } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.swtichGroup}>
          {group && <Text style={styles.groupLabel}>Ваша група: {group.name}</Text>}
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
    flex: 1,
    backgroundColor: '#eeefef',
  },
  swtichGroup: {
    marginTop: 10,
  },
  groupLabel: {
    marginLeft: 15,
    marginBottom: 10,
    marginRight: 15,
  },
});
