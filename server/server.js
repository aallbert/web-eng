const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 1337;
// fetch .env content
require("dotenv").config();
// for xml to json conversion
var parseString = require("xml2js").parseString;
app.use(cors({ origin: "*" })); // Allow all origins for development

app.use(express.static(__dirname + "/public"));
// Proxy route
app.get("/proxy/wiki/", async (req, res) => {
  const query = req.query.url;
  console.log("Wiki-proxy query: ", query);
  try {
    // use a different name for the fetch response to avoid shadowing
    const fetchResponse = await fetch(query, { method: "GET" });

    // extract JSON from the fetch response
    const data = await fetchResponse.json();

    // send the fetched data as the Express response
    res.json(data);
  } catch (error) {
    console.error("Error fetching Wiki data:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get('/proxy/weather/', async (req, res) => {
  //default city is Althengestett :)
  const query = req.query.url || "Althengstett";
  console.log("Weather-proxy query: ", query);

  try {
    // use a different name for the fetch response to avoid shadowing
    const fetchResponse = await fetch(query, { method: "GET" });
    
    // extract JSON from the fetch response
    const data = await fetchResponse.json();

    res.json(data);
  } catch (error) {
    console.error("Error fetching Weather data:", error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.get('/proxy/weather/city/', async (req, res) => {
  //default city is Althengestett :)
  const query = req.query.url || "Althengstett";
  console.log("City-proxy query: ", query);

  try {
    // use a different name for the fetch response to avoid shadowing
    const fetchResponse = await fetch(query, { method: "GET" });
    
    // extract JSON from the fetch response
    const data = await fetchResponse.json();

    res.json(data);
  } catch (error) {
    console.error("Error fetching City data:", error);
    res.status(500).json({ error: 'Failed to fetch City data' });
  }
});

// Endpoint to fetch stock data
app.get('/proxy/stock', async (req, res) => {
  const query = req.query.url;
  console.log("Stock-proxy query: ", query);

  try {
    const fetchResponse = await fetch(query, { method: "GET" });
    
    // extract JSON from the fetch response
    const data = await fetchResponse.json();

    res.json(data)
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return res.status(500).json({ error: 'Failed to fetch stock data.' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
