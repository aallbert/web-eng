import React from "react";
import WikiPage from "./components/wikisearch";
import { Accordion } from "react-bootstrap";

function App() {
  return (
    <div>
      <ul id="appList">
        <li>
          <WikiPage />
        </li>
        <li>et</li>
      </ul>
    </div>
  );
}

export default App;
