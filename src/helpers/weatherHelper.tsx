import { useTheme } from "../styles/theme/context/ThemeContext";



/**
 * helper function to get different color based on the weather 
 * @param weatherMain 
 * @returns 
 */
export const getWeatherCardColor = (weatherMain: string | undefined) => {

    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    switch (weatherMain) {
        case "clear":
            return isDarkMode ? "#FFD93D" : "#FDB813"; // Warm sun vs bright sun
        case "clouds":
            return isDarkMode ? "#495057" : "#ADB5BD"; // Dark cloud vs light cloud
        case "rain":
        case "drizzle":
            return isDarkMode ? "#1E3A8A" : "#4A90E2"; // Deeper blue for dark mode
        case "thunderstorm":
            return isDarkMode ? "#0F172A" : "#2C3E50"; // Very dark stormy
        case "snow":
            return isDarkMode ? "#60A5FA" : "#00BCD4"; // Frosty blue variants
        case "mist":
        case "fog":
            return isDarkMode ? "#6B7280" : "#CFD8DC"; // Soft grays
        default:
            return isDarkMode ? "#374151" : "#95A5A6"; // Neutral fallback
    }
};

/**
 * Helper function to get weather icon based on the weather condition
 * @param weatherMain 
 * @returns 
 */
export const getWeatherIcon = (weatherMain: string | undefined) => {
    switch (weatherMain) {
        case "clear":
            return "weather-sunny";
        case "clouds":
            return "weather-cloudy";
        case "rain":
            return "weather-rainy";
        case "drizzle":
            return "weather-partly-cloudy";
        case "thunderstorm":
            return "weather-lightning";
        case "snow":
            return "weather-snowy";
        default:
            return "weather-cloudy-alert";
    }
};


export const getGradientForWeatherBackground = (weatherMain: string | undefined) => {
    switch (weatherMain) {
        case 'clear':
            return ['#FFDD00', '#FF9E00', '#FFD700']; // Sunny
        case 'clouds':
            return ['#B0C4DE', '#D3D3D3']; // Cloudy
        case 'rain':
        case 'drizzle':
            return ['#00A9E0', '#005F8D', '#4B6C84']; // Rainy
        case 'thunderstorm':
            return ['#4C1C24', '#3B2A45', '#212A3E']; // Thunderstorm
        case 'snow':
            return ['#A8C8D9', '#E5F0FF']; // Snowy
        default:
            return ['#B0C4DE', '#D3D3D3']; // Default (Cloudy)
    }
};
