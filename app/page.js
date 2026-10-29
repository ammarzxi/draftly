"use client";
// What does use client erall mean
// integrate lazy loading and optimztion and other imprtant stuff and auth and security
import { useState } from "react";
import Editor from "./mainComponents/Editor";
import Header from "./mainComponents/Header";
import Intro from "./mainComponents/Intro";
import documentsData from "@/app/data/documents";
import List from "./mainComponents/List";

export default function App() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [mode, setMode] = useState("close");
  const [input, setInput] = useState("");
  const [popup, setPopup] = useState(null);
  const [items, setItems] = useState(documentsData);
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
        setSelectedFolder(null)
      } else {
        setSelectedFolder(fol)
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
            items={items}
            folDocs={folDocs}
            selectedFolder={selectedFolder}
            setItems={setItems}
            setPopup={setPopup}
            mode={mode}
            popup={popup}
            setSelectedDocument={setSelectedDocument}
            editable={editable}
            setEditable={setEditable}
            setMode={setMode}
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
          mode={mode}
          // Show starred doc and it's respective folders
          // AWS SERVICES

          setMode={setMode}
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
