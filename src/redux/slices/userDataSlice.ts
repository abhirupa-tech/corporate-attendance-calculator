import { createSlice } from "@reduxjs/toolkit";
import { RawDate, UserData } from "../../backend/types";
import { getAttendedDayCount } from "../../backend/attendanceCalculator";

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