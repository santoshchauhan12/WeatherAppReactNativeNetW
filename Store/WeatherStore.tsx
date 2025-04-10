import { configureStore } from "@reduxjs/toolkit";

import weatherReducer from "../redux/FetchWeather"


export const weatherStore = configureStore({

    reducer: {
        weatherReducerState: weatherReducer
    }
})

export type RootState = ReturnType<typeof weatherStore.getState>

export type AppDispatch = typeof weatherStore.dispatch
