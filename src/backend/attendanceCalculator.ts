import { RawDate } from "./types";

const convertToDate = (date: RawDate) =>
  new Date(date.year, date.month - 1, date.day);

/**COunts Selected Days between STart date and today */
const countAttendance = (
  selectedDays: RawDate[],
  startDate: Date,
  endDate: Date
) => {
  let count = 0;
  for (const day of selectedDays) {
    const date = convertToDate(day);
    if (date >= startDate && date <= endDate) {
      count++;
    }
  }
  return count;
};

export const getAttendance = (
  selectedDays: RawDate[],
  isWeekendDisabled: boolean,
  action: "weekly" | "monthly" | "yearly" | "year-to-date" = "year-to-date"
) => {
  const today = new Date();
  let startDate;

  switch (action) {
    case "weekly":
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 7);
      console.log("StartDate:", startDate);
      console.log("EndDate:", today);
      console.log(
        "Counted Days:",
        countAttendance(selectedDays, startDate, today)
      );
      return !isWeekendDisabled ? parseFloat(((countAttendance(selectedDays, startDate, today) / 7) * 100).toFixed(1))
      : parseFloat(((countAttendance(selectedDays, startDate, today) / 5) * 100).toFixed(1));

    case "monthly":
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 30);
      return !isWeekendDisabled ?  parseFloat(((countAttendance(selectedDays, startDate, today) / 30) * 100).toFixed(1))
      : parseFloat(((countAttendance(selectedDays, startDate, today) / countWeekdays(startDate, today)) * 100).toFixed(1));

    case "yearly":
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 365);
       return !isWeekendDisabled ?  parseFloat(((countAttendance(selectedDays, startDate, today) / 365) * 100).toFixed(1))
      : parseFloat(((countAttendance(selectedDays, startDate, today) / countWeekdays(startDate, today)) * 100).toFixed(1));

    case "year-to-date":
      startDate = new Date(today.getFullYear(), 0, 1);
      return !isWeekendDisabled ?  parseFloat(((countAttendance(selectedDays, startDate, today) / countTotalDays(startDate, today)) * 100).toFixed(1))
      : parseFloat(((countAttendance(selectedDays, startDate, today) / countWeekdays(startDate, today)) * 100).toFixed(1));

    default:
      startDate = new Date(today.getFullYear(), 0, 1);
      return countAttendance(selectedDays, startDate, today);
  }
};

function countTotalDays(startDate: Date, endDate: Date): number {
  // Normalize both dates to remove time differences
  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const msInDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor((end.getTime() - start.getTime()) / msInDay);

  return totalDays;
}

function countWeekdays(startDate: Date, endDate: Date): number {
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const totalDays = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const fullWeeks = Math.floor(totalDays / 7);
  let weekdays = fullWeeks * 5;

  const remainingDays = totalDays % 7;
  const startDay = startDate.getDay(); 

  for (let i = 0; i <= remainingDays; i++) {
    const dayOfWeek = (startDay + i) % 7;
    if (dayOfWeek >= 1 && dayOfWeek <= 5) weekdays++;
  }

  return weekdays;
}

export const generateQuips = (): string[] => {
  return [
    "Keep up the great work!",
    "You're doing amazing!",
    "Your attendance is impressive!",
    "Fantastic job on your attendance!",
    "You're on a roll with your attendance!",
    "Your commitment is commendable!",
    "Great job staying consistent!",
    "Your attendance is top-notch!",
    "You're setting a great example!",
    "Your dedication is inspiring!",
  ];
};
