// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import store from 'react-native-simple-store';
import Loading from '../components/Loading';
import API from '../services/api.service';
import type { GroupType } from '../types';

type Props = {
  navigation: {
    navigate: () => void,
  }
};

type State = {
  groups: Array<GroupType>,
  filteredGroups: Array<GroupType>,
  isLoading: boolean,
  searchText: string,
};

export default class GroupsScreen extends Component<Props, State> {
  static navigationOptions = {
    title: 'Вибір групи',
  };

  state = {
    groups: [],
    filteredGroups: [],
    isLoading: true,
    searchText: '',
  };

  componentDidMount() {
    this.getGroups();
  }

  onClearSearchInput = (): void => {
    this.setState({
      searchText: undefined,
    });
  }

  getGroups = async (): void => {
    try {
      const groups = await API.getGroups();

      this.setGroupsToState(groups);
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  setGroupsToState = (groups: Array<GroupType>): void => {
    this.setState({
      groups,
      filteredGroups: groups,
    });
  }

  handleSearchInputChange = (searchText: string): void => {
    const { groups } = this.state;

    const value = searchText.toLowerCase();
    const filter = groups.filter(group => group.name.toLowerCase().includes(value));

    this.setState({
      filteredGroups: filter,
      searchText,
    });
  }

  goToHomeScreen = (group: GroupType): void => {
    const { navigate } = this.props.navigation;
    const { id } = group;

    store.delete('data').then(_ => navigate('Home', { id }));
  };

  render() {
    const { isLoading } = this.state;

    if (!isLoading) {
      const { filteredGroups } = this.state;

      return (
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <SearchBar
              containerStyle={styles.searchBarContainer}
              inputStyle={styles.searchBarInput}
              round
              lightTheme
              onChangeText={searchText => this.handleSearchInputChange(searchText)}
              onClearText={this.onClearSearchInput}
              clearIcon
              placeholder="Пошук групи"
            />
            <View containerStyle={styles.groupsContainer}>
              {filteredGroups &&
                filteredGroups.map((group) => {
                  const { id, name } = group;

                  return (
                    <TouchableOpacity
                      key={id}
                      style={styles.group}
                      onPress={() => this.goToHomeScreen(group)}
                    >
                      <Text style={styles.groupName}>{name}</Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </ScrollView>
        </View>
      );
    }

    return <Loading />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeefef',
  },
  contentContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  groupName: {
    fontSize: 14,
    color: '#343434',
  },
  groupsContainer: {
    marginTop: 10,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarContainer: {
    margin: 0,
    marginBottom: 10,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: '#eeefef',
  },
  searchBarInput: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 40,
    backgroundColor: '#fff',
  },
});
