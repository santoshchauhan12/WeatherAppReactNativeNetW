
import reducer from "../redux/FetchWeatherSlice";
import axios from "axios";
import { weatherInitialState } from "../states/WeatherState";
import { ResponseState } from "../states/WeatherState";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchWeatherData } from "../redux/FetchWeatherSlice";
import { weatherStore } from "../Store/WeatherStore";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe("weatherStore",  () => {
    const mockWeatherResponse = {
        coord: { lon: 77.1887, lat: 32.2396 },
        weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
        main: { temp: 278.15, feels_like: 276.12, temp_min: 277.15, temp_max: 279.15, pressure: 1012, humidity: 70 },
        name: "Manali",
        cod: 200,
    }

    it("verify default initial state", () => {

        const state = weatherStore.getState().weatherReducerState;

        expect(state.status).toBe(ResponseState.Idle)
        expect(state.weather).toEqual(null)
        expect(state.error).toBe("")
    })

    it("verify actual state", async () => {

        mockedAxios.get.mockResolvedValueOnce({data: mockWeatherResponse});

        await weatherStore.dispatch(fetchWeatherData("Manali"))
        const state = weatherStore.getState().weatherReducerState;

        expect(state.status).toBe(ResponseState.Success)
        expect(state.weather).toEqual(mockWeatherResponse)
        expect(state.error).toBe("")
    })

    
    it("verify if fetchWeather Data api fails", async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error("API failure"));

        await weatherStore.dispatch(fetchWeatherData("fjdsfjdslj"));

        const state = weatherStore.getState().weatherReducerState;
        expect(state.status).toBe(ResponseState.Failed);
        expect(state.error).toBe("unknown error");
    });
})