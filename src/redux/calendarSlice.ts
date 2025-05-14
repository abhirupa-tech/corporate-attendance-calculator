import { createSlice } from "@reduxjs/toolkit";
import { monthMap, RawDate } from "../backend/types";
import { getCurrentDate, getDaysInMonth } from "../backend/dateHandler";

interface CalendarState {
    dayCount : number;
    month: string;
    year: number;
    days: RawDate[];
    selectedDays: RawDate[];
    now: RawDate; //Today's Date
}

const getFirstDayOfMonth = (month: number, year: number): number => {
    const firstDay = new Date(year, month - 1, 1);
    return firstDay.getDay();
};

const generateCalendarDays = (month: number, year: number): RawDate[] => {
    const startDayIndex = getFirstDayOfMonth(month, year);
    const dayCount = monthMap.get(month)?.days ?? 0;
    const daysArray: RawDate[] = new Array(42).fill(null);
    for (let i = 0; i < dayCount; i++) {
        daysArray[startDayIndex + i] = {day: i + 1, month: month, year: year} as RawDate;
    }
    return daysArray;
};

//Initial State
const initialCalendarState = (() => {
    const { month, year } = getCurrentDate();

    return {
        monthMap: monthMap.get(month)?.days ?? 0,
        month,
        year,
        days: generateCalendarDays(month, year),
        selectedDays: [] as RawDate[],
        now: { day: month, month, year },
    };
})();



//Actions
const calendarSlice = createSlice({
    name: 'Calendar',
    initialState: initialCalendarState,
    reducers: {
        addSelectedDay: (state, action) => {
            state.selectedDays.push(action.payload);
            console.log("Selected Day: ", action.payload);
        },
        removeSelectedDay: (state, action) => {
            console.log("Removing Day: ", action.payload);
            state.selectedDays = state.selectedDays.filter(day => !(day.day === action.payload.day && day.month === action.payload.month && day.year === action.payload.year));
        },
        clearSelectedDays: (state) => {
            state.selectedDays = [];
        },
        changeCalendar: (state, action) => {
            let { month, year } = state;
            switch (action.payload) {
                case "next":
                    month++;
                    if (month > 12) {
                        month = 1;
                        year++;
                    }
                    break;
                case "previous":
                    month--;
                    if (month < 1) {
                        month = 12;
                        year--;
                    }
                    break;
            }
            state.month = month;
            state.year = year;
            state.days = generateCalendarDays(month, year);
        },
    }
});

export default calendarSlice.reducer;
export const { addSelectedDay, removeSelectedDay, clearSelectedDays, changeCalendar } = calendarSlice.actions;