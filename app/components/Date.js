import React, { PureComponent } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import {
  DATE_COLOR,
  DATE_COLOR_ACTIVE,
  DAY_FONT_SIZE,
  DATE_FONT_SIZE,
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
  BORDER_WIDTH_DEFAULT,
  BOLD,
  REGULAR,
} from '../helpers/constants';

const styles = {
  container: {
    borderBottomColor: 'transparent',
    borderBottomWidth: BORDER_WIDTH_DEFAULT,
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: PADDING_VERTICAL,
  },
  containerActive: {
    borderBottomColor: DATE_COLOR_ACTIVE,
  },
  day: {
    fontSize: DAY_FONT_SIZE,
    fontFamily: REGULAR
  },
  date: {
    fontSize: DATE_FONT_SIZE,
    fontFamily: REGULAR
  },
  text: {
    color: DATE_COLOR,
    textAlign: 'center',
  },
  textActive: {
    color: DATE_COLOR_ACTIVE,
  },
};

export default class Date extends PureComponent {
  getContainerStyle = () => ({
    ...styles.container,
    ...(this.props.isActive ? styles.containerActive : {})
  });
  getDayStyle = () => ({
    ...styles.text,
    ...styles.day,
    ...(this.props.isActive ? styles.textActive : {})
  });
  getDateStyle = () => ({
    ...styles.text,
    ...styles.date,
    ...(this.props.isActive ? styles.textActive : {})
  });
  onLayout = (event, nativeEvent) => {
    const {
      index,
      onRender,
    } = this.props;
    const { nativeEvent: { layout: { width } } } = event;
    onRender(index, width);
  };
  onPress = () => {
    const { index, onPress } = this.props;
    onPress(index);
  };
  render() {
    const { date } = this.props;
    return (
      <TouchableOpacity
        style={this.getContainerStyle()}
        onLayout={this.onLayout}
        onPress={this.onPress}
      >
        <Text style={this.getDayStyle()}>{date.format('ddd').toUpperCase()}</Text>
        <Text style={this.getDateStyle()}>{date.format('DD')}</Text>
      </TouchableOpacity>
    );
  }
}