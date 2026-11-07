"use client";

import { useState } from "react";
import Intro from "../components/recents/Intro";
import RecentsList from "../components/layout/documents/RecentsList";
import Header from "@/app/components/layout/Header"


import documentsData from "@/app/data/documents";
import { useGlobal } from "../context/GlobalVars";
import Editor from "../components/layout/documents/Editor";

export default function Recent() {
  const [items, setItems] = useState(documentsData);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [input, setInput] = useState("");
  const { mode, setMode } = useGlobal();
  const [popup, setPopup] = useState(null);
  const [editable, setEditable] = useState(false);

  const folDocs = items.filter(
    (item) =>
      item.type === "Document" &&
      item.folderId !== null &&
      item.folderId === selectedFolder?.id,
  );

  function handleSelectDocument(doc) {
    setSelectedDocument(doc);
    setInput(doc.content ?? "");
  }

  function handleSelectFolder(fol, id) {
    if (selectedFolder?.id === id) {
      setSelectedFolder(null);
    } else {
      setSelectedFolder(fol);
    }
  }

  function handleContentChange(newContent) {
    setInput(newContent);

    setItems((prevItems) =>
      prevItems.map((doc) =>
        doc.id === selectedDocument?.id ? { ...doc, content: newContent } : doc,
      ),
    );
  }
  return (
    <main className="p-4">
      <Header />
      <div className="grid grid-cols-1 pt-6 gap-x-4 h-fit items-start relative">
        <div className="py-4">
          <Intro />
          <RecentsList
            data={documentsData}
            selectedDocument={selectedDocument}
            items={items}
            folDocs={folDocs}
            selectedFolder={selectedFolder}
            setItems={setItems}
            setPopup={setPopup}
            setSelectedFolder={setSelectedFolder}
            popup={popup}
            setSelectedDocument={setSelectedDocument}
            editable={editable}
            setEditable={setEditable}
            handleSelectDocument={handleSelectDocument}
            handleSelectFolder={handleSelectFolder}
          />
          {/* PINNED ONEs */}
        </div>
        <Editor
          popup={popup}
          setPopup={setPopup}
          editable={editable}
          setEditable={setEditable}
          selectedDocument={selectedDocument}
          setSelectedDocument={setSelectedDocument}
          input={input}
          setInput={handleContentChange}
          // Show starred doc and it's respective folders
          // AWS SERVICES

          items={items}
          setItems={setItems}
        />
        {/* Add a sepereate type of right-col here */}
      </div>
      {/* Add mini feats */}
      {/* ADD THE NEWEST FIRST TYPE FILTER */}
      {/* FIX HEADING HEIRARCY ANDOTHER SMEANTIC TAGS */}
    </main>
  );
}
