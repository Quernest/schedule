// @flow

export type EventType = {
  id: number,
  name: string,
  teacher: string,
  start: string,
  end: string,
  weekDay: number,
  // 1 = odd, 2 = even
  weekType: number,
  semester: number,
  location: string,
  // if no lesson
  isFreeTime: number,
  // it's usually friday
  isShortDay: number,
};

export type SemesterType = {
  id: number,
  // the date from which the semester begins
  start: string,
  // the date where the semester ends
  end: string,
  // collection with events
  schedule: Array<EventType>,
  // the week type from which the semester begins
  firstWeekType: number,
};

// data with group and semesters from API
export type DataType = {
  group: {
    id: number,
    name: string,
  },
  semesters: Array<SemesterType>,
};

