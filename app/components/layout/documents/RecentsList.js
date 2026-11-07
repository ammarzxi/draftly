"use client";

import { useEffect } from "react";
import { useGlobal } from "@/app/context/GlobalVars";
import DocumentRow from "./DocumentRow";

export default function RecentsList({
  handleSelectFolder,
  handleSelectDocument,
  popup,
  setPopup,
  selectedFolder,
  setEditable,
}) {
  const {
    mode,
    setMode,
    items,
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

  const foldersData = items.filter((item) => item.type === "Folder");
  const visibleItems = items
    .filter((item) => item.deletedAt === null)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const today = visibleItems.filter(
    (item) => new Date(item.updatedAt) >= startOfToday,
  );
  const yesterday = visibleItems.filter((item) => {
    const updatedAt = new Date(item.updatedAt);
    return updatedAt >= startOfYesterday && updatedAt < startOfToday;
  });
  const earlier = visibleItems.filter(
    (item) => new Date(item.updatedAt) < startOfYesterday,
  );

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

  function renderGroup(group) {
    return group.map((item) => {
      const folder = foldersData.find((entry) => entry.id === item.folderId);
      const folderDocs =
        mode === "folder" && selectedFolder?.id === item.id
          ? visibleItems.filter(
              (doc) => doc.type === "Document" && doc.folderId === item.id,
            )
          : [];

      return (
        <DocumentRow
          key={item.id}
          item={item}
          folder={folder}
          mode={mode}
          selectedFolder={selectedFolder}
          popup={popup}
          setPopup={setPopup}
          onSelect={handleSelect}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStar={toggleStar}
        >
          {folderDocs.map((doc) => (
            <DocumentRow
              key={doc.id}
              item={doc}
              mode={mode}
              selectedFolder={selectedFolder}
              popup={popup}
              setPopup={setPopup}
              onSelect={(selected) => {
                handleSelectDocument(selected);
                setMode("view");
                setEditable(false);
              }}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStar={toggleStar}
            />
          ))}
        </DocumentRow>
      );
    });
  }

  return (
    <section className="space-y-4 pt-4">
      {today.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold text-lg mb-2">Today</h3>
          {renderGroup(today)}
        </div>
      )}

      {yesterday.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold text-lg mb-2">Yesterday</h3>
          {renderGroup(yesterday)}
        </div>
      )}

      {earlier.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold text-lg mb-2">
            Earlier this week
          </h3>
          {renderGroup(earlier)}
        </div>
      )}
    </section>
  );
}
