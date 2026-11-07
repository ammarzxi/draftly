"use client";

import {
  ChevronDown,
  Dot,
  FileText,
  Folder,
  MoreVertical,
  Pencil,
  Plus,
  Star,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { getRelativeTime, getTypeStyle } from "../../../utils/documents";

export default function DocumentRow({
  item,
  folder,
  mode,
  selectedFolder,
  popup,
  setPopup,
  onSelect,
  onEdit,
  onDelete,
  onToggleStar,
  onAddDocument,
  children,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="rounded relative" onClick={() => onSelect(item)}>
      {confirmDelete && (
        <div
          className="fixed inset-0 z-[1000] bg-black/20 flex items-center justify-center"
          onClick={(event) => {
            event.stopPropagation();
            setConfirmDelete(false);
          }}
        >
          <div
            className="bg-white text-center border border-muted/40 rounded px-6 py-8"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="font-semibold text-lg">Confirm Deletion!</h3>
            <p>Are you sure you want to delete {item.title}?</p>
            <div className="mt-4 flex items-center gap-x-2 justify-center">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="text-red-500 border border-red-500 px-6 py-2 rounded"
              >
                Don&apos;t delete
              </button>
              <button
                type="button"
                onClick={() => {
                  onDelete(item);
                  setConfirmDelete(false);
                }}
                className="bg-red-500 text-white px-6 py-2 rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex p-2 space-x-3 md:space-x-4 hover:bg-muted/20">
        <div className={"flex " + getTypeStyle(item.type) + " items-center justify-center md:px-3 md:py-1 px-3 rounded"}>
          {item.type === "Document" ? (
            <FileText className="h-6 w-6" />
          ) : mode === "folder" && item.id === selectedFolder?.id ? (
            <ChevronDown className="h-6 w-6" />
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
                {getRelativeTime(item.updatedAt)}
              </p>
            </div>

            <div className="flex shrink-0">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleStar(item);
                }}
                className="mb-1"
              >
                <Star
                  fill={item.starred ? "yellow" : "none"}
                  size={20}
                  strokeOpacity={0.4}
                />
              </button>

              <div className="relative" data-popup-wrapper>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setPopup(popup === item.id ? null : item.id);
                  }}
                >
                  <MoreVertical />
                </button>

                {popup === item.id && (
                  <div className="bg-white border border-muted/40 w-35 rounded-lg absolute right-0 z-50 p-2 cursor-pointer">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setPopup(null);
                        onEdit(item);
                      }}
                      className="flex items-center gap-x-2 text-foreground w-full px-2 py-3 hover:bg-muted/20 rounded"
                    >
                      <Pencil size={18} />
                      <span>Edit</span>
                    </button>

                    {item.type === "Folder" && onAddDocument && (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setPopup(null);
                          onAddDocument(item);
                        }}
                        className="flex items-center gap-x-2 text-foreground w-full px-2 py-3 hover:bg-muted/20 rounded"
                      >
                        <Plus size={18} />
                        <span>Add Document</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setPopup(null);
                        setConfirmDelete(true);
                      }}
                      className="flex items-center gap-x-2 px-2 py-3 w-full text-red-500 hover:bg-red-500/20 rounded"
                    >
                      <Trash size={18} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
