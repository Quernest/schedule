import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import PropTypes from 'prop-types';
import SizeConstants from '../constants/Sizes';
import ColorConstants from '../constants/Colors';
import Loading from '../components/Loading';
import API from '../services/api.service';

const { gutter, borderRadiusNormal, fontSizeNormal } = SizeConstants;
const { lightgrey, black, white } = ColorConstants;

export default class GroupsScreen extends React.Component {
  static navigationOptions = {
    title: 'Выбор группы',
    // header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    groups: [],
    data: [],
    isLoading: true,
    searchText: '',
  };

  componentDidMount() {
    API.getGroups()
      .then((groups) => {
        this.setGroupsToState(groups);
      })
      .catch((err) => {
        console.error(err);

        this.setState({
          isLoading: false,
        });
      });
  }

  onClearSearchInput() {
    this.setState({
      searchText: undefined,
    });
  }

  setGroupsToState(groups) {
    this.setState({
      groups,
      data: groups,
      isLoading: false,
    });
  }

  handleSearchInputChange(searchText) {
    const { groups } = this.state;

    const value = searchText.toLowerCase();
    const filter = groups.filter(group => group.name.toLowerCase().includes(value));

    this.setState({
      data: filter,
      searchText,
    });
  }

  handleGroupPress(group) {
    const { id } = group;
    const { navigate } = this.props.navigation;

    navigate('Home', { id, isUseStorage: false });
  }

  render() {
    const { isLoading } = this.state;

    if (!isLoading) {
      const { data } = this.state;

      return (
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <SearchBar
              containerStyle={styles.searchBarContainer}
              inputStyle={styles.searchBarInput}
              round
              lightTheme
              onChangeText={searchText => this.handleSearchInputChange(searchText)}
              onClearText={() => this.onClearSearchInput()}
              clearIcon
              placeholder="Поиск группы"
            />
            <View containerStyle={styles.groupsContainer}>
              {data &&
                data.map((group) => {
                  const { id, name } = group;

                  return (
                    <TouchableOpacity
                      key={id}
                      style={styles.group}
                      onPress={() => this.handleGroupPress(group)}
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
    backgroundColor: lightgrey,
  },
  contentContainer: {
    marginTop: gutter,
    paddingHorizontal: gutter,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: gutter * 2,
    paddingVertical: gutter,
    marginBottom: gutter,
    borderRadius: borderRadiusNormal,
    backgroundColor: white,
  },
  groupName: {
    fontSize: fontSizeNormal,
    color: black,
  },
  groupsContainer: {
    marginTop: gutter,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarContainer: {
    margin: 0,
    marginBottom: gutter,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: lightgrey,
  },
  searchBarInput: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 40,
    backgroundColor: white,
  },
});
