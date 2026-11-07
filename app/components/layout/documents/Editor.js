"use client";

import { useGlobal } from "../../../context/GlobalVars";
import Markdown from "react-markdown";
import TextArea from "./TextArea";
import { useState } from "react";
import remarkGfm from "remark-gfm";
import {
  AlertCircle,
  Check,
  Eye,
  MoreHorizontal,
  Pencil,
  PlayIcon,
  Save,
  SquarePen,
  X,
} from "lucide-react";

export default function Editor({
  selectedDocument,
  setSelectedDocument,
  input,
  setInput,
  setItems,
  editable,
  setEditable,
}) {
  const { mode, setMode } = useGlobal();
  const [cursorLine, setCursorLine] = useState(1);
  const [cursorColumn, setCursorColumn] = useState(1);
  const [saved, SetSave] = useState(false);

  return (
    <section
      className={`min-w-0 border border-muted/40 xl:grid-cols-2 flex-1 overflow-hidden rounded-xl bg-white shadow-2xl ${mode == "write" || mode == "preview" || mode == "view" ? "grid grid-cols-1  absolute w-full" : "hidden"}`}
    >
      <div className="col-span-full border-b border-muted/40 flex justify-between p-3 flex-col">
        <div className="flex items-center justify-between">
          {editable ? (
            <input
              className="border-none focus:outline-none font-heading text-base font-bold w-90"
              onChange={(e) => {
                const newTitle = e.target.value;

                setSelectedDocument((prev) => ({
                  ...prev,
                  title: newTitle,
                }));

                setItems((prevItems) =>
                  prevItems.map((item) =>
                    item.id === selectedDocument.id
                      ? { ...item, title: newTitle }
                      : item,
                  ),
                );
              }}
              value={selectedDocument?.title}
            />
          ) : (
            <h2 className="border-none focus:outline-none font-heading text-lg font-bold">
              {selectedDocument?.title}
            </h2>
          )}
          {/* {selectedDocument?.title ?? "Select a Document"} */}
          <div className="flex items-center justify-between gap-x-2">
            <div className="flex items-center gap-x-2">
              <Pencil onClick={() => setEditable(true)} />
              <Save onClick={() => setEditable(false)} />
              {/* Add handle save */}
            </div>
            <div className="xl:hidden">
              {mode == "write" || mode == "view" ? (
                <PlayIcon onClick={() => setMode("preview")} />
              ) : (
                <SquarePen onClick={() => setMode("write")} />
              )}
            </div>
            <MoreHorizontal />
            {mode ? <X size={20} onClick={() => setMode("folder")} /> : ""}
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            {editable ? (
              <span className="flex items-center text-xs gap-x-1 text-green-500">
                <Pencil size={15} /> EDITING MODE
              </span>
            ) : (
              <span className="flex items-center gap-x-1 text-xs text-red-500">
                <Eye size={15} /> VIEW ONLY
              </span>
            )}
          </div>
          <div className="flex items-center justify-between text-muted gap-x-4 text-sm mt-2">
            {saved ? (
              <p className="flex items-center gap-x-1">
                <Check size={20} className="text-green-600" /> Saved!
              </p>
            ) : (
              <p className="flex items-center gap-x-1">
                {" "}
                <AlertCircle className="text-red-600" size={20} /> Couldn&apos;t save
              </p>
            )}
            {/*Show error as to why   */}
          </div>
        </div>
      </div>
      <div
        className={`${mode == "write" || mode == "view" ? "flex" : "hidden"} h-190 overflow-y-auto gap-x-4`}
      >
        {/* <div className="row-span-full bg-muted/5 shadow px-2">
                {length.map((l, i) => (
                    <p key={i} className="text-muted font-heading font-semibold">{i+ 1}</p>
                ))}
            </div> */}
        <TextArea
          editable={editable}
          input={input}
          setInput={setInput}
          cursorLine={cursorLine}
          setCursorLine={setCursorLine}
          cursorColumn={cursorColumn}
          setCursorColumn={setCursorColumn}
        />
      </div>
      <div
        className={`${mode == "preview" ? "block" : "hidden xl:block"} prose *:my-2 h-190 overflow-y-auto py-4 px-4`}
      >
        <Markdown remarkPlugins={[remarkGfm]}>{input}</Markdown>
      </div>

      {/* <div className="flex items-center gap-x-4 p-3">
        <p className="text-muted text-sm">Ln {cursorLine}, Col {cursorColumn}</p>
        <p className="text-muted text-sm">{wordCount} words</p>
      </div> */}
    </section>
  );
}