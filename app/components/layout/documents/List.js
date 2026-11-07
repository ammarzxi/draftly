"use client";

import { useEffect, useState } from "react";
import { useGlobal } from "../../../context/GlobalVars";
import AddOnlyDoc from "./AddOnlyDoc";
import DocumentRow from "./DocumentRow";

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
  const [newDoc, setNewDoc] = useState(false);
  const [activeFolder, setActiveFolder] = useState(null);
  const [tab, setTab] = useState("All");
  const {
    mode,
    setMode,
    items,
    editDocument,
    editFolder,
    deleteDocument,
    deleteFolder,
  } = useGlobal();

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("[data-popup-wrapper]")) {
        setPopup(null);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [setPopup]);

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
  const foldersData = items.filter((item) => item.type === "Folder");

  function handleSelect(item) {
    if (item.type === "Folder") {
      handleSelectFolder(item, item.id);
      setMode("folder");
    } else {
      handleSelectDocument(item);
      setMode("view");
    }

    setEditable(false);
  }

  function handleEdit(item) {
    handleSelectDocument(item);
    setMode("write");
    setEditable(true);
  }

  function handleDelete(item) {
    const deletedAt = new Date().toISOString();

    if (item.type === "Folder") {
      deleteFolder(item.id, deletedAt);
    } else {
      deleteDocument(item.id, deletedAt);
    }
  }

  function toggleStar(item) {
    const updates = { starred: !item.starred };

    if (item.type === "Folder") {
      editFolder(item.id, updates);
    } else {
      editDocument(item.id, updates);
    }
  }

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
        {visibleItems.map((item) => {
          const folder = foldersData.find((entry) => entry.id === item.folderId);
          const folderDocs =
            mode === "folder" && selectedFolder?.id === item.id
              ? items.filter(
                  (doc) =>
                    doc.type === "Document" &&
                    doc.folderId === item.id &&
                    doc.deletedAt === null,
                )
              : [];

          return (
            <DocumentRow
              key={item.id}
              item={item}
              folder={folder}
              mode={mode}
              selectedFolder={selectedFolder}
              popup={popup}
              setPopup={setPopup}
              onSelect={handleSelect}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStar={toggleStar}
              onAddDocument={(folder) => {
                setActiveFolder(folder);
                setNewDoc(true);
              }}
            >
              {folderDocs.map((doc) => (
                <DocumentRow
                  key={doc.id}
                  item={doc}
                  mode={mode}
                  selectedFolder={selectedFolder}
                  popup={popup}
                  setPopup={setPopup}
                  onSelect={(selected) => {
                    handleSelectDocument(selected);
                    setMode("view");
                    setEditable(false);
                  }}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleStar={toggleStar}
                />
              ))}
            </DocumentRow>
          );
        })}
      </div>

      <span className="text-muted text-sm flex items-center justify-center mt-4">
        {visibleItems.length} documents.
      </span>

      {visibleItems.length === 0 && (
        <p>Empty List! Add some to get started</p>
      )}

      {newDoc && (
        <AddOnlyDoc currentFolder={activeFolder} setNewDoc={setNewDoc} />
      )}
    </section>
  );
}
