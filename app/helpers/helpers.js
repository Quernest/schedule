import moment from 'moment';
import test from '../../API/it-14-1.json';

export const formatMonth = (date) => date.format('MMMM');
export const formatYear = (date) => date.format('YYYY');

const formatPattern = 'DD/MM/YYYY';
const timeFormat = 'H:mm:ss';

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

  return test.schedule[weekNumber % 2 === 0 ? test.firstWeekType : '/'].filter(lesson => {
    return lesson.day.toLowerCase() === date.format('dddd');
  });
};

export const calcRemainingTime = (endTime, currentTime) => {
  let hours, minutes, seconds, group;

  const then = moment(endTime, 'H:mm:ss');
  const diff = moment.duration(then.diff(currentTime));

  hours   = diff.hours();
  minutes = diff.minutes();
  seconds = diff.seconds();

  group = [
    (hours > 9) ? hours : '0' + hours,
    (minutes > 9) ? minutes : '0' + minutes,
    (seconds > 9) ? seconds : '0' + seconds
  ];

  return group;
};

export const calcTimeDifference = (start, end) => {
  const difference = moment.duration(moment(end, timeFormat).diff(moment(start, timeFormat)));

  return {
    hours: difference.asHours(),
    minutes: difference.asMinutes(),
    seconds: difference.asSeconds() 
  };
};

export const checkCurrentLesson = (startTime, endTime, currentTime) => {
  return currentTime > moment(startTime, timeFormat) && currentTime < moment(endTime, timeFormat);
};

export const checkCurrentDay = (selectedDate, currentTime) => {
  return selectedDate.format(timeFormat) === currentTime.format(timeFormat);
}

export const calcCurrentLessonProgress = (startTime, totalTime, maxValue) => {
  const timestamp = moment(startTime, timeFormat);

  return moment().diff(timestamp, 'minutes') * maxValue / totalTime;
};