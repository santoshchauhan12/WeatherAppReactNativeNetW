import { createAsyncThunk } from '@reduxjs/toolkit';
import { getWeatherByCity } from '../../api/weatherApi';
import axios from 'axios';
import { WeatherResponse } from 'src/models/WeatherModel';

export const fetchWeatherData = createAsyncThunk<WeatherResponse, string, { rejectValue: string }>(
  'weather/fetch',
  async (city: string, { rejectWithValue }) => {
    try {
      return await getWeatherByCity(city);
    } catch (error) {
      
        if(axios.isAxiosError(error)) {
            return rejectWithValue(error.message)
        } else {
            return rejectWithValue("unknown error")
        }
    }
  }
);
