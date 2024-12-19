/** 
 * Interface for Weather Data extracted from the API response 
 */
export interface cityData {
  lat: number;
  lon: number;
}

export interface forecast {
  time: string;
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
         console.log("apiResponse: ", apiResponse)
      const resultLocation = apiResponse.city.name;
      let resultForecast: forecast[] = [];
      for (let i = 0; i < apiResponse.list.length; i++) {
        let forecast = apiResponse.list[i];
        resultForecast.push({
          time: forecast.dt_txt,
          temperature: forecast.main.temp,
          description: forecast.weather[0].description,
          humidity: forecast.main.humidity,
          windSpeed: forecast.wind.speed
        })
      }
      return{ city: resultLocation,
        forecasts: Object.values(resultForecast)
      };
      };

      static extractLonLat(coordinateApi: Object): cityData {
        console.log("Coordinate API Input to Extractor:", coordinateApi); // Log input
        if (Array.isArray(coordinateApi) && coordinateApi.length > 0) {
          const { lat, lon } = coordinateApi[0]; // Assuming the response is an array
          console.log("Extracted lat, lon:", lat, lon); // Log extracted values
          return { lat, lon };
        } else {
          throw new Error("Invalid coordinate API response structure.");
        }
      }
      
    }
  
  