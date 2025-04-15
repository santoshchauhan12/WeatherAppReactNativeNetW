import { WeatherState } from "./types/weatherType"

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