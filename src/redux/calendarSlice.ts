import { createSlice } from "@reduxjs/toolkit";

interface CalendarState {
    dayCount : number;
    selectedDays : string[]; //DDMMYYYY
}

const initialCalendarState: CalendarState = {
    dayCount : 30,
    selectedDays : [],
}

//Actions
const calendarSlice = createSlice({
    name: 'Calendar',
    initialState: initialCalendarState,
    reducers: {
        setDayCount: (state, action) => {
            state.dayCount = action.payload;
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

export default calendarSlice.reducer;
export const { setDayCount, addSelectedDay, removeSelectedDay, clearSelectedDays } = calendarSlice.actions;