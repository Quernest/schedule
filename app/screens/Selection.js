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
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';
import API from '../services/Api';
import Spinner from '../components/Spinner';

class Selection extends Component {
  state = {
    data: {},
    isLoading: true,
    searchTerm: '',
    avilableGroups: [],
    filteredGroups: [],
  };

  async componentDidMount() {
    await Promise.all([this._loadFontsAsync(), API.getAllGroups().then(res => {
      console.log(res);
      this.setState({
        avilableGroups: res,
        filteredGroups: res
      });
    })]).then(res => {
      this.setState({ isLoading: false });
    });
  }

  fetchData(id) {
    this.setState({ isLoading: true });

    return API.getJSON(`https://schedule-admin.herokuapp.com/api/group/${id}`)
      .then(resolve => {
        console.log(resolve);
        this.setState({ data: resolve });

        setTimeout(() => {
          Actions.schedule(resolve);
          this.setState({ isLoading: false });
        });
      })
      .catch(reject => {
        this.setState({ isLoading: false });
        return console.error(reject);
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

  _loadFontsAsync() {
    return Font.loadAsync({
      'RobotoCondensed-Regular': require('../../assets/fonts/RobotoCondensed-Regular.ttf'),
      'RobotoCondensed-Bold': require('../../assets/fonts/RobotoCondensed-Bold.ttf'),
      'RobotoCondensed-Light': require('../../assets/fonts/RobotoCondensed-Light.ttf')
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
    backgroundColor: '#243177'
  },
  searchBar: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    borderRadius: 3,
    fontFamily: 'RobotoCondensed-Regular',
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
    fontFamily: 'RobotoCondensed-Regular',
    color: '#fff'
  }
});

export default Selection;