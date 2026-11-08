"use client";

import documentsData from "../data/documents";
import { createContext, useContext, useState } from "react";
import {
  addItem,
  updateItem,
  softDeleteItem,
  deleteFolderItem,
  restoreItem,
  restoreFolderItem,
  permanentlyDeleteItem,
  permanentlyDeleteFolderItem,
} from "../services/items";

const GlobalContext = createContext(null);

export function useGlobal() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobal must be used inside GlobalProvider");
  }

  return context;
}

export default function GlobalProvider({ children }) {
  const [items, setItems] = useState(documentsData);
  const [mode, setMode] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  function createDocument(document) {
    setItems((prev) => addItem(prev, document));
  }

  function createFolder(folder) {
    setItems((prev) => addItem(prev, folder));
  }

  function editDocument(id, updates) {
    setItems((prev) => updateItem(prev, id, "Document", updates));
  }

  function editFolder(id, updates) {
    setItems((prev) => updateItem(prev, id, "Folder", updates));
  }

  function deleteDocument(id, deletedAt) {
    setItems((prev) => softDeleteItem(prev, id, "Document", deletedAt));
  }

  function deleteFolder(id, deletedAt) {
    setItems((prev) => deleteFolderItem(prev, id, deletedAt));
  }

  function restoreDocumentItem(id) {
    setItems((prev) => restoreItem(prev, id, "Document"));
  }

  function restoreFolderItem(id) {
    setItems((prev) => restoreFolderItem(prev, id));
  }

  function permanentlyDeleteDocumentItem(id) {
    setItems((prev) => permanentlyDeleteItem(prev, id, "Document"));
  }

  function permanentlyDeleteFolder(id) {
    setItems((prev) => permanentlyDeleteFolderItem(prev, id));
  }

  return (
    <GlobalContext.Provider
      value={{
        items,
        mode,
        setMode,
        addOpen,
        setAddOpen,
        createDocument,
        createFolder,
        editDocument,
        editFolder,
        deleteDocument,
        deleteFolder,
        restoreDocumentItem,
        restoreFolderItem,
        permanentlyDeleteDocumentItem,
        permanentlyDeleteFolderItem: permanentlyDeleteFolder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
