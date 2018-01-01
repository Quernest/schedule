import React, { PureComponent } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Dates from './Dates';
import moment from 'moment';

const {
  width: screenWidth
} = Dimensions.get('window');

const formatMonth = (date) => {
  return date.format('MMMM');
}

const formatYear = (date) => {
  return date.format('YYYY');
}

class Calendar extends PureComponent {
  static defaultProps = {
    showDaysBeforeCurrent: 2,
    showDaysAfterCurrent: 5,
  };

  _scrollView;

  constructor(props) {
    super(props);
    this.state = {
      allDatesHaveRendered: false,
      currentDateIndex: props.showDaysBeforeCurrent,
      dates: this.getDates(),
      dayWidths: undefined,
      scrollPositionX: 0,
      visibleMonths: undefined,
      visibleYears: undefined,
    }
  }

  getVisibleDates = () => {  
    const {
      dates,
      dayWidths,
      scrollPositionX,
    } = this.state;

    if (!dayWidths) {
      return;
    }

    let datePositionX = 0;
    let firstVisibleDateIndex = undefined;
    let lastVisibleDateIndex = undefined;

    Object.values(dayWidths).some((width, index) => {

      if (firstVisibleDateIndex === undefined
        && datePositionX >= scrollPositionX
      ) {
        firstVisibleDateIndex = index > 0 ? index - 1 : index;
      }

      if (lastVisibleDateIndex === undefined
        && datePositionX >= scrollPositionX + screenWidth
      ) {
        lastVisibleDateIndex = index;
      }

      datePositionX += width;

      return !!(firstVisibleDateIndex && lastVisibleDateIndex);
    });

    return dates.slice(firstVisibleDateIndex, lastVisibleDateIndex);
  };

  getVisibleMonthAndYear = () => {
    const {
      dates,
      visibleMonths,
      visibleYears,
    } = this.state;

    if (!visibleMonths || !visibleYears) {
      if (dates) {
        const firstDate = dates[0];
        return `${formatMonth(firstDate)}, ${formatYear(firstDate)}`;
      }
      return undefined;
    }

    if (visibleYears.length === 1) {
      return `${visibleMonths.join(' – ')},  ${visibleYears[0]}`;
    }

    return visibleMonths
      .map((month, index) => `${month}, ${visibleYears[index]}`)
      .join(' – ');
  };

  updateVisibleMonthAndYear = () => {
    const { allDatesHaveRendered } = this.state;

    if (!allDatesHaveRendered) {
      return;
    }

    const visibleDates = this.getVisibleDates();

    if (!visibleDates) {
      return;
    }

    let visibleMonths = [];
    let visibleYears = [];

    visibleDates.forEach((date) => {
      const month = formatMonth(date);
      const year = formatYear(date);
      if (!visibleMonths.includes(month)) {
        visibleMonths.push(month);
      }
      if (!visibleYears.includes(year)) {
        visibleYears.push(year);
      }
    });

    this.setState({
      visibleMonths,
      visibleYears,
    });
  };

  getDates = () => {
    const {
      currentDate,
      showDaysBeforeCurrent,
      showDaysAfterCurrent,
    } = this.props;

    const startDay = moment(currentDate || undefined)
      .subtract(showDaysBeforeCurrent + 1, 'days');

    const totalDaysCount = showDaysBeforeCurrent + showDaysAfterCurrent + 1;

    return [...Array(totalDaysCount)]
      .map(_ => startDay.add(1, 'day').clone());
  }

  onScroll = (event, nativeEvent) => {
    const { nativeEvent: { contentOffset: { x } } } = event;
    this.setState({ scrollPositionX: x }, this.updateVisibleMonthAndYear);
  };


  onSelectDay = (index) => {
    const { dates } = this.state;
    const { onSelectDate } = this.props;
    this.setState({ currentDateIndex: index });
    onSelectDate(dates[index]);
  };

  onRenderDay = (index, width) => {
    const { dayWidths } = this.state;
    const {
      showDaysBeforeCurrent,
      showDaysAfterCurrent,
    } = this.props;

    const allDatesHaveRendered = dayWidths
      && Object.keys(dayWidths).length >= showDaysBeforeCurrent + showDaysAfterCurrent;

    this.setState(prevState => ({
      allDatesHaveRendered,
      dayWidths: {
        ...prevState.dayWidths,
        [index]: width,
      },
    }));
  };

  render() {
    const {
      dates,
      currentDateIndex,
    } = this.state;
    const visibleMonthAndYear = this.getVisibleMonthAndYear();

    return (
      <View>
        <Text style={styles.visibleMonthAndYear}>
          {visibleMonthAndYear}
        </Text>
        <ScrollView
          ref={scrollView => { this._scrollView = scrollView; }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={100}
          onScroll={this.onScroll}
        >
          <Dates
            dates={dates}
            currentDateIndex={currentDateIndex}
            onSelectDay={this.onSelectDay}
            onRenderDay={this.onRenderDay}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  visibleMonthAndYear: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 21,
    color: '#fff',
    paddingHorizontal: 15,
    fontFamily: 'RobotoCondensed-Bold',
    backgroundColor: '#1B1F22'
  },
});

export default Calendar;