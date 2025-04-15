import axios from 'axios';
import { GET_WEATHER_API } from '../const/ApiConstant';
import { WEATHER_API_KEY } from '@env';

export const getWeatherByCity = async (city: string) => {
  const response = await axios.get(GET_WEATHER_API, {
    params: {
      q: city,
      appid: WEATHER_API_KEY,
    },
  });
  return response.data;
};