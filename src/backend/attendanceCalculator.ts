import { RawDate } from "./types";


const convertToDate = (date: RawDate) => new Date(date.year, date.month - 1, date.day);

const countAttendance = (selectedDays: RawDate[], startDate: Date, endDate: Date) => {
    let count =  0;
    for (const day of selectedDays) {
        const date = convertToDate(day);
        if (date >= startDate && date <= endDate) {
            count++;
        }
    }
    return count;
}

export const getAttendedDayCount = (
    selectedDays: RawDate[],
    action: 'weekly' | 'monthly' | 'yearly' | 'year-to-date' = 'year-to-date'
  ) => {
    const today = new Date();
    let startDate;
  
    switch (action) {
      case 'weekly':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        console.log("StartDate:", startDate);
        console.log("EndDate:", today);
        console.log("Counted Days:", countAttendance(selectedDays, startDate, today));
        return countAttendance(selectedDays, startDate, today);
  
      case 'monthly':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 30);
        return countAttendance(selectedDays, startDate, today);
  
      case 'yearly':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 365);
        return countAttendance(selectedDays, startDate, today);
  
      case 'year-to-date':
        startDate = new Date(today.getFullYear(), 0, 1);
        return countAttendance(selectedDays, startDate, today);
  
      default:
        startDate = new Date(today.getFullYear(), 0, 1);
        return countAttendance(selectedDays, startDate, today);
    }
  };
  
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
        "Your dedication is inspiring!"
    ];
}