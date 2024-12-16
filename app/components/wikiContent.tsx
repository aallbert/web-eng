"use client";
import React from "react";
import { Page } from "../api/wiki/wikiExtractor";

interface WikiContentProps {
  pages: Page[];
}

const WikiContent: React.FC<WikiContentProps> = ({ pages }) => {
  return (
    <div>
      {pages?.map((value, _) => (
        <ul>
          <li>pageid: {value.pageid}</li>
          <li>ns: {value.ns}</li>
          <li>title: {value.title}</li>
          <li>index: {value.index}</li>
          <li>extract: {value.extract}</li>
          <li>description: {value.description}</li>
          <li>descriptionsource: {value.descriptionsource}</li>
        </ul>
      ))}
    </div>
  );
};

export default WikiContent;
