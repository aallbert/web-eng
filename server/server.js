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
  console.log("Proxy query: ", query);
  try {
    // use a different name for the fetch response to avoid shadowing
    const fetchResponse = await fetch(query, { method: "GET" });

    // extract JSON from the fetch response
    const data = await fetchResponse.json();

    // send the fetched data as the Express response
    res.json(data);
  } catch (error) {
    console.error("Error fetching external data:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
