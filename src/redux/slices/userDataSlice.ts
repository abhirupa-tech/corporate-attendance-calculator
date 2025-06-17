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
    isWeekendDisabled: true,
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
        },
        shouldDisableWeekends: (state, action) => {
            state.isWeekendDisabled = action.payload;

        },
    },
    extraReducers: (builder) => {
        builder.addCase("persist/REHYDRATE", (state, action) => {
            const typedAction = action as { payload?: { userPreferences?: typeof state } };
            
            if (typedAction.payload?.userPreferences) {
                return {
                    ...state,
                    ...typedAction.payload.userPreferences,
                };
            }
            return state;
        });
    }
});

export const { updateAttendance, shouldDisableWeekends } = userDataSlice.actions;
export default userDataSlice.reducer;