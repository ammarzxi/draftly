"use client";

import {
  FileText,
  ChevronDown,
  Pencil,
  Folder,
  Dot,
  Star,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useGlobal } from "@/app/context/GlobalVars";
import { getTypeStyle } from "../../../utils/documents";


const now = Date.now();

export default function RecentsList({
  data,
  selectedDocument,
  setSelectedDocument,
  handleSelectFolder,
  handleSelectDocument,
  popup,
  setSelectedFolder,
  setPopup,
  folDocs,
  selectedFolder,
  setEditable,
  editable,
}) {
  const [deleteId, setDeleteId] = useState(null);

  const { mode, setMode, items, setItems } = useGlobal();

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("[data-popup-wrapper]")) {
        setPopup(null);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [setPopup]);

  const foldersData = items.filter((item) => item.type === "Folder");

  const toggleStar = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id == id ? { ...item, starred: !item.starred } : item,
      ),
    );
  };

  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const startOfWeek = new Date();
  const currentDay = startOfWeek.getDay();
  const daysToSub = currentDay === 0 ? 6 : currentDay - 1;

  startOfWeek.setDate(startOfWeek.getDate() - daysToSub);
  startOfWeek.setHours(0, 0, 0, 0);

  const today = [];
  const yesterday = [];
  const beforeYesterday = [];

  function sortGroups(doc) {
    const updatedAt = new Date(doc.updatedAt);

    if (updatedAt >= startOfToday) {
      today.push(doc);
    } else if (updatedAt >= startOfYesterday) {
      yesterday.push(doc);
    } else {
      beforeYesterday.push(doc);
    }
  }

  for (const doc of items) {
    sortGroups(doc);
  }

  const renderGroup = (group) =>
    group.map((item, i) => {
      const updated = new Date(item.updatedAt).getTime();
      const folder = foldersData.find((fol) => fol.id === item.folderId);
      const difference = now - updated;

      const minutes = Math.floor(difference / (1000 * 60));
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));

      return (
        <div
          key={item.id}
          className={`rounded relative ${mode === "folder" ? "grid-cols-1 grid gap-y-2" : ""}`}
          onClick={() => {
            item.type === "Folder"
              ? handleSelectFolder(item, item.id)
              : handleSelectDocument(item);

            setEditable(false);

            {
              item.type === "Document"
                ? setMode("view")
                : item.type === "Folder"
                  ? setMode("folder")
                  : "";
            }
            // console.log(mode)
          }}
        >
          {deleteId === item.id && (
            <div
              className="fixed z-[1000] bg-white top-60 left-135 text-center border-muted/40 border rounded px-6 py-12"
              onClick={(e) => {
                e.stopPropagation();
                setMode("view");
              }}
            >
              <h3 className="font-semibold text-lg">Confirm Deletion!</h3>
              <p>Are you sure you want to delete `{item.title}`?</p>

              <div className="mt-4 flex items-center gap-x-2 justify-center">
                <button
                  onClick={(event) => {
                    setDeleteId(null);
                    event.stopPropagation();
                  }}
                  className="text-red-500 border border-red-500 px-6 py-2 cursor-pointer rounded"
                >
                  Don&apos;t delete
                </button>

                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDelete(item.id);
                    setDeleteId(null);
                  }}
                  className="bg-red-500 text-white px-6 py-2 rounded cursor-pointer"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          )}

          <div className="flex p-2 space-x-3 md:space-x-4 hover:bg-muted/20">
            <div
              className={`flex ${getTypeStyle(item.type)} items-center justify-center md:px-3 md:py-1 px-3 rounded`}
            >
              {item.type === "Document" ? (
                <FileText className="h-6 w-6" />
              ) : item.type == "Folder" && mode !== "folder" ? (
                <Folder className="h-6 w-6" />
              ) : mode === "folder" &&
                item.type === "Folder" &&
                item.id === selectedFolder?.id ? (
                <ChevronDown className="h-6 w-6" />
              ) : (
                <Folder className="h-6 w-6" />
              )}
            </div>

            <div className="flex flex-col w-full gap-y-0">
              <h3 className="font-heading max-md:text-sm font-semibold">
                {item.title}
              </h3>

              <div className="flex items-center justify-between w-full text-sm text-muted">
                <div className="flex items-center gap-x-0">
                  <p key={i} className="hidden md:block">
                    {folder ? (
                      <span>{folder.title}</span>
                    ) : (
                      <span>{item.type}</span>
                    )}
                  </p>

                  <span>
                    <Dot className="hidden md:block" />
                  </span>

                  {days >= 1 ? (
                    <p className="max-md:text-xs">Updated {days} day(s) ago</p>
                  ) : hours >= 1 ? (
                    <p className="max-md:text-xs">
                      Updated {hours} hour(s) ago
                    </p>
                  ) : minutes >= 1 ? (
                    <p className="max-md:text-xs">
                      Updated {minutes} minute(s) ago
                    </p>
                  ) : (
                    <p className="max-md:text-xs">Updated just now</p>
                  )}
                </div>

                <div className="flex">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleStar(item.id);
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
                      onClick={(event) => {
                        event.stopPropagation();
                        setPopup(popup == item.id ? null : item.id);
                      }}
                    >
                      <MoreVertical />
                    </button>

                    {popup == item.id ? (
                      <div className="bg-white border border-muted/40 w-35 rounded-lg absolute right-0 z-50 p-2 cursor-pointer">
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            setMode("write");
                            setPopup(null);
                            handleSelectDocument(item);
                            setEditable(true);
                          }}
                          className="flex items-center gap-x-2 text-foreground w-full px-2 py-3 hover:bg-muted/20 rounded"
                        >
                          <Pencil size={18} />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            setDeleteId(item.id);
                            setPopup(null);
                          }}
                          className="flex items-center gap-x-2 px-2 py-3 w-full text-red-500 hover:bg-red-500/20 rounded"
                        >
                          <Trash size={18} />
                          <span>Delete</span>
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div></div>
          </div>

          {mode === "folder" && item.id === selectedFolder?.id ? (
            <div>
              {folDocs.map((folDoc, ij) => {
                const folDocUpdated = new Date(folDoc.updatedAt).getTime();
                const folDocDifference = now - folDocUpdated;

                const folDocMinutes = Math.floor(
                  folDocDifference / (1000 * 60),
                );
                const folDocHours = Math.floor(
                  folDocDifference / (1000 * 60 * 60),
                );
                const folDocDays = Math.floor(
                  folDocDifference / (1000 * 60 * 60 * 24),
                );

                return (
                  <div
                    key={ij}
                    className={`hover:bg-muted/20 flex p-2 space-x-3 md:space-x-4 pr-6 ${mode === "folder" ? " ml-6" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectDocument(folDoc);
                      setMode("view");
                    }}
                  >
                    <div
                      className={`flex ${getTypeStyle(folDoc.type)} items-center justify-center md:px-3 md:py-1 px-3 rounded`}
                    >
                      <FileText className="h-6 w-6" />
                    </div>

                    <div className="flex flex-col w-full gap-y-0">
                      <h3 className="font-heading max-md:text-sm font-semibold">
                        {folDoc.title}
                      </h3>

                      <div className="flex items-center justify-between text-sm text-muted">
                        <div className="flex items-center gap-x-0">
                          <p className="hidden md:block">{folDoc.type}</p>
                          <span>
                            <Dot className="hidden md:block" />
                          </span>

                          {folDocDays >= 1 ? (
                            <p className="max-md:text-xs">
                              Updated {folDocDays} day(s) ago
                            </p>
                          ) : folDocHours >= 1 ? (
                            <p className="max-md:text-xs">
                              Updated {folDocHours} hour(s) ago
                            </p>
                          ) : folDocMinutes >= 1 ? (
                            <p className="max-md:text-xs">
                              Updated {folDocMinutes} minute(s) ago
                            </p>
                          ) : (
                            <p className="max-md:text-xs">Updated just now</p>
                          )}
                        </div>

                        <div className="flex">
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleStar(folDoc.id);
                            }}
                            className="mb-1"
                          >
                            <Star
                              fill={folDoc.starred ? "yellow" : "none"}
                              size={20}
                              strokeOpacity={0.4}
                            />
                          </button>

                          <div className="relative" data-popup-wrapper>
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                setPopup(popup == folDoc.id ? null : folDoc.id);
                              }}
                            >
                              <MoreVertical />
                            </button>

                            {popup == folDoc.id ? (
                              <div className="bg-white border border-muted/40 w-35 rounded-lg absolute right-0 z-50 p-2 cursor-pointer">
                                <button
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    setMode("write");
                                    setPopup(null);
                                    handleSelectDocument(folDoc);
                                    setEditable(true);
                                  }}
                                  className="flex items-center gap-x-2 text-foreground w-full px-2 py-3 hover:bg-muted/20 rounded"
                                >
                                  <Pencil size={18} />
                                  <span>Edit</span>
                                </button>

                                <button
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    setDeleteId(folDoc.id);
                                    setPopup(null);
                                  }}
                                  className="flex items-center gap-x-2 px-2 py-3 w-full text-red-500 hover:bg-red-500/20 rounded"
                                >
                                  <Trash size={18} />
                                  <span>Delete</span>
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      );
    });

  return (
    <section className="space-y-4 pt-4">
      {deleteId !== null && (
        <div className="fixed inset-0 min-h-screen z-[1000] bg-black/20" />
      )}

      {today.length > 0 ? (
        <div>
          <h3 className="font-heading font-semibold text-lg mb-2">Today</h3>
          {renderGroup(today)}
        </div>
      ) : (
        ""
      )}

      {yesterday.length > 0 ? (
        <div>
          <h3 className="font-heading font-semibold text-lg mb-2">Yesterday</h3>
          {renderGroup(yesterday)}
        </div>
      ) : (
        ""
      )}
      {beforeYesterday.length > 0 ? (
        <div>
          <h3 className="font-heading font-semibold text-lg mb-2">
            Earlier this week
          </h3>
          {renderGroup(beforeYesterday)}
        </div>
      ) : (
        ""
      )}
    </section>
  );
}