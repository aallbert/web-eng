"use client";
import React from "react";
import { Page } from "../api/wiki/wikiExtractor";
import "../globals.css"

interface WikiContentProps {
  pages: Page[];
}

const WikiContent: React.FC<WikiContentProps> = ({ pages }) => {
  return (
    <div>
      {pages?.map((value, key) => (
        <table id="wikiList"key={key}>
          <thead>
            <tr>
              <th id="thTitle">{"Title: "}</th>
              <th id="thDescription">{"Description: "}</th>
              <th id="thExtract">{"Extract: "}</th>
              <th id="thLink">{"Link: "}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{value.title}</td>
              <td>{value.description}</td>
              <td>{value.extract}</td>
              <td><a href={`https://de.wikipedia.org/?curid=${value.pageid}`}>https://de.wikipedia.org/?curid={value.pageid}</a></td>
            </tr>
          </tbody>  
        </table>
      ))}
    </div>
  );
};

export default WikiContent;
