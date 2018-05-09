// @flow

import moment from 'moment';
import type Moment from 'moment';

const dateFormat: string = 'DD/MM/YYYY';
const dateFormatMySQL: string = 'YYYY-MM-DD';
const timeFormat: string = 'HH:mm:ss';
const timeFormatWithoutSeconds: string = 'HH:mm';

const isSameDay = (d1: Moment, d2: Moment): boolean => {
  if (d1 && d2) {
    return d2.isSame(d1, 'day');
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

const isBeforeDay = (d1: Moment, d2: Moment): boolean => {
  if (d1 && d2) {
    return d2.isBefore(d1, 'day');
  }

  return false;
};

const parseSubjectType = (type: number): ?string => {
  switch (type) {
    case 1:
      return 'Лекція';
    case 2:
      return 'Практика';
    default: return null;
  }
};

const splitStringWhiteSpace = (str: string) => str.match(/^(\S+)\s(.*)/).slice(1);

const isEven = (n: number): boolean => n % 2 === 0;

const isOdd = (n: number): boolean => Math.abs(n % 2) === 1;

export {
  isSameDay,
  isBeforeDay,
  isBetweenTime,
  isBeforeTime,
  dateFormat,
  dateFormatMySQL,
  timeFormat,
  timeFormatWithoutSeconds,
  parseSubjectType,
  splitStringWhiteSpace,
  isOdd,
  isEven,
};

