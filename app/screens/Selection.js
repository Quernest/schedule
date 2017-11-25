import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  StatusBar,
} from 'react-native';

class Selection extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const {
      navigate
    } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Button
          title="Далее"
          onPress={() => navigate('Schedule')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 15,
    backgroundColor: '#243177'
  },
});

export default Selection;