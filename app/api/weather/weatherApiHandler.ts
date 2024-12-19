class WeatherApiHandler {
    static serverUri: string = "http://localhost:1337/";
    static baseUri: string = "https://api.openweathermap.org/data/2.5";
    
    /**
     * Fetches the weather data for the provided city name.
     * @param city The city name to fetch weather data for (e.g., "Berlin").
     * @returns A Promise resolving to the weather data.
     */
    static async getWeather(city: string): Promise<Object> {
      const WEATHER_API_KEY = "83c507fdc7c8c3e1725109118aa45628"
      let req: XMLHttpRequest = new XMLHttpRequest();
      // Return a promise that resolves when the request completes
      return new Promise((resolve, reject) => {
        req.onload = function () {
          if (req.status === 200) {
            // Resolve the promise with the parsed JSON response
            resolve(JSON.parse(this.response)); // Assuming the response is JSON
          } else {
            // Reject the promise if the status code is not 200
            reject(`Request failed with status: ${req.status}`);
          }
        };
  
        req.onerror = function () {
          // Reject the promise if there's a network error
          reject("Network error occurred.");
        };
  
        // Construct the query URI for OpenWeatherMap API
        const uri = encodeURIComponent(
        //   `${this.baseUri}forecast?q=${city}&appid=${WEATHER_API_KEY}`
        `https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${WEATHER_API_KEY}`
        );
  
        // Make the GET request to your server proxy
        req.open("GET", this.serverUri + "proxy/weather" + `?url=${uri}`);
        console.log("GET", this.serverUri + "proxy/weather" + `?url=${uri}`)
        req.send();
      });
    }
  }
  
  export default WeatherApiHandler;
  