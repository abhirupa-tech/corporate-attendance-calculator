import { createSlice } from "@reduxjs/toolkit";
import { monthMap, RawDate } from "../backend/types";
import { getCurrentDate } from "../backend/dateHandler";

interface CalendarState {
    dayCount : number;
    startDayIndex : number;
    month: string;
    year: number;
    days: RawDate[];
    selectedDays: RawDate[];
    now: RawDate; //Today's Date
}

const generateCalendarDays = (dayCount: number, startDayIndex: number): RawDate[] => {
    const now = getCurrentDate();
    const daysArray: RawDate[] = new Array(42).fill(null);
    for (let i = 0; i < dayCount; i++) {
        daysArray[startDayIndex + i] = {day: i + 1, month: now.month, year: now.year} as RawDate;
    }
    return daysArray;
};

//Initial State
const initialCalendarState = (() => {
    const { month, year } = getCurrentDate();
    const dayCount = monthMap.get(month)?.days ?? 0;

    return {
        dayCount,
        startDayIndex: 2,
        month,
        year,
        days: generateCalendarDays(dayCount, 2),
        selectedDays: [] as RawDate[],
        now: { day: month, month, year },
    };
})();



//Actions
const calendarSlice = createSlice({
    name: 'Calendar',
    initialState: initialCalendarState,
    reducers: {
        setDayCount: (state, action) => {
            state.dayCount = action.payload;
            state.days = generateCalendarDays(state.dayCount, state.startDayIndex);
            console.log("Days: ", state.days);
        },
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
            state.year = year;;
        },
    }
});

export default calendarSlice.reducer;
export const { setDayCount, addSelectedDay, removeSelectedDay, clearSelectedDays, changeCalendar } = calendarSlice.actions;