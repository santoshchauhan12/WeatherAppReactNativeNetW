import axios from 'axios';
import { GET_WEATHER_API } from '../const/ApiConstant';
import { WEATHER_API_KEY } from '@env';
import { WeatherResponse } from '../models/WeatherModel';

export const getWeatherByCity = async (city: string): Promise<WeatherResponse> => {
  const response = await axios.get<WeatherResponse>(GET_WEATHER_API, {
    params: {
      q: city,
      appid: WEATHER_API_KEY,
    },
  });
  return response.data;
};