import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import SizeConstants from '../constants/Sizes';
import ColorConstants from '../constants/Colors';
import { isEmptyObject } from '../helpers/helpers';
import API from '../services/api.service';

const { gutter, fontSizeSmall } = SizeConstants;
const {
  steel, lightblue, lightgrey, black,
} = ColorConstants;

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    isLoading: true,
  };

  async componentDidMount() {
    const { replace } = this.props.navigation;

    try {
      const data = await API.getGroupAllData(undefined, true);

      if (!isEmptyObject(data)) {
        replace('Main', { data });
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  stopLoading() {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { isLoading } = this.state;

    if (!isLoading) {
      return (
        <View style={styles.container}>
          <Text h1 style={styles.heading}>
            Schedule
          </Text>
          <Button
            large
            rounded
            title="Перейти к выбору группы"
            onPress={() => navigate('Groups')}
            backgroundColor={lightblue}
          />
          <View style={styles.copyWrap}>
            <Text h4 style={styles.copy}>
              &copy; Quernest
            </Text>
          </View>
        </View>
      );
    }

    return <Loading />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightgrey,
  },
  heading: {
    marginBottom: gutter,
    color: black,
  },
  copyWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: gutter * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copy: {
    marginTop: gutter * 5,
    fontSize: fontSizeSmall,
    color: steel,
  },
});
