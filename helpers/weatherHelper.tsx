

export const getWeatherCardColor = (weatherMain: string | undefined) => {
    switch (weatherMain) {
        case "clear":
            return "#FDB813"; // Sunny yellow
        case "clouds":
            return "#6C757D"; // Cloudy gray
        case "rain":
        case "drizzle":
            return "#4A90E2"; // Rainy blue
        case "thunderstorm":
            return "#2C3E50"; // Stormy dark
        case "snow":
            return "#00BCD4"; // Cool icy blue
        default:
            return "#95A5A6"; // Default cloudy gray
    }
};


export const getWeatherIcon = (weatherMain: string | undefined) => {
    // if (!weatherMain) return "weather-sunny";

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
