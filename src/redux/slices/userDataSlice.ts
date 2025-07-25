import { createSlice } from "@reduxjs/toolkit";
import { getAttendance } from "../../backend/attendanceCalculator";
import { UserData } from "../../backend/types";

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
            state.currentScore.weekly = getAttendance(action.payload, state.isWeekendDisabled, 'weekly');
            state.currentScore.monthly = getAttendance(action.payload, state.isWeekendDisabled, 'monthly');
            state.currentScore.yearly = getAttendance(action.payload, state.isWeekendDisabled, 'yearly');
            state.currentScore.yearToDate = getAttendance(action.payload, state.isWeekendDisabled, 'year-to-date');
        },
        shouldDisableWeekends: (state, action) => {
            console.log("Updating weekend visibility to: ", action.payload);
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