import { WeatherResponse } from "src/models/WeatherModel"


export type WeatherState = {
    weather: WeatherResponse | null,
    status: ResponseState,
    error: string
}


export enum ResponseState {
    Idle = "IDLE",
    Loading = "LOADING",
    Success = "SUCCESS",
    Failed = "FAILED"
}

export const weatherInitialState: WeatherState = {
    weather: null,
    status: ResponseState.Idle,
    error: ""
}