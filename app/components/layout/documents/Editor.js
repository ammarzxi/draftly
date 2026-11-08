"use client";

import { useGlobal } from "../../../context/GlobalVars";
import Markdown from "react-markdown";
import TextArea from "./TextArea";
import remarkGfm from "remark-gfm";
import {
  AlertCircle,
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
  input,
  onInputChange,
  onTitleChange,
  editable,
  setEditable,
}) {
  const { mode, setMode } = useGlobal();

  return (
    <section
      className={`min-w-0 border border-muted/40 xl:grid-cols-2 flex-1 overflow-hidden rounded-xl bg-white shadow-2xl ${mode === "write" || mode === "preview" || mode === "view" ? "grid grid-cols-1 absolute w-full" : "hidden"}`}
    >
      <div className="col-span-full border-b border-muted/40 flex justify-between p-3 flex-col">
        <div className="flex items-center justify-between">
          {editable ? (
            <input
              className="border-none focus:outline-none font-heading text-base font-bold w-90"
              onChange={(event) => onTitleChange(event.target.value)}
              value={selectedDocument?.title ?? ""}
            />
          ) : (
            <h2 className="border-none focus:outline-none font-heading text-lg font-bold">
              {selectedDocument?.title}
            </h2>
          )}

          <div className="flex items-center justify-between gap-x-2">
            <div className="flex items-center gap-x-2">
              <Pencil onClick={() => { setMode("write"); setEditable(true); }} />
              <Save onClick={() => setEditable(false)} />
            </div>
            <div className="xl:hidden">
              {mode === "write" || mode === "view" ? (
                <PlayIcon onClick={() => setMode("preview")} />
              ) : (
                <SquarePen onClick={() => setMode("write")} />
              )}
            </div>
            <MoreHorizontal />
            {mode && <X size={20} onClick={() => setMode("folder")} />}
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
          <div className="text-muted text-sm mt-2">
  Changes update as you type
</div>
        </div>
      </div>

      <div
        className={`${mode === "write" || mode === "view" ? "flex" : "hidden"} h-190 overflow-y-auto gap-x-4`}
      >
        <TextArea
          editable={editable}
          input={input}
          setInput={onInputChange}
        />
      </div>

      <div
        className={`${mode === "preview" ? "block" : "hidden xl:block"} prose *:my-2 h-190 overflow-y-auto py-4 px-4`}
      >
        <Markdown remarkPlugins={[remarkGfm]}>{input}</Markdown>
      </div>
    </section>
  );
}
