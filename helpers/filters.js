// @flow

import moment from 'moment';
import type Moment from 'moment';
import type { EventType, SemesterType } from '../types';
import { dateFormat, dateFormatWithoutYear, isBetweenMonth } from './helpers';

const filterEvents = (currentDate: Moment, semesters?: Array<SemesterType>): Array<EventType> => {
  let currentSemester: SemesterType;

  // detect current semester
  if (semesters && semesters.length) {
    semesters.map((semester) => {
      const { start, end } = semester;

      if (isBetweenMonth(currentDate, start, end)) {
        currentSemester = semester;
      }

      return semester;
    });
  }

  const {
    schedule,
    end,
    start,
    firstWeekType,
  } = currentSemester;

  const startDate = moment(new Date(start)).format(dateFormat);
  const endDate = moment(new Date(end)).format(dateFormat);

  const firstWeek = moment(startDate, dateFormatWithoutYear).isoWeek();
  const currentWeek = currentDate.isoWeek();
  const lastWeek = moment(endDate, dateFormatWithoutYear).isoWeek();

  const weeksAfterStart = currentWeek - firstWeek;
  const weeksTotal = lastWeek - firstWeek;
  const weeksBeforeEnd = lastWeek - currentWeek;

  let currentWeekType: number;

  // calculate currentWeekType where,
  // 1 = odd week
  // 2 = even
  if (weeksAfterStart % 2 !== 0) {
    currentWeekType = firstWeekType === 1 ? 1 : 2;
  } else {
    currentWeekType = firstWeekType === 2 ? 1 : 2;
  }

  if (schedule && schedule.length) {
    return schedule.filter((event) => {
      const isSameWeekType = event.weekType === currentWeekType;
      const isSameWeekDay = event.weekDay === currentDate.isoWeekday();

      if (isSameWeekType && isSameWeekDay) {
        return event;
      }

      return undefined;
    });
  }

  return [];
};

export {
  filterEvents,
};

