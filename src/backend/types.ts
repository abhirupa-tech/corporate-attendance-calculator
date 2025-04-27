export enum Month {
  January = 31,
  February = 28,
  March = 31,
  April = 30,
  May = 31,
  June = 30,
  July = 31,
  August = 31,
  September = 30,
  October = 31,
  November = 30,
  December = 31,
}

export interface AttendanceRecord {
  year: number;
  cadence: "monthly" | "quarterly" | "rolling";
  daysAttended: MonthlyAttendance | WeeklyAttendance;
  currentScore: number;
  requiredScore: number;
  daysToMeetScore: number;

  calculateAttendance: () => number;
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
