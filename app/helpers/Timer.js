import moment from 'moment';

const timeFormat = 'H:mm:ss';

class Timer {
  constructor(startTime, endTime, currentTime) {
    console.log(startTime, endTime, currentTime)
  }

  static calcRemainingTime(endTime, currentTime) {
    let hours, minutes, seconds, group;
    
    const then = moment(endTime, timeFormat);
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
  }

  static calcTimeDifference(startTime, endTime) {
    const difference = moment.duration(moment(endTime, timeFormat).diff(moment(startTime, timeFormat)));
    
    return {
      hours: difference.asHours(),
      minutes: difference.asMinutes(),
      seconds: difference.asSeconds() 
    };
  }

  static calcCurrentLessonProgress(startTime, totalTime, maxValue) {
    const timestamp = moment(startTime, timeFormat);
    
    return moment().diff(timestamp, 'minutes') * maxValue / totalTime;
  }

  static checkCurrentLesson(startTime, endTime, currentTime) {
    return currentTime > moment(startTime, timeFormat) && currentTime < moment(endTime, timeFormat);
  }

  static checkPastLesson(endTime, currentTime) {
    return moment(endTime, timeFormat) < currentTime;
  }
}

export default Timer;