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
  const { items, setItems } = useGlobal();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [input, setInput] = useState("");
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
            folDocs={variant === "recent" ? folDocs : undefined}
            setPopup={setPopup}
            popup={popup}
            setSelectedFolder={variant === "home" ? setSelectedFolder : undefined}
            setEditable={setEditable}
            handleSelectDocument={handleSelectDocument}
            handleSelectFolder={handleSelectFolder}
          />
        </div>
        <Editor
          editable={editable}
          setEditable={setEditable}
          selectedDocument={selectedDocument}
          setSelectedDocument={setSelectedDocument}
          input={input}
          setInput={handleContentChange}
          setItems={setItems}
        />
      </div>
    </main>
  );
}
