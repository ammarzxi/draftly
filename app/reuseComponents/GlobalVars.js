"use client";

import documentsData from "../data/documents";
import AddDoc from "../home/AddDoc";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function useGlobal() {
  return useContext(GlobalContext);
}

export default function GlobalProvider({ children }) {
  const [confirm, setConfirm] = useState(false);
  const addDocument = () => {
    setConfirm(true);
  };
  const [mode, setMode] = useState(null);
  const [items, setItems] = useState(documentsData);
  const [itemType, setItemType] = useState("Document");

  return (
    <GlobalContext.Provider
      value={{
        mode,
        setMode,
        items,
        setItems,
        confirm,
        setConfirm,
        addDocument,
        itemType,
        setItemType,
      }}
    >
      {confirm && <AddDoc confirm={confirm} setConfirm={setConfirm} />}
      {children}
    </GlobalContext.Provider>
  );
}
