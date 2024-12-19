import WeatherDataExtractor, { cityData } from "./weatherDataExtractor";

class WeatherApiHandler {
    static serverUri: string = "http://localhost:1337/";
    static baseUriWeather: string = "https://api.openweathermap.org/data/2.5";
    static baseUriCity: string = "http://api.openweathermap.org/geo/1.0";
    static WEATHER_API_KEY: string = "83c507fdc7c8c3e1725109118aa45628";
    /**
     * Fetches the weather data for the provided city name.
     * @param city The city name to fetch weather data for (e.g., "Berlin").
     * @returns A Promise resolving to the weather data.
     */
    static async getWeather(city: string): Promise<Object> {
      return new Promise(async (resolve, reject) => {
        try {
          console.log("Fetching coordinates for city:", city);
    
          // Wait for coordinates
          const coordinateApi = await WeatherApiHandler.getLongAndLat(city);
          console.log("Coordinate API Response:", coordinateApi);
    
          const coordinateData: cityData = WeatherDataExtractor.extractLonLat(coordinateApi);
          console.log("Extracted Coordinates:", coordinateData);
    
          const lat = coordinateData.lat;
          const lon = coordinateData.lon;
    
          if (!lat || !lon) {
            throw new Error("Latitude or Longitude is undefined.");
          }
    
          // Construct the query URI for OpenWeatherMap API
          const uri = encodeURIComponent(
            `${WeatherApiHandler.baseUriWeather}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WeatherApiHandler.WEATHER_API_KEY}`
          );
    
          const req = new XMLHttpRequest();
    
          req.onload = function () {
            if (req.status === 200) {
              console.log("Weather API Response:", this.response); // Log response
              resolve(JSON.parse(this.response));
            } else {
              reject(`Request failed with status: ${req.status}`);
            }
          };
    
          req.onerror = function () {
            reject("Network error occurred.");
          };
    
          req.open("GET", WeatherApiHandler.serverUri + "proxy/weather" + `?url=${uri}`);
          console.log("GET URI for Weather:", WeatherApiHandler.serverUri + "proxy/weather" + `?url=${uri}`);
          req.send();
        } catch (error) {
          console.error("Error in getWeather:", error);
          reject(error);
        }
      });
    }
    
    

    /**
     * Fetches the City data for the provided city name.
     * @param city The city name to fetch Latitude and Longitude coordinates.
     * @returns A Promise resolving to the Coordinates.
     */
    static async getLongAndLat(city: string): Promise<Object> {
      return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
    
        req.onload = function () {
          if (req.status === 200) {
            const response = JSON.parse(this.response); // Assuming response is JSON
            console.log("City Coordinate Response:", response); // Add log
            resolve(response);
          } else {
            reject(`Request failed with status: ${req.status}`);
          }
        };
    
        req.onerror = function () {
          reject("Network error occurred.");
        };
    
        const uri = encodeURIComponent(
          `${WeatherApiHandler.baseUriCity}/direct?q=${city}&limit=1&appid=${WeatherApiHandler.WEATHER_API_KEY}`
        );
    
        req.open("GET", WeatherApiHandler.serverUri + "proxy/weather/city" + `?url=${uri}`);
        console.log("GET URI for City:", WeatherApiHandler.serverUri + "proxy/weather/city" + `?url=${uri}`);
        req.send();
      });
    }
    
  }
  
  export default WeatherApiHandler;
  