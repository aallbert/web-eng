class WikiApiHandler {
  static serverUri: string = "http://localhost:1337/";
  static baseUri: string = "https://de.wikipedia.org/w/api.php";

  static async searchFor(query: string): Promise<Object> {
    let req: XMLHttpRequest = new XMLHttpRequest();
    // return a promise that resolves when the request completes
    return new Promise((resolve, reject) => {
      req.onload = function () {
        if (req.status === 200) {
          // resolve the promise with the response if the request is successful
          resolve(JSON.parse(this.response)); // Assuming the response is JSON
        } else {
          // reject the promise if there's an error
          reject(`Request failed with status: ${req.status}`);
        }
      };

      req.onerror = function () {
        // reject the promise if the request fails
        reject("Network error occurred.");
      };

      const uri = encodeURIComponent(
        `${this.baseUri}?action=query&format=json&gpslimit=4&prop=extracts%7Cdescription&exintro=1&explaintext=1&exsentences=3&generator=prefixsearch&gpssearch=${query}`
      );
      req.open("GET", this.serverUri + "proxy/wiki" + `?url=${uri}`);
      console.log("GET", this.serverUri + "proxy/wiki" + `?url=${uri}`)
      req.send();
    });
  }
}

export default WikiApiHandler;
