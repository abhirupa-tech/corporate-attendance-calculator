import { configureStore, combineReducers } from "@reduxjs/toolkit";
import calendarReducer from "./slices/calendarSlice";
import userDataReducer from "./slices/userDataSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Define persistence configuration
const persistConfig = {
    key: 'root',
    storage,
};

// Combine reducers before persisting
const rootReducer = combineReducers({
    calendar: calendarReducer,
    userPreferences: userDataReducer,
});

// Wrap the combined reducer inside persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


// Create Redux store
export const store = configureStore({
    reducer: persistedReducer,
});

// Create persistor instance for rehydration
export const persistor = persistStore(store);

// TypeScript types for state management
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
