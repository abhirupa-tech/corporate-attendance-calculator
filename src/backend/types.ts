export const monthMap = new Map<number, { name: string; days: number }>([
  [1, { name: "January", days: 31 }],
  [2, { name: "February", days: 28 }],
  [3, { name: "March", days: 31 }],
  [4, { name: "April", days: 30 }],
  [5, { name: "May", days: 31 }],
  [6, { name: "June", days: 30 }],
  [7, { name: "July", days: 31 }],
  [8, { name: "August", days: 31 }],
  [9, { name: "September", days: 30 }],
  [10, { name: "October", days: 31 }],
  [11, { name: "November", days: 30 }],
  [12, { name: "December", days: 31 }],
]);


export interface UserData {
  currentScore: AttendanceScore;
  requiredScorePercentage: number;
  daysToMeetScore: AttendanceScore;
  isWeekendDisabled: true;
  theme: "dark" | "light";
}

export interface AttendanceScore {
  weekly: number;
  monthly: number;
  yearly: number;
  yearToDate: number;
}

export interface MonthlyAttendance {
  month: Month;
  days: string[];
}

export interface WeeklyAttendance {
  week: number; //0th week is the current week
  days: string[];
}

export interface RawDate {
  day: number;
  month: number;
  year: number;
}

export enum Month {
  January = 1,
  February = 2,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12,
}
// const userAttendance: AttendanceRecord = {
//   year: 2025,
//   daysAttended: [20250105, 20250106, 20250115, 20250202, 20250210], // Example dates in YYYYMMDD format
//   daysInMonth: {
//     1: 31,
//     2: 28,
//     3: 31,
//     4: 30,
//     5: 31,
//     6: 30,
//     7: 31,
//     8: 31,
//     9: 30,
//     10: 31,
//     11: 30,
//     12: 31,
//   },
//   requiredPercentage: 75, // Example threshold

//   currentPercentage: 0, // Will be computed dynamically

//   calculateAttendance: function () {
//     const totalDays = Object.values(this.daysInMonth).reduce(
//       (sum, days) => sum + days,
//       0
//     );
//     const attendedDays = this.daysAttended.length;
//     this.currentPercentage = (attendedDays / totalDays) * 100;
//     return this.currentPercentage;
//   },
// };
