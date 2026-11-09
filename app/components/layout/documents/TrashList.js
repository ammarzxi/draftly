"use client";

import { FileText, Folder, Dot, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { useGlobal } from "../../../context/GlobalVars";
import { getTypeStyle } from "../../../utils/documents";
import ConfirmDialog from "../../ui/ConfirmDialog";

export default function TrashList() {
  const {
    items,
    restoreDocumentItem,
    restoreFolderItem,
    permanentlyDeleteDocumentItem,
    permanentlyDeleteFolderItem,
  } = useGlobal();
  const [confirmation, setConfirmation] = useState(null);

  const deletedItems = items.filter((item) => {
    if (item.deletedAt == null) return false;

    if (item.type === "Document" && item.folderId != null) {
      const deletedFolder = items.find(
        (folder) =>
          folder.type === "Folder" &&
          folder.id === item.folderId &&
          folder.deletedAt != null,
      );

      if (deletedFolder) return false;
    }

    return true;
  });
  const foldersData = items.filter((item) => item.type === "Folder");

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

  function confirmAction() {
    const item = deletedItems.find((entry) => entry.id === confirmation.id);
    if (!item) return;

    if (confirmation.action === "restore") {
      handleRestore(item);
    } else {
      handleDelete(item);
    }

    setConfirmation(null);
  }

  return (
    <section className="space-y-4 pt-4">
      {confirmation && (
        <ConfirmDialog
          title={
            confirmation.action === "restore"
              ? "Confirm Restoration!"
              : "Confirm Permanent Deletion!"
          }
          description={
            confirmation.action === "restore"
              ? `Are you sure you want to restore ${confirmation.title}?`
              : `Are you sure you want to permanently delete ${confirmation.title}?`
          }
          confirmLabel={
            confirmation.action === "restore" ? "Yes, Restore" : "Yes, Delete"
          }
          danger={confirmation.action === "delete"}
          onCancel={() => setConfirmation(null)}
          onConfirm={confirmAction}
        />
      )}

      <div className="space-y-4">
        {deletedItems.map((item) => {
          const folder = foldersData.find(
            (entry) => entry.id === item.folderId,
          );
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
              <div
                className={
                  "flex " +
                  getTypeStyle(item.type) +
                  " items-center justify-center md:px-3 md:py-3 px-3 rounded"
                }
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
                      onClick={() =>
                        setConfirmation({
                          id: item.id,
                          title: item.title,
                          action: "restore",
                        })
                      }
                    >
                      Restore
                    </button>
                    <button
                      type="button"
                      className="text-red-500 border border-red-500/30 px-3 py-1 rounded text-xs hover:bg-red-500/10"
                      onClick={() =>
                        setConfirmation({
                          id: item.id,
                          title: item.title,
                          action: "delete",
                        })
                      }
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
