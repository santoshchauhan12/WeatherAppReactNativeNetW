import { createSlice } from '@reduxjs/toolkit';
import { weatherInitialState, ResponseState } from './weatherState';
import { fetchWeatherData } from './weatherThunk';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: weatherInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = ResponseState.Loading;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = ResponseState.Success;
        state.weather = action.payload;
        state.error = '';
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = ResponseState.Failed;
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;
