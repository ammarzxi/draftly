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
  const [query, setQuery] = useState(null);
  const [searchDoc, setSearchDoc] = useState(null);
  const [variant, setVariant] = useState(null);

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
      starred: document.starred,
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
      starred: folder.starred,
      pinned: false,
      createdAt: folder.created_at,
      updatedAt: folder.created_at,
      deletedAt: folder.deleted_at,
      deleteId: null,
    }));

    setItems([...folders, ...documents]);
  }
  fetchItems();
  }, []);

  async function createDocument(document) {
    const supabase = createClient();

    const { data, error } = await supabase.from("documents").insert({
      title: document.title,
      content: "",
      folder_id: document.folderId,
    }).select().single();

    if (error) {
      console.log(error);
      return false;
    }

     const newDocument = {
        id: data.id,
        title: data.title,
        type: "Document",
        category: data.category,
        folderId: data.folder_id,
        color: "primary",
        starred: false,
        pinned: false,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        deletedAt: data.deleted_at,
        deleteId: null,
        content: data.content,
    };

    setItems((prev) => addItem(prev, newDocument));
    return true;
  }

  async function createFolder(folder) {
    const supabase = createClient();

    const { data, error } = await supabase.from("folders").insert({
      name: folder.title
    }).select().single();

    if (error) {
      console.log(error);
      return false;
    }

     const newFolder = {
        id: data.id,
        title: data.name,
        type: "Folder",
        folderId: null,
        color: "yellow",
        starred: false,
        pinned: false,
        createdAt: data.created_at,
        updatedAt: data.created_at,
        deletedAt: null,
        deleteId: null,
    };

    setItems((prev) => addItem(prev, newFolder));
    return true;
  }

  async function editDocument(id, updates) {
    const supabase = createClient();

    const { error } = await supabase.from("documents").update({
      content: updates.content,
      updated_at: updates.updatedAt,
      title: updates.title,
      starred: updates.starred,
    }).eq("id", id)

    if (error) {
      console.log(error);
      return false;
    }

    setItems((prev) => updateItem(prev, id, "Document" ,updates));
    
    return true;
  }

  async function editFolder(id, updates) {
    const supabase = createClient();

    const {error} = await supabase.from("folders").update({
      name: updates.title,
      starred: updates.starred,
    }).eq("id", id);
    
    if (error) {
      console.log(error);
      return false;
    }

    setItems((prev) => updateItem(prev, id, "Folder", updates));
    return true;
  }

  async function deleteDocument(id, deletedAt) {
    const supabase = createClient();

    const { error } = await supabase
    .from("documents")
    .update({ deleted_at: deletedAt })
    .eq("id", id);

    if (error) {
      console.log(error);
      return false;
    }

    setItems((prev) => softDeleteItem(prev, id, "Document", deletedAt))
    return true;
  }

  async function deleteFolder(id, deletedAt) {
    const supabase = createClient();
    const { error } = await supabase.from("folders").update({ deleted_at: deletedAt }).eq("id", id);

    if (error) {
      console.log(error);
      return false;
    }

    setItems((prev) => deleteFolderItem(prev, id, deletedAt));
    return true;
  }

  async function restoreDocumentItem(id) {
    const supabase = createClient();

    const { error } = await supabase.from("documents").update({
      deleted_at: null,
    }).eq("id", id);

    if (error) {
      console.log(error);
      return false;
    }

    setItems((prev) => restoreItem(prev, id, "Document"));
    return true;
  }

 async function restoreFolderItem(id) {
    const supabase = createClient();

    const {error} = await supabase.from("folders").update({
      deleted_at: null,
    }).eq("id", id);

    if (error) {
      console.log(error);
      return false;
    }

    setItems((prev) => restoreFolderItems(prev, id));
    return true;
  }

  async function permanentlyDeleteDocumentItem(id) {
    const supabase = createClient();

    const { error } = await supabase.from("documents").delete().eq("id", id);

    if (error) {
      console.log(error);
      return false;
    }

    setItems((prev) => permanentlyDeleteItem(prev, id, "Document"));
    return true;
  }

  async function permanentlyDeleteFolder(id) {
    const supabase = createClient();

    const {error} = await supabase.from("folders").delete().eq("id", id);

    if (error) {
      console.log(error);
      return false;
    }

    setItems((prev) => permanentlyDeleteFolderItem(prev, id));
    return true;
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
        query,
        setQuery,
        createFolder,
        editDocument,
        editFolder,
        deleteDocument,
        deleteFolder,
        restoreDocumentItem,
        restoreFolderItem,
        permanentlyDeleteDocumentItem,
        permanentlyDeleteFolderItem: permanentlyDeleteFolder,
        searchDoc,
        setSearchDoc,
        setVariant,
        variant,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
