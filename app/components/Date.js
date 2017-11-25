import React, { PureComponent } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

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

const styles = {
  container: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  containerActive: {
    borderBottomColor: '#fff',
  },
  day: {
    fontSize: 12,
    fontFamily: 'RobotoCondensed-Regular'
  },
  date: {
    fontSize: 24,
    fontFamily: 'RobotoCondensed-Regular'
  },
  text: {
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
  },
  textActive: {
    color: '#fff',
  },
};