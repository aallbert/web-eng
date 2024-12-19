"use client";
import WikiApiHandler from "../api/wiki/wikiApiHandler";
import { useState } from "react";
import WikiExtractor, { Page } from "../api/wiki/wikiExtractor";
import WikiContent from "./wikiContent";
import "../globals.css";

const WikiSearch: React.FC = () => {
  const [getPage, setPages] = useState<Page[]>([]);
  const [searchInput, setSearchInput] = useState("");

  return (
    <div>
      <h2>Wikipedia Suche</h2>
      <input
      type="text"
      placeholder="Suchanfrage eingeben" 
      id="wikiSearchBar" 
      value={searchInput}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value ?? "")} />
      
      <button
        id="wikiButton"
        onClick={async () => {
          if (searchInput == "") return;

          const result: Object = await WikiApiHandler.searchFor(searchInput);
          const pages: Page[] = WikiExtractor.extractPages(result);
          setPages(pages);
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

export default WikiSearch;
