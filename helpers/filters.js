import { isSameWeekDay, isSameWeekType } from './helpers';

const filterEvents = (schedule, date) => {
  const { semester, events } = schedule;

  if (events && events.length > 0) {
    return events.filter((event) => {
      const { day, weekType } = event;

      return isSameWeekDay(day, date) && isSameWeekType(weekType, semester, date);
    });
  }

  return [];
};

export { filterEvents };
