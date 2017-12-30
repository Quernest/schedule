import moment from 'moment';

const filterEvents = (date, props) => {
  const { startOfSemester, firstWeekType, schedule } = props;
  const start = moment(startOfSemester, 'DD/MM/YYYY');
  const selectedDate = moment(date, 'DD/MM/YYYY');
  const days = [];
  const day = 1;
  const current = start.clone();
  const odd = '*';
  const even = '/';

  let currentWeek;
  let i = 1;

  while (current.day(7 + day).isBefore(selectedDate)) {
    i += 1;
    days.push(current.clone());
  }

  if (i % 2 !== 0) {
    currentWeek = firstWeekType === odd ? odd : even;
  } else {
    currentWeek = firstWeekType === even ? odd : even;
  }

  return schedule.filter((lesson) => {
    return lesson.day.toLowerCase() === date.format('dddd') && lesson.weekType === currentWeek;
  });
};

export {
  filterEvents,
};
