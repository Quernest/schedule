// @flow

import moment from 'moment';
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
    const allMondaysInSemester: Array<Moment> = [];
    const day = 1; // 1 = Monday
    const cloned = start.clone();

    while (cloned.day(7 + day).isBefore(end)) {
      allMondaysInSemester.push(cloned.clone());
    }

    if (allMondaysInSemester && allMondaysInSemester.length) {
      const firstMonday = start.startOf('week').isoWeekday(1);

      let currentWeekType: number = firstWeekType;
      let current: number = 0;
      let total: number = 0;

      if (firstMonday.isBefore(allMondaysInSemester[0])) {
        allMondaysInSemester.unshift(firstMonday);
      }

      let index: number = 0;
      total = allMondaysInSemester.length;

      for (index; index < total; index += 1) {
        if (allMondaysInSemester[index]) {
          // current week
          if (selectedDate.isBetween(
            allMondaysInSemester[index],
            allMondaysInSemester[index + 1],
            null,
            '[]',
          )) {
            current = index + 1;
          }

          // first week
          if (selectedDate.isBefore(firstMonday)) {
            current = 1;
          }

          // last week
          if (selectedDate.isAfter(allMondaysInSemester[allMondaysInSemester.length - 1])) {
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
