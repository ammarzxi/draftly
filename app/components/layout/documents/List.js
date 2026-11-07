"use client";

import {
  ChevronDown,
  Dot,
  File,
  FileText,
  Folder,
  MoreVertical,
  Pencil,
  Plus,
  Star,
  Trash,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useGlobal } from "../../../context/GlobalVars";
import AddOnlyDoc from "./AddOnlyDoc";

const buttons = [
  {
    title: "All",
  },
  {
    title: "Recent",
  },
  {
    title: "Starred",
  },
  {
    title: "Folders",
  },
];

const now = Date.now();

export default function List({
  handleSelectFolder,
  handleSelectDocument,
  popup,
  setSelectedFolder,
  setPopup,
  selectedFolder,
  setEditable,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [deleteId, setDeleteId] = useState(null);
  const [newDoc, setNewDoc] = useState(false);
  const [activeFolder, setActiveFolder] = useState(false);
  const [tab, setTab] = useState("All");
  const { mode, setMode, items, setItems, setConfirm, confirm } = useGlobal();

  const getTypeStyle = (type) => {
    const styles = {
      Work: "bg-purple-500/10 text-purple-700",
      Personal: "bg-primary/20 text-primary",
      Learning: "bg-red-500/20 text-red-700",
      Extras: "bg-green-500/10 text-green-700",
      Document: "bg-primary/10 text-primary",
      Folder: "bg-yellow-500/10 text-yellow-700",
    };

    return styles[type] ?? "bg-muted text-muted-foreground border-border";
  };

  const sortedItems = [...items].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  );

  const filteredItems =
    tab === "Recent"
      ? sortedItems
      : items.filter((item) => {
          if (tab === "Folders") return item.type == "Folder";
          if (tab === "Starred")
            return item.type == "Document" && item.starred == true;
          if (tab === "All")
            return (
              item.type === "Folder" ||
              (item.type === "Document" && item.folderId == null)
            );
        });
  const visibleItems = filteredItems.filter((item) => item.deletedAt === null);
  const foldersData = items.filter((item) => item.type === "Folder");

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

  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleDeleteId = (id) => {
    const currentDate = new Date().toISOString();

    setItems((prev) => {
      console.log(prev);
      return prev.map((item) =>
        item.id == id ? { ...item, deletedAt: currentDate } : item,
      );
    });
  };

  const handleDocumentAdding = (item) => {
    setActiveFolder(item);
    setNewDoc(true);
  };

  const amount = filteredItems.length;
  // console.log(newDoc);
  return (
    <section className="space-y-4 pt-4">
      <div className="flex items-center gap-x-6 border-b border-muted/20">
        {
          buttons.map((button, i) => (
            <button
              key={i}
              className={`pb-4 ${tab == button.title ? "underline decoration-primary decoration-4 text-primary/80" : "transition-colors duration-300 ease-in-out"}`}
              onClick={() => setSelectedFolder(null)}
            >
              <span
                className="cursor-pointer"
                onClick={() => {
                  setTab(button.title);
                }}
              >
                {button.title}
              </span>
            </button>
          ))

          // Your current now = Date.now() is outside the component, so it won't update on every render. That's fine for learning the filters, but later you may want relative timestamps to refresh periodically.
        }
      </div>
      {deleteId !== null && (
        <div className="fixed inset-0 min-h-screen z-[1000] bg-black/20" />
      )}
      <div className="space-y-4">
        {visibleItems.map((item, i) => {
          const folder = foldersData.find((fol) => fol.id === item.folderId);
          const updated = new Date(item.updatedAt).getTime();
          const difference = now - updated;

          const minutes = Math.floor(difference / (1000 * 60));
          const hours = Math.floor(difference / (1000 * 60 * 60));
          // optional days
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));

          const toggleStar = (id) => {
            setItems(
              items.map((item) =>
                item.id == id ? { ...item, starred: !item.starred } : item,
              ),
            );
          };

          return (
            <div
              key={i}
              className={`rounded relative ${mode === "folder" ? "grid-cols-1 grid gap-y-2" : ""}`}
              onClick={() => {
                item.type === "Folder"
                  ? handleSelectFolder(item, item.id)
                  : handleSelectDocument(item);
                setSelectedId(item.id);
                setEditable(false);
                {
                  item.type === "Document"
                    ? setMode("view")
                    : item.type === "Folder"
                      ? setMode("folder")
                      : "";
                }
              }}
            >
              {deleteId === item.id && (
                <div
                  className="fixed z-[1000] bg-white top-60 left-135 text-center border-muted/40 border rounded px-6 py-12"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <h3 className="font-semibold text-lg">Confirm Deletion!</h3>
                  <p>Are you sure you want to delete `{item.title}`?</p>
                  <div className="mt-4 flex items-center gap-x-2 justify-center">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        setDeleteId(null);
                      }}
                      className="text-red-500 border border-red-500 px-6 py-2 cursor-pointer rounded"
                    >
                      Don&apos;t delete
                    </button>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        setDeleteId(null);
                        handleDeleteId(item.id);
                        // console.log(item)
                      }}
                      className="bg-red-500 text-white px-6 py-2 rounded cursor-pointer"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              )}

              <div
                className={`flex p-2 space-x-3 md:space-x-4 hover:bg-muted/20`}
              >
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
                        <p className="max-md:text-xs">
                          Updated {days} day(s) ago
                        </p>
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
                      {/* Add selected states to be DARKER */}
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
                            {item.type == "Folder" ? (
                              <button
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setPopup(null);
                                  handleDocumentAdding(item);
                                }}
                                className="flex items-center gap-x-2 text-foreground w-full px-2 py-3 hover:bg-muted/20 rounded"
                              >
                                <Plus size={18} />
                                <span>Add Document</span>
                              </button>
                            ) : (
                              ""
                            )}
                            {/* <hr /> */}
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

                      {/* Add seperate page for each doc */}
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
              {mode === "folder" && item.id === selectedFolder?.id ? (
                <div className={``}>
                  {items
                    .filter(
                      (doc) =>
                        doc.type === "Document" &&
                        doc.folderId === selectedFolder?.id &&
                        doc.deletedAt === null,
                    )
                    .map((folDoc, ij) => {
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
                                {days >= 1 ? (
                                  <p className="max-md:text-xs">
                                    Updated {days} day(s) ago
                                  </p>
                                ) : hours >= 1 ? (
                                  <p className="max-md:text-xs">
                                    Updated {hours} hour(s) ago
                                  </p>
                                ) : minutes >= 1 ? (
                                  <p className="max-md:text-xs">
                                    Updated {minutes} minute(s) ago
                                  </p>
                                ) : (
                                  <p className="max-md:text-xs">
                                    Updated just now
                                  </p>
                                )}
                              </div>

                              <div className="flex">
                                {/* Add selected states to be DARKER */}
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
                                      setPopup(
                                        popup == folDoc.id ? null : folDoc.id,
                                      );
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
                                      {/* <hr /> */}
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
                                {/* Add seperate page for each doc */}
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
        })}

        <span className="text-muted text-sm flex items-center justify-center mt-4">
          {amount} documents.
        </span>
        {filteredItems.length === 0 && (
          <p>Empty List! Add some to get started</p>
        )}
      </div>
      {newDoc && (
        <AddOnlyDoc
          currentFolder={activeFolder}
          setNewDoc={setNewDoc}
        />
      )}
    </section>
  );
}