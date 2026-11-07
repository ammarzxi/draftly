"use client";
// What does use client erall mean
// integrate lazy loading and optimztion and other imprtant stuff and auth and security
import { useGlobal } from "./context/GlobalVars";
import { useState } from "react";
import Editor from "./components/layout/documents/Editor";
import Header from "@/app/components/layout/Header"
import Intro from "@/app/components/home/Intro";
import List from "./components/layout/documents/List";

export default function App() {
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

  // MAKE A POST ON LINKEDIN AND INSTA ABT THIS AND MAKE INSTA VIDOES WITH HIGHLITS OF CATS AND ALSO MANAGE THE FOLDER > dOCUMENTS THING
  return (
    <main className="p-4">
      <Header />
      <div className="grid grid-cols-1 pt-6 gap-x-4 h-fit items-start relative">
        <div className="py-4">
          <Intro />
          <List
            selectedDocument={selectedDocument}
            selectedFolder={selectedFolder}
            setPopup={setPopup}
            setSelectedFolder={setSelectedFolder}
            popup={popup}
            setSelectedDocument={setSelectedDocument}
            editable={editable}
            setEditable={setEditable}
            handleSelectDocument={handleSelectDocument}
            handleSelectFolder={handleSelectFolder}
          />
        </div>
        {/* Add a sepereate type of right-col here */}
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
      </div>
      {/* Add mini feats */}
      {/* ADD THE NEWEST FIRST TYPE FILTER */}
      {/* FIX HEADING HEIRARCY ANDOTHER SMEANTIC TAGS */}
    </main>
  );
}
