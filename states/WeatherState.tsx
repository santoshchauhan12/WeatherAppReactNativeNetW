import { WeatherResponse } from "../models/WeatherModel"


export type WeatherState = {
    weather: Partial<WeatherResponse>,
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
    weather: {},
    status: ResponseState.Idle,
    error: "unknown error"
}