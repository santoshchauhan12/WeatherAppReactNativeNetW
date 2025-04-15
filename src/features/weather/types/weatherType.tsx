import { WeatherResponse } from "src/models/WeatherModel"
import { ResponseState } from "../weatherState"

export type WeatherState = {
    weather: WeatherResponse | null,
    status: ResponseState,
    error: string
}