import { createSlice } from "@reduxjs/toolkit";
import { RawDate, UserData } from "../../backend/types";

const initalUserPreferencesState : UserData= {
    currentScore: {
        weekly: 0,
        monthly: 0,
        yearly: 0,
        yearToDate: 0,
    },
    requiredScorePercentage: 0,
    daysToMeetScore: {
        weekly: 0,
        monthly: 0,
        yearly: 0,
        yearToDate: 0,
    },
    theme: "dark",
};


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

const getAttendedDayCount = (selectedDays: RawDate[], action : 'weekly' | 'monthly' | 'yearly' | 'year-to-date' = 'year-to-date') => {
    const today = new Date();
    switch (action) {
        case 'weekly':
            return countAttendance(selectedDays, new Date(today.getDate() - 7), today);
        case 'monthly':
            return countAttendance(selectedDays, new Date(today.getDate() - 30), today);
        case 'yearly':
            return countAttendance(selectedDays, new Date(today.getDate() - 365), today);
        case 'year-to-date':
            return countAttendance(selectedDays, new Date(today.getFullYear(), 0, 1), today);
        default:
            return countAttendance(selectedDays, new Date(today.getFullYear(), 0, 1), today);
    }
}

const userDataSlice = createSlice({
    name: "userPreferences",
    initialState: initalUserPreferencesState,
    reducers: {
        updateAttendance: (state, action) => {
            state.currentScore.weekly = parseFloat(((getAttendedDayCount(action.payload, 'weekly') / 7) * 100).toFixed(1));
            state.currentScore.monthly = parseFloat(((getAttendedDayCount(action.payload, 'monthly') / 30) * 100).toFixed(1));
            state.currentScore.yearly = parseFloat(((getAttendedDayCount(action.payload, 'yearly')/365) * 100).toFixed(1)); 
            state.currentScore.yearly = parseFloat(((getAttendedDayCount(action.payload, 'yearly')/365) * 100).toFixed(1));
            state.currentScore.yearToDate = parseFloat((getAttendedDayCount(action.payload) * 100).toFixed(1));
            }
        },
        
        // setUserData: (state, action) => {
        //     console.log("Setting User Data: ", action.payload);
        // }

    
});

export const { updateAttendance } = userDataSlice.actions;
export default userDataSlice.reducer;