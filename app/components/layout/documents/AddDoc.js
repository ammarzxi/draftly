"use client";

import { useState } from "react";
import { useGlobal } from "../../../context/GlobalVars";

export default function AddDoc({ currentFolder, onClose }) {
  const { items, createDocument, createFolder, setAddOpen } = useGlobal();
  const [itemType, setItemType] = useState("Document");
  const [title, setTitle] = useState("");
  const [folderId, setFolderId] = useState(currentFolder?.id ?? "");

  function closeModal() {
    setAddOpen(false);
    onClose?.();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    const now = new Date().toISOString();
    const selectedFolder =
      currentFolder ||
      items.find(
        (item) =>
          item.type === "Folder" &&
          item.deletedAt === null &&
          String(item.id) === String(folderId),
      );
    const item = {
      id: crypto.randomUUID(),
      title: cleanTitle,
      type: itemType,
      folderId: itemType === "Document" ? (selectedFolder?.id ?? null) : null,
      deletedAt: null,
      deleteId: null,
      createdAt: now,
      updatedAt: now,
    };

    if (itemType === "Folder") {
      createFolder(item);
    } else {
      createDocument(item);
    }

    closeModal();
  }

  const folders = items.filter(
    (item) => item.type === "Folder" && item.deletedAt === null,
  );

  return (
    <section className="fixed inset-0 z-[1000] bg-black/20 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border-muted/40 border rounded px-6 py-8 w-96 max-w-full"
      >
        <h3 className="font-semibold text-lg">Create {itemType}</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Create a new {itemType.toLowerCase()} for your workspace.
        </p>

        {!currentFolder && (
          <div className="flex bg-muted/20 p-1 rounded-full mt-6">
            <button
              type="button"
              onClick={() => setItemType("Document")}
              className={`flex-1 py-2 text-sm rounded-full ${itemType === "Document" ? "bg-white shadow-sm" : "text-muted"}`}
            >
              Document
            </button>
            <button
              type="button"
              onClick={() => setItemType("Folder")}
              className={`flex-1 py-2 text-sm rounded-full ${itemType === "Folder" ? "bg-white shadow-sm" : "text-muted"}`}
            >
              Folder
            </button>
          </div>
        )}

        <div className="mt-6">
          <label className="text-sm font-medium">
            {itemType === "Document" ? "Document Title" : "Folder Name"}
          </label>
          <input
            type="text"
            name="title"
            value={title}
            required
            autoFocus
            onChange={(event) => setTitle(event.target.value)}
            placeholder={
              itemType === "Document"
                ? "Enter document title"
                : "Enter folder name"
            }
            className="w-full border border-muted/40 rounded px-3 py-2 mt-2 outline-none"
          />
        </div>

        {itemType === "Document" && !currentFolder && (
          <div className="mt-4">
            <label className="text-sm font-medium">Folder</label>
            <select
              value={folderId}
              onChange={(event) => setFolderId(event.target.value)}
              className="w-full border border-muted/40 rounded px-3 py-2 mt-2 outline-none"
            >
              <option value="">No folder</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {currentFolder && (
          <p className="mt-4 text-sm text-muted">
            Creating inside: {currentFolder.title}
          </p>
        )}

        <div className="mt-6 flex items-center gap-x-2 justify-end">
          <button
            type="button"
            className="text-red-500 border border-red-500 px-5 py-2 cursor-pointer rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-5 py-2 rounded cursor-pointer"
          >
            Create {itemType}
          </button>
        </div>
      </form>
    </section>
  );
}
