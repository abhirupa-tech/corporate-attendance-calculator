import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./slices/calendarSlice";
import userDataReducer from "./slices/userDataSlice";

export const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        userPreferences: userDataReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
