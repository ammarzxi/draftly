"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/app/lib/supabase/client";
import {
  addItem,
  updateItem,
  softDeleteItem,
  deleteFolderItem,
  restoreItem,
  restoreFolderItem as restoreFolderItems,
  permanentlyDeleteItem,
  permanentlyDeleteFolderItem,
} from "../services/items";
import documentsData from "../data/documents";

const GlobalContext = createContext(null);

export function useGlobal() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobal must be used inside GlobalProvider");
  }

  return context;
}

export default function GlobalProvider({ children }) {
  const [items, setItems] = useState([]);
  const [mode, setMode] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      const supabase = createClient();

      const [documentsResult, foldersResult] = await Promise.all([
        supabase.from("documents").select("*").order("updated_at", {ascending : false}),
        supabase.from("folders").select("*").order("created_at", { ascending: false }),
      ]);

      if (documentsResult.error) {
        console.log(documentsResult.error);
        return
      }

      if (foldersResult.error) {
        console.log(foldersResult.error);
        return
      }

      const documents = documentsResult.data.map((document) => ({
      id: document.id,
      title: document.title,
      type: "Document",
      category: document.category,
      folderId: document.folder_id,
      color: "primary",
      starred: false,
      pinned: false,
      createdAt: document.created_at,
      updatedAt: document.updated_at,
      deletedAt: document.deleted_at,
      deleteId: null,
      content: document.content,
    }));

    const folders = foldersResult.data.map((folder) => ({
      id: folder.id,
      title: folder.name,
      type: "Folder",
      folderId: null,
      color: "yellow",
      starred: false,
      pinned: false,
      createdAt: folder.created_at,
      updatedAt: folder.created_at,
      deletedAt: null,
      deleteId: null,
    }));

    setItems([...folders, ...documents]);
  }
  fetchItems();
  }, []);

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
    setItems((prev) => restoreFolderItems(prev, id));
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
