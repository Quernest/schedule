import moment from 'moment';
import test from '../../API/it-14-1.json';

export const formatMonth = (date) => date.format('MMMM');
export const formatYear = (date) => date.format('YYYY');

export const formatPattern = 'DD/MM/YYYY';

export const filterEvents = (date) => {
  const startOfSemester = moment(test.startOfSemester, formatPattern);
  const currentDate = moment(date, formatPattern);
  const day = 1; // Monday

  const days = [];
  const current = startOfSemester.clone();
  
  let weekNumber = 0;
  
  while (current.day(7 + day).isBefore(currentDate)) {
    weekNumber++;
    days.push(current.clone());
  }

  // console.log(days.map(m => m.format('LLLL')))

  return test.schedule[weekNumber % 2 === 0 ? test.firstWeekType : '/'].filter(lesson => {
    return lesson.day.toLowerCase() === date.format('dddd');
  });
};