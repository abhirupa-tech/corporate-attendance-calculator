import { createSlice } from "@reduxjs/toolkit";
import { getCurrentDate } from "../../backend/dateHandler";
import { monthMap, RawDate } from "../../backend/types";

interface CalendarState {
    dayCount : number;
    month: number;
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
const initialCalendarState = (() : CalendarState => {
    const { month, year } = getCurrentDate();

    return {
        dayCount: monthMap.get(month)?.days ?? 0,
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
        },
        removeSelectedDay: (state, action) => {
            state.selectedDays = state.selectedDays.filter(day => !(day.day === action.payload.day && day.month === action.payload.month && day.year === action.payload.year));
        },
        clearSelectedDays: (state, action) => {
            switch(action.payload) {
                case "all":
                    state.selectedDays = [];
                    break;
                default:
                    const currentMonth = state.month;
                    state.selectedDays = state.selectedDays.filter(day => !(day.month === currentMonth && day.year === state.year));
                    break;
            };
            
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
        clearSelectedWeekendDays: (state) => {
            state.selectedDays = state.selectedDays.filter(day => {
                const date = new Date(day.year, day.month - 1, day.day);
                const dayOfWeek = date.getDay();
                return dayOfWeek !== 0 && dayOfWeek !== 6; // Keep only weekdays
            });
        }

    }
});

export default calendarSlice.reducer;
export const { addSelectedDay, removeSelectedDay, clearSelectedDays, changeCalendar, clearSelectedWeekendDays} = calendarSlice.actions;