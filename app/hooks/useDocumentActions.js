import { useEffect } from "react";
import { useGlobal } from "../context/GlobalVars";

export default function useDocumentActions({
  handleSelectFolder,
  handleSelectDocument,
  setEditable,
  setPopup,
}) {
  const {
    setMode,
    editDocument,
    editFolder,
    deleteDocument,
    deleteFolder,
  } = useGlobal();

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("[data-popup-wrapper]")) {
        setPopup(null);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [setPopup]);

  function handleSelect(item) {
    if (item.type === "Folder") {
      handleSelectFolder(item, item.id);
      setMode("folder");
    } else {
      handleSelectDocument(item);
      setMode("view");
    }

    setEditable(false);
  }

  function handleEdit(item) {
    handleSelectDocument(item);
    setMode("write");
    setEditable(true);
  }

  function handleDelete(item) {
    const deletedAt = new Date().toISOString();

    if (item.type === "Folder") {
      deleteFolder(item.id, deletedAt);
    } else {
      deleteDocument(item.id, deletedAt);
    }
  }

  function toggleStar(item) {
    const updates = { starred: !item.starred };

    if (item.type === "Folder") {
      editFolder(item.id, updates);
    } else {
      editDocument(item.id, updates);
    }
  }

  return { handleSelect, handleEdit, handleDelete, toggleStar };
}
