import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';
import {
  EVENTS_BACKGROUND_COLOR,
  PADDING_DEFAULT,
} from '../helpers/constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: PADDING_DEFAULT,
    backgroundColor: EVENTS_BACKGROUND_COLOR
  },
});

class MainScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Button
          title="Далее"
          onPress={() => navigate('Second')}
        />
      </View>
    );
  }
}

export default MainScreen;