/** 
 * Interface for Weather Data extracted from the API response 
 */
export interface forecast {
  time: Date;
  temperature: number; // in Celsius
  description: string; // Weather description
  humidity: number; // Percentage of humidity
  windSpeed: number; // Wind speed in m/s
}

export interface WeatherData {
    city: string;
    forecasts: forecast[]
  }
  
  export default class WeatherDataExtractor {
    /**
     * Extract structured weather data from the API response
     * @param apiResponse - Raw weather API response
     * @returns WeatherData object
     */
    static extractWeather(apiResponse: any): WeatherData {
      if (!apiResponse) {
        throw new Error("Invalid data format");
      }
      if (apiResponse.cod = 404) {
        console.log("apiResponse: ", apiResponse)
        throw new Error("cod = 404 -> error by the Weather API")
      }
      const resultLocation = apiResponse.city.name;
      let resultForecast: forecast[] = [];
      for (let i = 0; i < apiResponse.list.length; i++) {
        let forecast = apiResponse.list[i];
        resultForecast.push({
          time: forecast.dt,
          temperature: forecast.main.temp,
          description: forecast.weather.description,
          humidity: forecast.main.humidity,
          windSpeed: forecast.wind.speed
        })
      }
      return{ city: resultLocation,
        forecasts: Object.values(resultForecast)
      };
      };
    }
  
  