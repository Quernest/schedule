import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Date from './Date';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default class Dates extends PureComponent {
  render() {
    const {
      currentDateIndex,
      dates,
      onSelectDay,
      onRenderDay,
    } = this.props;
    return (
      <View style={styles.container}>
        {dates.map((date, index) =>
          <View key={index}>
            <Date
              date={date}
              index={index}
              isActive={index === currentDateIndex}
              onPress={onSelectDay}
              onRender={onRenderDay}
              key={index}
            />
          </View>
        )}
      </View>
    );
  }
}
