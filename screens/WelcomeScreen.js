// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Button,
  Text,
} from 'react-native-elements';
import Loading from '../components/Loading';

type Props = {
  navigation: {
    navigate: () => void,
  }
};

type State = {
  isLoading: boolean,
};

export default class WelcomeScreen extends Component<Props, State> {
  static navigationOptions = {
    header: null,
  };

  state = {
    isLoading: false,
  };

  goToGroups = (): void => {
    const { navigate } = this.props.navigation;

    navigate('Groups');
  }

  render() {
    const { isLoading } = this.state;

    if (!isLoading) {
      return (
        <View style={styles.container}>
          <Text h1 style={styles.heading}>
            Schedule
          </Text>
          <Button
            large
            rounded
            title="Перейти к выбору группы"
            onPress={this.goToGroups}
            backgroundColor="#00c26b"
          />
          <View style={styles.copyWrap}>
            <Text h4 style={styles.copy}>
              &copy; Quernest
            </Text>
          </View>
        </View>
      );
    }

    return <Loading />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eeefef',
  },
  heading: {
    marginBottom: 10,
    color: '#343434',
  },
  copyWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copy: {
    fontSize: 12,
    color: '#b2bec3',
  },
});
