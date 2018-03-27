import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import humanizeDuration from 'humanize-duration';
import PropTypes from 'prop-types';
import SizeConstants from '../constants/Sizes';
import LayoutConstants from '../constants/Layout';
import ColorConstants from '../constants/Colors';
import { isSameDay, isBeforeDay, isBeforeTime, isBetweenTime } from '../helpers/helpers';

const {
  gutter, borderRadiusSmall, fontSizeSmall, fontSizeNormal, fontSizeLarge,
} = SizeConstants;
const { window: { width } } = LayoutConstants;
const { white, grey, black } = ColorConstants;

export default class Event extends React.Component {
  static propTypes = {
    event: PropTypes.shape({
      id: PropTypes.number,
      day: PropTypes.number,
      start: PropTypes.string,
      end: PropTypes.string,
      location: PropTypes.string,
      name: PropTypes.string,
      teacher: PropTypes.string,
      type: PropTypes.string,
      weekType: PropTypes.number,
    }).isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  };

  state = {
    currentTime: moment(),
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    this.setState({
      currentTime: moment(),
    });
  };

  isDisabled(event, date) {
    const { currentTime } = this.state;
    const { end } = event;

    const isWrongDay = isBeforeDay(currentTime, date);
    const isWrongTime = isSameDay(currentTime, date) && isBeforeTime(currentTime, end);

    return isWrongDay || isWrongTime;
  }

  isActive(event, date) {
    const { currentTime } = this.state;
    const { start, end } = event;

    const isRightDay = isSameDay(currentTime, date);
    const isRightTime = isBetweenTime(currentTime, start, end);

    return isRightDay && isRightTime;
  }

  willStart(start) {
    const { date } = this.props;
    const { currentTime } = this.state;
    const ms = moment(start, 'HH:mm:ss').diff(currentTime);
    const d = moment.duration(ms);
    const hours = d.hours();
    // prettier-ignore
    const minutes = (hours * 60) + d.minutes();

    if (minutes >= 0 && minutes < 20 && isSameDay(currentTime, date)) {
      return {
        in: humanizeDuration(d, {
          language: 'ru',
          round: true,
          units: ['h', 'm', minutes < 1 && 's'],
        }),
      };
    }

    return false;
  }

  willEnd(end) {
    const { date } = this.props;
    const { currentTime } = this.state;
    const ms = moment(end, 'HH:mm:ss').diff(currentTime);
    const d = moment.duration(ms);
    const hours = d.hours();
    // prettier-ignore
    const minutes = (hours * 60) + d.minutes();

    if (isSameDay(currentTime, date)) {
      return {
        in: humanizeDuration(d, {
          language: 'ru',
          round: true,
          units: ['h', 'm', minutes < 1 && 's'],
        }),
      };
    }

    return false;
  }

  render() {
    const { event, date } = this.props;
    const {
      name, location, start, end,
    } = event;

    const formattedStartTime = moment(start, 'HH:mm:ss').format('H:mm');
    const formattedEndTime = moment(end, 'HH:mm:ss').format('H:mm');

    const showWillEndNotify = this.isActive(event, date) && this.willEnd(end);
    const showWillStartNotify = !this.isActive(event, date) && this.willStart(start);

    return (
      <View style={[styles.container, this.isDisabled(event, date) && styles.disabled]}>
        <View>
          <Text style={styles.time}>
            {formattedStartTime} - {formattedEndTime}
          </Text>
          <Text style={styles.name}>{name}</Text>
          {showWillEndNotify && <Text style={styles.notify}>До конца: {this.willEnd(end).in}</Text>}
          {showWillStartNotify && (
            <Text style={styles.notify}>До начала: {this.willStart(start).in}</Text>
          )}
        </View>
        <View style={styles.location}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
            size={fontSizeNormal}
            style={styles.locationIcon}
          />
          <Text style={styles.locationValue}>{location}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: borderRadiusSmall,
    padding: gutter * 2,
    marginBottom: gutter,
    backgroundColor: white,
  },
  name: {
    width: width * 0.6,
    marginTop: gutter / 2,
    marginBottom: gutter / 2,
    fontWeight: 'normal',
    fontSize: fontSizeNormal,
    color: black,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 2.5,
    color: grey,
  },
  locationValue: {
    fontWeight: 'bold',
    fontSize: fontSizeNormal,
    color: grey,
  },
  time: {
    fontWeight: 'bold',
    fontSize: fontSizeLarge,
    color: black,
  },
  disabled: {
    opacity: 0.5,
  },
  notify: {
    fontSize: fontSizeSmall,
    color: grey,
  },
});
