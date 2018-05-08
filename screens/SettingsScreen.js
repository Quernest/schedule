// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { translate } from 'react-i18next';
import { Button } from 'react-native-elements';

type Props = {
  navigation: {
    navigate: () => void,
  },
};

@translate(['settings'], { wait: true })
export default class SettingsScreen extends Component<Props> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('settings:title'),
  });

  componentDidMount() {
    console.log(this.props);
  }

  goToGroups = (): void => {
    const { navigate } = this.props.navigation;

    navigate('Groups');
  }

  render() {
    const { t, i18n, navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.swtichGroup}>
          <Button
            rounded
            title={t('settings:buttons:changeGroup')}
            onPress={this.goToGroups}
            backgroundColor="#38498c"
          />
          <Button
            rounded
            title={'en'}
            onPress={() => i18n.changeLanguage('en')}
            backgroundColor="#38498c"
          />
          <Button
            rounded
            title={'ru'}
            onPress={() => i18n.changeLanguage('ru')}
            backgroundColor="#38498c"
          />
          <Button
            rounded
            title={'uk'}
            onPress={() => i18n.changeLanguage('uk')}
            backgroundColor="#38498c"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  swtichGroup: {
    marginTop: 10,
  },
});
