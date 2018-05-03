// @flow

import moment from 'moment-weekdaysin';
import type Moment from 'moment';
import type { EventType, SemesterType } from '../types';
import { dateFormatMySQL, isOdd, isEven } from './helpers';

const filterEvents = (selectedDate: Moment, semesters?: Array<SemesterType>) => {
  let currentSemester: ?SemesterType;

  if (semesters && semesters.length) {
    semesters.map((semester) => {
      const { start, end } = semester;

      const isCurrentSemester = selectedDate.isBetween(
        moment(start, dateFormatMySQL),
        moment(end, dateFormatMySQL),
        null,
        '[]', // all inclusive
      );

      if (isCurrentSemester) {
        currentSemester = semester;
      }

      return semester;
    });
  }

  if (currentSemester) {
    const { schedule, firstWeekType } = currentSemester;

    const start: Moment = moment(currentSemester.start, dateFormatMySQL);
    const end: Moment = moment(currentSemester.end, dateFormatMySQL);

    const allSundaysInSemester: Array<Moment> = start.weekdaysInBetween(end, 'Sunday');

    if (allSundaysInSemester && allSundaysInSemester.length) {
      const firstSunday = start.startOf('week');
      const lastSunday = end.startOf('week');

      let currentWeekType: number = firstWeekType;
      let current: number = 0;
      let total: number = 0;

      if (firstSunday.isBefore(allSundaysInSemester[0])) {
        allSundaysInSemester.unshift(firstSunday);
      }

      if (lastSunday.isAfter(allSundaysInSemester[allSundaysInSemester.length - 1])) {
        allSundaysInSemester.push(lastSunday);
      }

      let index: number = 0;
      total = allSundaysInSemester.length;

      for (index; index < total; index += 1) {
        if (allSundaysInSemester[index]) {
          // current week
          if (selectedDate.isBetween(
            allSundaysInSemester[index],
            allSundaysInSemester[index + 1],
            null,
            '[]', // all inclusive
          )) {
            current = index + 1;
          }

          // first week
          if (selectedDate.isBefore(firstSunday)) {
            current = 1;
          }

          // last week
          if (selectedDate.isAfter(lastSunday)) {
            current = total;
          }
        }
      }

      if (current > 0) {
        if (
          (isOdd(current) && isOdd(firstWeekType)) ||
          (isEven(current) && isEven(firstWeekType))
        ) {
          currentWeekType = 1;
        } else {
          currentWeekType = 2;
        }
      }

      if (schedule && schedule.length) {
        return {
          weeks: {
            total,
            current,
            currentWeekType,
          },
          events: schedule.filter((event: EventType) => {
            const isSameWeekType: boolean = event.weekType === currentWeekType;
            const isSameWeekDay: boolean = event.weekDay === selectedDate.isoWeekday();

            if (isSameWeekType && isSameWeekDay) {
              return event;
            }

            return undefined;
          }),
        };
      }
    }
  }

  return {
    weeks: {},
    events: [],
  };
};

export { filterEvents };
