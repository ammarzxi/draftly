"use client";

import { useState } from "react";
import { useGlobal } from "../../../context/GlobalVars";
import useDocumentActions from "../../../hooks/useDocumentActions";
import AddDoc from "./AddDoc";
import DocumentItems from "./DocumentItems";

const buttons = ["All", "Recent", "Starred", "Folders"];

export default function List({
  handleSelectFolder,
  handleSelectDocument,
  popup,
  setSelectedFolder,
  setPopup,
  selectedFolder,
  setEditable,
}) {
  const [activeFolder, setActiveFolder] = useState(null);
  const [tab, setTab] = useState("All");
  const { mode, items } = useGlobal();

  const actions = useDocumentActions({
    handleSelectFolder,
    handleSelectDocument,
    setEditable,
    setPopup,
  });

  const sortedItems = [...items].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  );

  const filteredItems =
    tab === "Recent"
      ? sortedItems
      : items.filter((item) => {
          if (tab === "Folders") return item.type === "Folder";
          if (tab === "Starred")
            return item.type === "Document" && item.starred;
          if (tab === "All")
            return (
              item.type === "Folder" ||
              (item.type === "Document" && item.folderId == null)
            );
          return false;
        });

  const visibleItems = filteredItems.filter((item) => item.deletedAt === null);
  const folders = items.filter(
    (item) => item.type === "Folder" && item.deletedAt === null,
  );

  return (
    <section className="space-y-4 pt-4">
      <div className="flex items-center gap-x-6 border-b border-muted/20">
        {buttons.map((button) => (
          <button
            key={button}
            type="button"
            className={
              "pb-4 " +
              (tab === button
                ? "underline decoration-primary decoration-4 text-primary/80"
                : "transition-colors duration-300 ease-in-out")
            }
            onClick={() => {
              setTab(button);
              setSelectedFolder(null);
            }}
          >
            {button}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <DocumentItems
          items={visibleItems}
          allItems={items}
          folders={folders}
          mode={tab === "Recent" ? null : mode}
          selectedFolder={selectedFolder}
          popup={popup}
          setPopup={setPopup}
          actions={actions}
          onAddDocument={setActiveFolder}
        />
      </div>

      <span className="text-muted text-sm flex items-center justify-center mt-4">
        {visibleItems.filter((item) => item.type === "Document").length}{" "}
        documents.
      </span>

      {visibleItems.length === 0 && <p>Empty List! Add some to get started</p>}

      {activeFolder && (
        <AddDoc
          currentFolder={activeFolder}
          onClose={() => setActiveFolder(null)}
        />
      )}
    </section>
  );
}
