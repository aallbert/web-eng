import * as jp from 'jsonpath-plus';

/** 
 * Interface for Stock Data extracted from the API response 
 */
export interface dailyValue {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
}

export interface stockData {
    symbol: string;
    dailyValues: dailyValue[]
}


export default class StockDataExtractor {
    /**
     * Extract structured weather data from the API response
     * @param apiResponse - Raw weather API response
     * @returns WeatherData object
     */
    static extractStockData(apiResponse: any): stockData {
        console.log("apiResponse: ", apiResponse)
        if (!apiResponse) {
            throw new Error("Invalid data format");
        }
    
        // Extract the symbol using jsonpath
        const symbol = jp.JSONPath({ path: '$["Meta Data"].*', json: apiResponse })[1] as string;
        console.log("symbol ", symbol)
    
        // Extract the time series data using jsonpath
        const dataObject = jp.JSONPath({ path: '$["Time Series (Daily)"]', json: apiResponse }) as any;
        if (!dataObject) {
            throw new Error("Invalid or missing Time Series (Daily) data");
        }

        console.log("dataObject", dataObject)
    
        // Convert the dataObject into an array of dailyValue objects
        const resultValues: dailyValue[] = Object.keys(dataObject).map((date) => ({
            date: new Date(date),
            open: parseFloat(dataObject[date]["1. open"]),
            high: parseFloat(dataObject[date]["2. high"]),
            low: parseFloat(dataObject[date]["3. low"]),
            close: parseFloat(dataObject[date]["4. close"]),
        }));
    
        console.log("resultValues: ", resultValues);
    
        // Return the structured stock data
        return {
            symbol: symbol,
            dailyValues: resultValues,
        };
    }
    
}

