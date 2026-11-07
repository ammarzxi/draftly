"use client";

import { useState } from "react";
import { useGlobal } from "../reuseComponents/GlobalVars";

export default function AddDoc() {
  const { items, handleAddition, setConfirm, itemType, setItemType } =
    useGlobal();

  return (
    <section>
      <form onSubmit={(event) => handleAddition(event, itemType)}>
        <div className="fixed z-[1000] bg-white top-40 left-135 border-muted/40 border rounded px-6 py-8 w-96">
          <h3 className="font-semibold text-lg">Create {itemType}</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Create a new {itemType.toLowerCase()} for your workspace.
          </p>

          <div className="flex bg-muted/20 p-1 rounded-full mt-6">
            <button
              type="button"
              onClick={() => setItemType("Document")}
              className={`flex-1 py-2 text-sm rounded-full ${
                itemType === "Document" ? "bg-white shadow-sm" : "text-muted"
              }`}
            >
              Document
            </button>

            <button
              type="button"
              onClick={() => setItemType("Folder")}
              className={`flex-1 py-2 text-sm rounded-full ${
                itemType === "Folder" ? "bg-white shadow-sm" : "text-muted"
              }`}
            >
              Folder
            </button>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium">
              {itemType === "Document" ? "Document Title" : "Folder Name"}
            </label>

            <input
              type="text"
              name="title"
              placeholder={
                itemType === "Document"
                  ? "Enter document title"
                  : "Enter folder name"
              }
              className="w-full border border-muted/40 rounded px-3 py-2 mt-2 outline-none"
            />
          </div>

          {itemType === "Document" && (
            <>
              {/* <div className="mt-4">
                                <label className="text-sm font-medium">Document Type</label>
                                <select name="type" className="w-full border border-muted/40 rounded px-3 py-2 mt-2 outline-none">
                                    <option value="">Select document type</option>
                                    <option value="Document">Document</option>
                                    <option value="Note">Note</option>
                                </select>
                            </div> */}

              <div className="mt-4">
                <label className="text-sm font-medium">Folder</label>
                <select
                  name="folderName"
                  className="w-full border border-muted/40 rounded px-3 py-2 mt-2 outline-none"
                >
                  <option value="">No folder</option>
                  {items
                    .filter((item) => item.type === "Folder")
                    .map((item) => (
                      <option key={item.id} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                </select>
              </div>
            </>
          )}

          <div className="mt-6 flex items-center gap-x-2 justify-end">
            <button
              type="button"
              className="text-red-500 border border-red-500 px-5 py-2 cursor-pointer rounded"
              onClick={() => setConfirm(false)}
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
        </div>
      </form>
    </section>
  );
}
