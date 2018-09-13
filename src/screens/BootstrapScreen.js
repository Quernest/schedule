import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
} from 'react-native';
import Loading from '../components/Loading';
import type { DataType } from '../types';

type Props = {
  navigation: {
    navigate: () => null,
  },
}

class BootstrapScreen extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.bootstrapAsync();
  }

  bootstrapAsync = async (): void => {
    const data: DataType = await AsyncStorage.getItem('data');

    this.props.navigation.navigate(data ? 'Home' : 'Welcome');
  }

  render() {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eeefef',
  },
});

export default BootstrapScreen;
