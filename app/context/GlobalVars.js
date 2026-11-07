"use client";

import documentsData from "../data/documents";
import { createContext, useContext, useState } from "react";

import {
  addDocument as addDocumentService,
  updateDocument,
  softDeleteDocument,
  restoreDocument,
  permanentlyDeleteDocument,
} from "../services/documents";

import {
  addFolder as addFolderService,
  updateFolder,
  softDeleteFolder,
  restoreFolder,
  permanentlyDeleteFolder,
} from "../services/folders";

const GlobalContext = createContext();

export function useGlobal() {
  return useContext(GlobalContext);
}

export default function GlobalProvider({ children }) {
  const [items, setItems] = useState(documentsData);
  const [mode, setMode] = useState(null);

  const createDocument = (document) => {
    setItems((prev) => addDocumentService(prev, document));
  };

  const createFolder = (folder) => {
    setItems((prev) => addFolderService(prev, folder));
  };

  const editDocument = (id, updates) => {
    setItems((prev) => updateDocument(prev, id, updates));
  };

  const editFolder = (id, updates) => {
    setItems((prev) => updateFolder(prev, id, updates));
  };

  const deleteDocument = (id, deletedAt) => {
    setItems((prev) => softDeleteDocument(prev, id, deletedAt));
  };

  const deleteFolder = (id, deletedAt) => {
    setItems((prev) => softDeleteFolder(prev, id, deletedAt));
  };

  const restoreDocumentItem = (id) => {
    setItems((prev) => restoreDocument(prev, id));
  };

  const restoreFolderItem = (id) => {
    setItems((prev) => restoreFolder(prev, id));
  };

  const permanentlyDeleteDocumentItem = (id) => {
    setItems((prev) => permanentlyDeleteDocument(prev, id));
  };

  const permanentlyDeleteFolderItem = (id) => {
    setItems((prev) => permanentlyDeleteFolder(prev, id));
  };

  return (
    <GlobalContext.Provider
      value={{
        items,
        setItems,
        mode,
        setMode,
        createDocument,
        createFolder,
        editDocument,
        editFolder,
        deleteDocument,
        deleteFolder,
        restoreDocumentItem,
        restoreFolderItem,
        permanentlyDeleteDocumentItem,
        permanentlyDeleteFolderItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}