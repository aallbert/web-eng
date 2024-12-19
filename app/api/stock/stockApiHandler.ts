class StockApiHandler {
    static serverUri: string = "http://localhost:1337/";
    static stockApiBaseUri: string = "https://www.alphavantage.co/query";
  
    /**
     * Fetches stock data for the provided stock symbol.
     * @param symbol The stock symbol to query (e.g., "IBM").
     * @returns A Promise resolving to the stock data.
     */ 
    static async getStockData(symbol: string): Promise<Object> {
      let req: XMLHttpRequest = new XMLHttpRequest();
      // Return a promise that resolves when the request completes
      return new Promise((resolve, reject) => {
        req.onload = function () {
          if (req.status === 200) {
            // Resolve the promise with the parsed JSON response
            resolve(JSON.parse(this.response)); // Assuming the response is JSON
          } else {
            // Reject the promise if the status code is not 200
            reject(`Request failed   with status: ${req.status}`);
          }
        };
  
        req.onerror = function () {
          // Reject the promise if there's a network error
          reject("Network error occurred.");
        };
  
        // Construct the query URI for Alpha Vantage API
        const uri = encodeURIComponent(
          `${this.stockApiBaseUri}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=demo` // Replace 'demo' with your actual API key
        );
  
        // Make the GET request to your server proxy
        req.open("GET", this.serverUri + "proxy/stock" + `?url=${uri}`);
        req.send();
      });
    }
  }
  
  export default StockApiHandler;
  