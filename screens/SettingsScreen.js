import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import SizeConstants from '../constants/Sizes';
import ColorConstants from '../constants/Colors';

const { gutter } = SizeConstants;
const { lightblue } = ColorConstants;

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Настройки',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.swtichGroup}>
          <Button
            rounded
            title="Сменить группу"
            onPress={() => navigate('Groups')}
            backgroundColor={lightblue}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: gutter,
  },
  swtichGroup: {
    marginTop: gutter,
  },
});
