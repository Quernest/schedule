// @flow

import moment from 'moment';
import type Moment from 'moment';
import type { EventType, SemesterType } from '../types';

const dateFormat: string = 'DD/MM/YYYY';
const dateFormatWithoutYear: string = 'DD/MM/____';

const filterEvents = (date: Moment, semesters?: Array<SemesterType>): Array<EventType> => {
  let currentSemester: SemesterType;

  // detect current semester
  if (semesters && semesters.length) {
    semesters.map((semester) => {
      const { start, end } = semester;

      const startDate = moment(new Date(start)).format(dateFormat);
      const endDate = moment(new Date(end)).format(dateFormat);

      const isMonthBetween = date.isBetween(
        moment(startDate, dateFormatWithoutYear),
        moment(endDate, dateFormatWithoutYear),
        'month',
        '[]',
      );

      if (isMonthBetween) {
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
  const currentWeek = date.isoWeek();
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
      const isSameWeekDay = event.weekDay === date.isoWeekday();

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

