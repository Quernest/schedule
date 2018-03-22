import moment from 'moment';
import ScheduleConstants from '../constants/Schedule';

const { ODD, EVEN } = ScheduleConstants;

const isSameDay = (currentTime, date) => date.isSame(currentTime, 'day');

const isBeforeDay = (currentTime, date) => date.isBefore(currentTime, 'day');

const isBeforeTime = (currentTime, endTime) =>
  moment(endTime, 'H:mm:ss').isBefore(currentTime, 'seconds');

const isBetweenTime = (currentTime, startTime, endTime) => {
  const start = moment(startTime, 'H:mm:ss');
  const end = moment(endTime, 'H:mm:ss');

  return currentTime.isBetween(start, end);
};

const isSameWeekDay = (day, date) => day === moment(date).isoWeekday();

const isSameWeekType = (weekType, semester, date) => {
  const { start, firstWeekType } = semester;
  const current = moment(start, 'DD-MM-YYYY').clone();
  const days = [];
  let currentWeekType;
  let i = 0;

  while (current.day(7).isBefore(date)) {
    i += 1;
    days.push(current.clone());
  }

  if (i % 2 !== 0) {
    currentWeekType = firstWeekType === ODD ? ODD : EVEN;
  } else {
    currentWeekType = firstWeekType === EVEN ? ODD : EVEN;
  }

  return weekType === currentWeekType;
};

const isEmptyObject = (obj) => {
  if (obj && typeof obj === 'object') {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
  }

  return true;
};

export {
  isSameDay,
  isBeforeDay,
  isBeforeTime,
  isBetweenTime,
  isEmptyObject,
  isSameWeekDay,
  isSameWeekType,
};
