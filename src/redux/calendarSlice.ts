import { createSlice } from "@reduxjs/toolkit";
import { RawDate } from "../backend/types";

interface CalendarState {
    dayCount : number;
    startDayIndex : number; // 0-6 (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    days: RawDate[]; // 1-31
    selectedDays : RawDate[]; //DDMMYYYY
}

const initialCalendarState: CalendarState = {
    dayCount : 30,
    startDayIndex : 2,
    days: [],
    selectedDays : [],
}

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
            state.selectedDays = state.selectedDays.filter(day => day !== action.payload);
        },
        clearSelectedDays: (state) => {
            state.selectedDays = [];
        }
    },
});

const generateCalendarDays = (dayCount: number, startDayIndex: number): RawDate[] => {
    const daysArray: RawDate[] = new Array(42).fill(null);
    for (let i = 0; i < dayCount; i++) {
        daysArray[startDayIndex + i] = {day: i + 1, month: 4, year: 2025} as RawDate;
    }
    return daysArray;
};


export default calendarSlice.reducer;
export const { setDayCount, addSelectedDay, removeSelectedDay, clearSelectedDays } = calendarSlice.actions;