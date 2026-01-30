import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "./api/weatherApi";

export const store = configureStore({
    reducer: {
        [weatherApi.reducerPath]: weatherApi.reducer,
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(weatherApi.middleware)
})