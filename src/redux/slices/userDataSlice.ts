import { createSlice } from "@reduxjs/toolkit";
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
    theme: "dark",
};

const userDataSlice = createSlice({
    name: "userPreferences",
    initialState: initalUserPreferencesState,
    reducers: {
        updateScore: (state, action) => {
            console.log("Updating Score: ", action.payload);
        },
        setUserData: (state, action) => {
            console.log("Setting User Data: ", action.payload);
        }

    }
});

export const { updateScore } = userDataSlice.actions;
export default userDataSlice.reducer;