"use client";

import { filterByTab } from "@/app/utils/documents";
import { useGlobal } from "../../../context/GlobalVars";
import useDocumentActions from "../../../hooks/useDocumentActions";
import DocumentItems from "./DocumentItems";
import { useState } from "react";

export default function SearchList({
  handleSelectFolder,
  handleSelectDocument,
  popup,
  setPopup,
  selectedFolder,
  selectedDocument,
  setEditable,
  onTitleChange,
}) {
  const { items, mode, searchDoc, query } = useGlobal();
  const [tab, setTab] = useState("All");

  const actions = useDocumentActions({
    handleSelectFolder,
    handleSelectDocument,
    setEditable,
    setPopup,
  });

  const folders = items.filter(
    (item) => item.type === "Folder" && item.deletedAt === null,
  );
 const docObjects = filterByTab(
  items.filter((item) => searchDoc.includes(item.id)),
  tab,
);
  return (
    <section className="space-y-4 pt-4">
      <DocumentItems
        items={docObjects}
        folders={folders}
        selectedFolder={selectedFolder}
        selectedDocument={selectedDocument}
        mode={mode}
        variant="search"
        popup={popup}
        setPopup={setPopup}
        actions={actions}
        onTitleChange={onTitleChange}
      />
      {
        docObjects.length === 0 && query.length !== 0 && (
        <div>
          <h3>Couldn't find any documents with this query!</h3>
        </div>
        ) 
      }
    </section>
  );
}