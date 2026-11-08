"use client";

import { useEffect, useState } from "react";
import { useGlobal } from "../../../context/GlobalVars";
import Editor from "./Editor";
import List from "./List";
import RecentsList from "./RecentsList";
import HomeIntro from "../../home/Intro";
import RecentsIntro from "../../recents/Intro";
import Header from "../Header";

export default function DocumentWorkspace({ variant }) {
  const { items, setMode, editDocument, editFolder } = useGlobal();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [input, setInput] = useState("");
  const [popup, setPopup] = useState(null);
  const [editable, setEditable] = useState(false);

  const selectedDocument = items.find(
    (item) => item.id === selectedItemId && item.deletedAt === null,
  ) || null;
  const selectedFolder = items.find(
    (item) => item.id === selectedFolderId && item.type === "Folder" && item.deletedAt === null,
  ) || null;

  useEffect(() => {
    if (selectedItemId && !selectedDocument) {
      setSelectedItemId(null);
      setInput("");
      setEditable(false);
      setMode("folder");
    }
  }, [selectedItemId, selectedDocument, setMode]);

  function handleSelectDocument(doc) {
    setSelectedItemId(doc.id);
    setInput(doc.content ?? "");
  }

  function handleSelectFolder(folder, id) {
    setSelectedFolderId((prev) => prev === id ? null : folder.id);
  }

  function handleContentChange(content) {
    setInput(content);

    if (selectedDocument?.type === "Document") {
      editDocument(selectedDocument.id, {
        content,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  function handleTitleChange(title) {
    if (selectedDocument?.type === "Folder") {
      editFolder(selectedDocument.id, {
        title,
        updatedAt: new Date().toISOString(),
      });
    } else if (selectedDocument) {
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
            setSelectedFolder={setSelectedFolderId}
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
