import moment from 'moment';
import type Moment from 'moment';

const dateFormat: string = 'DD/MM/YYYY';
const dateFormatWithoutYear: string = 'DD/MM/____';
const timeFormat: string = 'H:mm:ss';

const isSameDay = (d1: Moment, d2: Moment): boolean => {
  if (d1 && d2) {
    return moment(d2.format(dateFormat), dateFormatWithoutYear)
      .isSame(moment(d1.format(dateFormat), dateFormatWithoutYear), 'day');
  }

  return false;
};

const isBetweenTime = (current: (string|Moment), start: (string|Moment), end: (string|Moment)): boolean => {
  if (start && end && current) {
    return moment(current, timeFormat)
      .isBetween(moment(start, timeFormat), moment(end, timeFormat));
  }

  return false;
};

const isBetweenMonth = (current: (string|Moment), start: (string|Moment), end: (string|Moment)) => {
  if (start && end && current) {
    return current.isBetween(
      moment(moment(new Date(start)).format(dateFormat), dateFormatWithoutYear),
      moment(moment(new Date(end)).format(dateFormat), dateFormatWithoutYear),
      'month',
      '[]',
    );
  }

  return false;
};

const isBeforeDay = (d1: Moment, d2: Moment): boolean => {
  if (d1 && d2) {
    return moment(d2.format(dateFormat), dateFormatWithoutYear)
      .isBefore(moment(d1.format(dateFormat), dateFormatWithoutYear), 'day');
  }

  return false;
};

export {
  isSameDay,
  isBeforeDay,
  isBetweenTime,
  isBetweenMonth,
  dateFormat,
  dateFormatWithoutYear,
  timeFormat,
};

// const isSameDay = (currentTime, date) => date.isSame(currentTime, 'day');

// const isBeforeDay = (currentTime, date) => date.isBefore(currentTime, 'day');

// const isBeforeTime = (currentTime, endTime) =>
//   moment(endTime, 'H:mm:ss').isBefore(currentTime, 'seconds');

// const isBetweenTime = (currentTime, startTime, endTime) => {
//   const start = moment(startTime, 'H:mm:ss');
//   const end = moment(endTime, 'H:mm:ss');

//   return currentTime.isBetween(start, end);
// };

// export {
//   isSameDay,
//   isBeforeDay,
//   isBeforeTime,
//   isBetweenTime,
//   dateFormat,
//   dateFormatWithoutYear,
//   timeFormat,
// };
