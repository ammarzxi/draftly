"use client";

import { FileText, Folder, Dot, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { useGlobal } from "../../../context/GlobalVars";
import { getTypeStyle } from "../../../utils/documents";

export default function TrashList() {
  const {
    items,
    restoreDocumentItem,
    restoreFolderItem,
    permanentlyDeleteDocumentItem,
    permanentlyDeleteFolderItem,
  } = useGlobal();
  const [restoreId, setRestoreId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const deletedItems = items.filter((item) => item.deletedAt != null);
  const foldersData = items.filter(
    (item) => item.type === "Folder" && item.deletedAt == null,
  );

  function handleDelete(item) {
    if (item.type === "Folder") {
      permanentlyDeleteFolderItem(item.id);
    } else {
      permanentlyDeleteDocumentItem(item.id);
    }
  }

  function handleRestore(item) {
    if (item.type === "Folder") {
      restoreFolderItem(item.id);
    } else {
      restoreDocumentItem(item.id);
    }
  }

  return (
    <section className="space-y-4 pt-4">
      {(restoreId !== null || deleteId !== null) && (
        <div className="fixed inset-0 min-h-screen z-[1000] bg-black/20" />
      )}

      <div className="space-y-4">
        {deletedItems.map((item) => {
          const folder = foldersData.find((entry) => entry.id === item.folderId);
          const deletedAt = item.deletedAt
            ? new Date(item.deletedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "";

          return (
            <div
              key={item.id}
              className="flex items-center p-2 space-x-3 md:space-x-4 hover:bg-muted/20"
            >
              {restoreId === item.id && (
                <div
                  className="fixed z-[1000] bg-white top-60 left-135 text-center border-muted/40 border rounded px-6 py-12"
                  onClick={(event) => event.stopPropagation()}
                >
                  <h3 className="font-semibold text-lg">Confirm Restoration!</h3>
                  <p>Are you sure you want to restore {item.title}?</p>
                  <div className="mt-4 flex items-center gap-x-2 justify-center">
                    <button
                      onClick={() => setRestoreId(null)}
                      className="text-red-500 border border-red-500 px-6 py-2 rounded"
                    >
                      Don&apos;t restore
                    </button>
                    <button
                      onClick={() => {
                        setRestoreId(null);
                        handleRestore(item);
                      }}
                      className="bg-primary text-white px-6 py-2 rounded"
                    >
                      Yes, Restore
                    </button>
                  </div>
                </div>
              )}

              {deleteId === item.id && (
                <div
                  className="fixed z-[1000] bg-white top-60 left-135 text-center border-muted/40 border rounded px-6 py-12"
                  onClick={(event) => event.stopPropagation()}
                >
                  <h3 className="font-semibold text-lg">
                    Confirm Permanent Deletion!
                  </h3>
                  <p>Are you sure you want to permanently delete {item.title}?</p>
                  <div className="mt-4 flex items-center gap-x-2 justify-center">
                    <button
                      onClick={() => setDeleteId(null)}
                      className="text-red-500 border border-red-500 px-6 py-2 rounded"
                    >
                      Don&apos;t delete
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(null);
                        handleDelete(item);
                      }}
                      className="bg-red-500 text-white px-6 py-2 rounded"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              )}

              <div
                className={"flex " + getTypeStyle(item.type) + " items-center justify-center md:px-3 md:py-3 px-3 rounded"}
              >
                {item.type === "Document" ? (
                  <FileText className="h-6 w-6" />
                ) : (
                  <Folder className="h-6 w-6" />
                )}
              </div>

              <div className="flex flex-col w-full gap-y-0 min-w-0">
                <h3 className="font-heading max-md:text-sm font-semibold truncate">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between w-full text-sm text-muted gap-x-2">
                  <div className="flex items-center gap-x-0 min-w-0">
                    <p className="hidden md:block truncate">
                      {folder ? folder.title : item.type}
                    </p>
                    <Dot className="hidden md:block" />
                    <p className="max-md:text-xs whitespace-nowrap">
                      Deleted on {deletedAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-x-2 shrink-0">
                    <button
                      type="button"
                      className="text-primary border border-primary/30 px-3 py-1 rounded text-xs hover:bg-primary/10"
                      onClick={() => setRestoreId(item.id)}
                    >
                      Restore
                    </button>
                    <button
                      type="button"
                      className="text-red-500 border border-red-500/30 px-3 py-1 rounded text-xs hover:bg-red-500/10"
                      onClick={() => setDeleteId(item.id)}
                    >
                      Delete
                    </button>
                    <button type="button" className="text-muted-foreground">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {deletedItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Trash2 size={40} className="text-muted-foreground mb-3" />
          <h3 className="font-heading font-semibold text-lg">Trash is empty</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Deleted documents and folders will appear here.
          </p>
        </div>
      )}
    </section>
  );
}
