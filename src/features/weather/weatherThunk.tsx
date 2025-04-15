import { createAsyncThunk } from '@reduxjs/toolkit';
import { getWeatherByCity } from '../../api/weatherApi';
import axios from 'axios';

export const fetchWeatherData = createAsyncThunk(
  'weather/fetch',
  async (city: string, { rejectWithValue }) => {
    try {
      return await getWeatherByCity(city);
    } catch (error: unknown) {
      
        if(axios.isAxiosError(error)) {
            return rejectWithValue(error.message)
        } else {
            return rejectWithValue("unknown error")
        }
    }
  }
);
