import { createSlice } from "@reduxjs/toolkit";

interface CalendarState {
    dayCount : number;
    startDayIndex : number; // 0-6 (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    days: (number | null)[]; // 1-31
    selectedDays : string[]; //DDMMYYYY
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
        },
        addSelectedDay: (state, action) => {
            state.selectedDays.push(action.payload);
        },
        removeSelectedDay: (state, action) => {
            state.selectedDays = state.selectedDays.filter(day => day !== action.payload);
        },
        clearSelectedDays: (state) => {
            state.selectedDays = [];
        }
    },
});

const generateCalendarDays = (dayCount: number, startDayIndex: number): (number | null)[] => {
    const daysArray: (number | null)[] = new Array(42).fill(null);
    for (let i = 0; i < dayCount; i++) {
        daysArray[startDayIndex + i] = i + 1;
    }
    return daysArray;
};


export default calendarSlice.reducer;
export const { setDayCount, addSelectedDay, removeSelectedDay, clearSelectedDays } = calendarSlice.actions;