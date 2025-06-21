import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { clearSelectedWeekendDays } from "../slices/calendarSlice";

export const updateWeekendVisibility = createAsyncThunk(
    'thunks/updateWeekendVisibility',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const isWeekendDisabled = state.userPreferences.isWeekendDisabled;

        // If weekends are disabled, clear selected days
        if (isWeekendDisabled) {
            dispatch(clearSelectedWeekendDays());
        }
    }
);