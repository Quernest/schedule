// @flow

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

const isBetweenTime = (
  current: Moment,
  start: (string|Moment),
  end: (string|Moment),
): boolean => {
  if (current && start && end) {
    return moment(current, timeFormat)
      .isBetween(moment(start, timeFormat), moment(end, timeFormat));
  }

  return false;
};

const isBeforeTime = (current: Moment, end: (string|Moment)): boolean => {
  if (current && end) {
    return moment(end, timeFormat).isBefore(current, 'seconds');
  }

  return false;
};

const isBetweenMonth = (
  current: Moment,
  start: (string|Moment),
  end: (string|Moment),
) => {
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

const parseSubjectType = (type: number): ?string => {
  switch (type) {
    case 1:
      return 'Лекция';
    case 2:
      return 'Практика';
    default: return null;
  }
};

export {
  isSameDay,
  isBeforeDay,
  isBetweenTime,
  isBeforeTime,
  isBetweenMonth,
  dateFormat,
  dateFormatWithoutYear,
  timeFormat,
  parseSubjectType,
};
