// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { Button } from 'react-native-elements';
import type { DataType } from '../types';
import Loading from '../components/Loading';

type Props = {
  screenProps: {
    isConnected: boolean,
    data: DataType,
  },
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
    const { isConnected } = this.props.screenProps;
    const { navigate } = this.props.navigation;

    if (isConnected) {
      navigate('Groups');
    } else {
      Alert.alert('Помилка', 'Необхідно інтернет з\'єднання');
    }
  }

  render() {
    const { isLoading } = this.state;

    if (!isLoading) {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>
            Schedule
          </Text>
          <Button
            large
            rounded
            title="Перейти до вибору групи"
            onPress={this.goToGroups}
            backgroundColor="#38498c"
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
    fontFamily: 'Muli-ExtraBold',
    fontSize: 36,
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
    fontFamily: 'Muli-Regular',
    color: '#b2bec3',
  },
});
