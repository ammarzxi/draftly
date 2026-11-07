"use client";

import { useState } from "react";
import { useGlobal } from "../../../context/GlobalVars";
import Editor from "./Editor";
import List from "./List";
import RecentsList from "./RecentsList";
import HomeIntro from "../../home/Intro";
import RecentsIntro from "../../recents/Intro";
import Header from "../Header";

export default function DocumentWorkspace({ variant }) {
  const { items, editDocument } = useGlobal();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [input, setInput] = useState("");
  const [popup, setPopup] = useState(null);
  const [editable, setEditable] = useState(false);

  function handleSelectDocument(doc) {
    setSelectedDocument(doc);
    setInput(doc.content ?? "");
  }

  function handleSelectFolder(folder, id) {
    if (selectedFolder?.id === id) {
      setSelectedFolder(null);
    } else {
      setSelectedFolder(folder);
    }
  }

  function handleContentChange(content) {
    setInput(content);

    if (selectedDocument) {
      editDocument(selectedDocument.id, {
        content,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  function handleTitleChange(title) {
    setSelectedDocument((prev) => prev ? { ...prev, title } : prev);

    if (selectedDocument) {
      editDocument(selectedDocument.id, {
        title,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  const Intro = variant === "recent" ? RecentsIntro : HomeIntro;
  const DocumentList = variant === "recent" ? RecentsList : List;

  return (
    <main className="p-4">
      <Header />
      <div className="grid grid-cols-1 pt-6 gap-x-4 h-fit items-start relative">
        <div className="py-4">
          <Intro />
          <DocumentList
            selectedFolder={selectedFolder}
            setPopup={setPopup}
            popup={popup}
            setSelectedFolder={setSelectedFolder}
            setEditable={setEditable}
            handleSelectDocument={handleSelectDocument}
            handleSelectFolder={handleSelectFolder}
          />
        </div>
        <Editor
          editable={editable}
          setEditable={setEditable}
          selectedDocument={selectedDocument}
          input={input}
          onInputChange={handleContentChange}
          onTitleChange={handleTitleChange}
        />
      </div>
    </main>
  );
}
