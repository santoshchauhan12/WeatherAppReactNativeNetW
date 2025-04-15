import { createAsyncThunk,
    createSlice
 } from "@reduxjs/toolkit";

import axios from "axios";
import { GET_WEATHER_API } from "../const/ApiConstant";
import { weatherInitialState } from "../../src/states/WeatherState";
import { ResponseState } from "../../src/states/WeatherState";
import { WEATHER_API_KEY } from '@env';

/**
 * Thunk middleware and axios to call api,
 * @param search based on city
 */
export const fetchWeatherData = createAsyncThunk("async/state", 
    async(search: string, {rejectWithValue}) => {
        console.log("query weather data  =============   ", search)

        try {

            const result = await axios.get(GET_WEATHER_API, {
                params : {
                    q : search,
                    appId : WEATHER_API_KEY
                }
            })
            const responseData = await result.data
            return responseData
        }catch(error: unknown) {
            if(axios.isAxiosError(error)) {
                return rejectWithValue(error.message)
            } else {
                return rejectWithValue("unknown error")
            }
        }
})

/**
 * Weather slice to manager reducer and state
 */
export const fetchWeatherSlice = createSlice({
    name: "WeatherSlice",
    initialState: weatherInitialState,
    reducers: {},

    extraReducers: (builder) => {

        builder.addCase(fetchWeatherData.pending, (state) => {

            state.status = ResponseState.Loading
        })

        builder.addCase(fetchWeatherData.fulfilled, (state, action)=> {
            state.status = ResponseState.Success
            state.weather = action.payload
            state.error = ""
        })

        builder.addCase(fetchWeatherData.rejected, (state, action)=> {
            state.status = ResponseState.Failed
            state.error = typeof action.payload == "string" ? action.payload : "unknown error"
        })
    }
}

)


export default fetchWeatherSlice.reducer