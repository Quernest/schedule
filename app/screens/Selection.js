import { Font, Constants } from 'expo';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';
import Spinner from '../components/Spinner';
import { colorScheme } from '../config';
import API from '../services/api';

class Selection extends Component {
  state = {
    data: {},
    isLoading: true,
    searchTerm: '',
    avilableGroups: [],
    filteredGroups: [],
  };

  componentDidMount() {
    API.get('groups').then(res => {
      const { data } = res;

      this.setState({
        avilableGroups: data,
        filteredGroups: data,
        isLoading: false,
      });
    }).catch((err) => this.setState({ isLoading: false }));
  }

  fetchData(id) { // TODO: rewrite this method
    this.setState({ isLoading: true });

    API.get('group', id)
      .then((res) => {
        const { data } = res;
        this.setState({ data, isLoading: false });

        AsyncStorage.setItem('group', JSON.stringify(data));
        Actions.schedule({ group: data });
      })
      .catch((err) => {
        console.log(err); // TODO: check this
      });
  }

  filterSearch(searchTerm) {
    const { avilableGroups } = this.state;
    const filteredGroups = avilableGroups.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

    this.setState({
      searchTerm,
      filteredGroups,
    });
  }
  
  render() {
    const {
      isLoading,
      data,
      filteredGroups,
      searchTerm,
    } = this.state;

    if (isLoading) {
      return (
        <Spinner />
      );
    }

    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.searchBar}
            onChangeText={(searchTerm) => this.filterSearch(searchTerm)}
            value={searchTerm}
            underlineColorAndroid='transparent'
            placeholder="Поиск"
          />
        </View>
        <ScrollView style={styles.groups}>
          {filteredGroups.map((group, index) => (
            <TouchableOpacity key={index} onPress={() => this.fetchData(group.id)}>
              <View style={styles.group}>
                <Text style={styles.groupName}>{group.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7.5,
    paddingVertical: 15,
    backgroundColor: colorScheme.white.background,
  },
  searchBar: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    borderRadius: 3,
    fontFamily: 'RobotoCondensed-Regular',
    backgroundColor: '#F6F6F6',
    color: '#333',
  },
  groups: {
    // paddingHorizontal: 15
  },
  group: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 7.5,
    borderRadius: 3,
    backgroundColor: "#1B1F22",
  },
  groupName: {
    fontFamily: 'RobotoCondensed-Regular',
    color: '#fff'
  }
});

export default Selection;