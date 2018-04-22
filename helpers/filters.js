// @flow

import moment from 'moment';
import type Moment from 'moment';
import type { EventType, SemesterType } from '../types';
import { dateFormat, dateFormatWithoutYear, isBetweenMonth } from './helpers';

const filterEvents = (selectedDate: Moment, semesters?: Array<SemesterType>): Array<EventType> => {
  let currentSemester: SemesterType;
  let currentWeekType: number;

  // detect current semester
  if (semesters && semesters.length) {
    semesters.map((semester) => {
      const { start, end } = semester;

      if (isBetweenMonth(selectedDate, start, end)) {
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
  const currentWeek = selectedDate.isoWeek();
  const lastWeek = moment(endDate, dateFormatWithoutYear).isoWeek();
  const weeksAfterStart = currentWeek - firstWeek;
  const weeksTotal = lastWeek - firstWeek;
  const weeksBeforeEnd = lastWeek - currentWeek;

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
      const isSameWeekDay = event.weekDay === selectedDate.isoWeekday();

      if (isSameWeekType && isSameWeekDay) {
        return event;
      }

      return undefined;
    });
  }

  return [];
};

export { filterEvents };

