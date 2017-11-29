import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';
import API from '../services/Api';

class Selection extends Component {
  state = {
    data: {},
    isLoading: true
  };

  componentDidMount() {
    this.fetchData();  
  }

  fetchData() {
    return API.getData()
    .then(res => {
      this.setState({ isLoading: true });
      return res.json();
    })
    .then(resJson =>
      this.setState({
        isLoading: false,
        data: resJson
      }))
    .catch(err => {
      this.setState({
        isLoading: false,
      })
      return console.log(err);
    })
  }

  render() {
    const {
      isLoading,
      data
    } = this.state;

    return (
      <View style={styles.container}>
        <Button
          onPress={() => Actions.schedule(!isLoading && data)}
          title="IT-14-1"
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