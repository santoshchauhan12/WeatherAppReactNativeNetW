
import reducer from "../src/features/weather/weatherSlice";
import axios from "axios";
import { weatherInitialState } from "../src/features/weather/weatherState";
import { ResponseState } from "../src/features/weather/weatherState";
import { AnyAction } from "@reduxjs/toolkit";
import { fetchWeatherData } from "../src/features/weather/weatherThunk";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Weather Slice", () => {
    const mockWeatherResponse = {
        coord: { lon: 77.1887, lat: 32.2396 },
        weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
        main: { temp: 278.15, feels_like: 276.12, temp_min: 277.15, temp_max: 279.15, pressure: 1012, humidity: 70 },
        name: "Manali",
        cod: 200,
    };

    it("should handle initial state", () => {
        expect(reducer(undefined, {} as AnyAction)).toEqual(weatherInitialState);
    });

    it("should handle fulfilled state", async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherResponse });

        const action = await fetchWeatherData("Manali, Himachal Pradesh")(jest.fn, jest.fn, undefined);
        const state = reducer(weatherInitialState, { type: fetchWeatherData.fulfilled.type, payload: mockWeatherResponse });

        expect(state.status).toBe(ResponseState.Success);
        expect(state.weather).toEqual(mockWeatherResponse);
        expect(state.error).toBe("");
    });

    it("should failed for  fulfilled state for empty check response", async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherResponse });

        const action = await fetchWeatherData("Manali, Himachal Pradesh")(jest.fn, jest.fn, undefined);
        const state = reducer(weatherInitialState, { type: fetchWeatherData.fulfilled.type });

        expect(state.status).toBe(ResponseState.Success);
        expect(state.weather).not.toEqual(mockWeatherResponse);
        expect(state.error).toBe("");
    });

    it("should handle pending state", () => {
        const state = reducer(weatherInitialState, { type: fetchWeatherData.pending.type });
        expect(state.status).toBe(ResponseState.Loading);
    });

    it("should handle rejected state", () => {
        const errorMessage = "Request failed";
        const state = reducer(weatherInitialState, {
            type: fetchWeatherData.rejected.type,
            payload: errorMessage,
        });

        expect(state.status).toBe(ResponseState.Failed);
        expect(state.error).toBe(errorMessage);
    });
});
