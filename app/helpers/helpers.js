EVENTS = [{}];

const filterEvents = (date) => EVENTS.filter(event => {
  const {
    timePeriod: {
      day,
      fullDate
    }
  } = event;
  
  return (day.toLowerCase() === date.format('dddd')) && (fullDate === date.format('L'));
});

const formatMonth = (date) => date.format('MMMM');
const formatYear = (date) => date.format('YYYY');

export {
  filterEvents,
  formatMonth,
  formatYear
}