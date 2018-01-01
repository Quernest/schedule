import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Button,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';

function changeGroup() {
  AsyncStorage.clear();
  Actions.selection();
}

export default class Settings extends Component {
  state = {};

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Button
            onPress={() => changeGroup()}
            style={styles.buttonStyle}
            title='Сменить группу'
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7.5,
    paddingVertical: 15,
  },
  text: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: '#1B1F22',
  }
});
