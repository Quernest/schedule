import { isSameWeekDay, isSameWeekType } from './helpers';

const filterEvents = (semester, date) => {
  const { schedule } = semester;

  if (schedule && schedule.length > 0) {
    return schedule.filter((event) => {
      const { weekDay, weekType } = event;

      return isSameWeekDay(weekDay, date) && isSameWeekType(weekType, semester, date);
    });
  }

  return [];
}

export { filterEvents };
