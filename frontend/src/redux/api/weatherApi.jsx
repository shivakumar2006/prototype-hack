import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;

export const weatherApi = createApi({
    reducerPath: "weatherApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.openweathermap.org/data/2.5/",
    }),

    endpoints: (builder) => ({
        getCurrentWeather: builder.query({
            query: (city) =>
                `weather?q=${city}&appid=${API_KEY}&units=metric`,
        }),

        getForecast: builder.query({
            query: (city) =>
                `forecast?q=${city}&appid=${API_KEY}&units=metric`,
        }),
    }),
});

export const {
    useGetCurrentWeatherQuery,
    useGetForecastQuery,
} = weatherApi;
