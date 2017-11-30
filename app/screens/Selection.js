import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';
import API from '../services/Api';

const avilableGroups = [
  'ИТ-14-1',
  'ИТ-14-2',
];

class Selection extends Component {
  state = {
    data: {},
    isLoading: true,
    searchTerm: '',
    groups: avilableGroups,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    return API.getData()
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

  filterSearch(searchTerm) {
    const filteredGroups = avilableGroups.filter(item => {
      return item.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

    this.setState({
      searchTerm,
      groups: filteredGroups
    });
  }
  
  render() {
    const {
      isLoading,
      data,
      groups
    } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.searchBar}
            onChangeText={(searchTerm) => this.filterSearch(searchTerm)}
            underlineColorAndroid='transparent'
            placeholder="Поиск"
          />
        </View>
        <ScrollView style={styles.groups}>
          {groups.map((g, i) => (
            <TouchableOpacity key={i} onPress={() => Actions.schedule(!isLoading && data)}>
              <View style={styles.group}>
                <Text style={styles.groupName}>{g}</Text>
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
    backgroundColor: '#243177'
  },
  searchBar: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    borderRadius: 3,
    backgroundColor: '#FFF',
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
    backgroundColor: '#3F53B1',
  },
  groupName: {
    color: '#fff'
  }
});

export default Selection;