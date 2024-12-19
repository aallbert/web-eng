import React from "react";
import WikiSearch from "./components/wikisearch";
import { Accordion } from "react-bootstrap";
import Weather from "./components/weather";
import StockChart from "./components/stockChart";

function App() {
  return (
    <div>
      <ul id="appList">
        <li>
          <WikiSearch />
        </li>
        <li>
          <Weather />
        </li>
        <li>
          <StockChart />
        </li>
      </ul>
    </div>
  );
}

export default App;
