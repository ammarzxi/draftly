"use client";

import { useEffect, useState } from "react";
import { useGlobal } from "../../../context/GlobalVars";
import Editor from "./Editor";
import List from "./List";
import RecentsList from "./RecentsList";
import SearchList from "./SearchList";
import HomeIntro from "../../home/Intro";
import RecentsIntro from "../../recents/Intro";
import TrashIntro from "../../trash/Intro";
import Header from "../Header";
import { usePathname } from "next/navigation";


export default function DocumentWorkspace() {
  const { items, setMode, editDocument, editFolder, variant, setVariant, query, setQuery } = useGlobal();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [input, setInput] = useState("");
  const [popup, setPopup] = useState(null);
  const [editable, setEditable] = useState(false);

  const pathname = usePathname()

  const selectedDocument =
    items.find(
      (item) => item.id === selectedItemId && item.deletedAt === null,
    ) || null;
  const selectedFolder =
    items.find(
      (item) =>
        item.id === selectedFolderId &&
        item.type === "Folder" &&
        item.deletedAt === null,
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
    setSelectedFolderId((prev) => (prev === id ? null : folder.id));
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

   function handleTitleChange(item, title) {
  if (item.type === "Folder") {
    editFolder(item.id, {
      title,
      updatedAt: new Date().toISOString(),
    });
  } else {
    editDocument(item.id, {
      title,
      updatedAt: new Date().toISOString(),
    });
  }
}

 const page = pathname === "/trash"
  ? "trash"
  : pathname === "/recents"
    ? "recent"
    : "home";
  const displayVariant = query?.trim() ? "search" : page;

  const DocumentList =
  displayVariant === "search" || page === "trash"
    ? SearchList
    : page === "recent"
      ? RecentsList
      : List;

    useEffect(() => {
      if (query?.length !== 0) {
        setQuery(null)
      }
    },[pathname]);

  return (
    <main className="p-4">
      <Header />
      <div className="grid grid-cols-1 pt-6 gap-x-4 h-fit items-start relative">
        <div className="py-4">
          {
          pathname === "/" ?
          <HomeIntro />
           : pathname === "/recents" ? <RecentsIntro /> : pathname === "/trash" ? <TrashIntro /> : null
          }
          <DocumentList
            selectedFolder={selectedFolder}
            selectedDocument={selectedDocument}
            setPopup={setPopup}
            popup={popup}
            variant={displayVariant === "search" ? "search" : page}
            setSelectedFolder={setSelectedFolderId}
            setEditable={setEditable}
            onTitleChange={handleTitleChange}
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
