import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./slices/calendarSlice";
import userDataReducer from "./slices/userDataSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedUserDataReducer = persistReducer(persistConfig, userDataReducer);

export const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        userPreferences: persistedUserDataReducer,
    }
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { persistor };
