"use client";
import WikiApiHandler from "../api/wiki/wikiApiHandler";
import { useState } from "react";
import { Form } from "react-bootstrap";
import WikiExtractor, { Page } from "../api/wiki/wikiExtractor";
import WikiContent from "./wikiContent";
import "../globals.css";
import exp from "constants";

const WikiPage: React.FC = () => {
  const [getPage, setPages] = useState<Page[]>([]);
  const [searchInput, setSearchInput] = useState("");

  return (
    <div>
      <>
        <Form.Label>Geben Sie ihre Suche ein: </Form.Label>
        <Form.Control id="wikiSearchBar" onChange={(t) => setSearchInput(t.target.value ?? "")} type="text" />
      </>
      <button
        id="wikiButton"
        onClick={async () => {
          if (searchInput == "") return;
          const regex = /^[A-Za-z]+$/;
          if (!regex.test(searchInput)) return;

          const res: Object = await WikiApiHandler.lookFor(searchInput);
          const p: Page[] = WikiExtractor.extractPages(res);
          setPages(p);
        }}
      >
        Suche
      </button>
      <div>
        <WikiContent pages={getPage} />
      </div>
    </div>
  );
};

export default WikiPage;
