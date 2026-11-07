"use client";

import { useState } from "react";
import { useGlobal } from "../../../context/GlobalVars";

export default function AddOnlyDoc({
  setNewDoc,
  currentFolder,
}) {
  const { createDocument } = useGlobal();
  const [title, setTitle] = useState("");

  return (
    <section className="absolute inset-0 z-[1000] bg-black/20 flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const newItem = {
            id: crypto.randomUUID(),
            title: title,
            type: "Document",
            folderId: currentFolder?.id || null,
            deletedAt: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          createDocument(newItem);
          setNewDoc(false);
        }}
      >
        <div className="bg-white border-muted/40 border rounded px-6 py-8 w-96">
          <h3 className="font-semibold text-lg">Create Document</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Create a new document for your workspace.
          </p>

          <div className="mt-6">
            <label className="text-sm font-medium">Document Title</label>

            <input
              type="text"
              name="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
              className="w-full border border-muted/40 rounded px-3 py-2 mt-2 outline-none"
            />
          </div>

          <div className="mt-4">
            <h4>Document will be created inside: `{currentFolder?.title}`</h4>
          </div>

          <div className="mt-6 flex items-center gap-x-2 justify-end">
            <button
              type="button"
              className="text-red-500 border border-red-500 px-5 py-2 cursor-pointer rounded"
              onClick={() => setNewDoc(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-primary text-white px-5 py-2 rounded cursor-pointer"
            >
              Create Document
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}