"use client";

import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";
import { tags } from "@lezer/highlight";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";

const customColors = HighlightStyle.define([
  { tag: tags.heading1, color: "#5367F8", fontWeight: "800" },
  { tag: tags.heading2, color: "#5367F8", fontWeight: "700" },
  { tag: tags.heading3, color: "#5367F8", fontWeight: "600" },
  { tag: tags.heading, color: "#5367F8", fontWeight: "700" },
  { tag: tags.strong, color: "#8B5CF6", fontWeight: "700" },
  { tag: tags.emphasis, color: "#D97706", fontStyle: "italic" },
  { tag: tags.link, color: "#0D9488" },
  { tag: tags.url, color: "#0D9488" },
  { tag: tags.monospace, color: "#DB2777" },
  { tag: tags.quote, color: "#68758B", fontStyle: "italic" },
]);

const draftlyTheme = EditorView.theme({
  "&": {
    // backgroundColor: "#ffffff",
    color: "#172033",
    fontSize: "14px",
    height: "100%",
  },

  // Line number area
  ".cm-gutters": {
    // backgroundColor: "#ffffff",
    color: "#94a3b8",
    border: "none",
  },

  ".cm-lineNumbers": {
    minWidth: "40px",
  },

  ".cm-lineNumbers .cm-gutterElement": {
    boxSizing: "border-box",
    width: "40px",
    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  // The current line's number
  ".cm-lineNumbers .cm-gutterElement.cm-activeLineGutter": {
    color: "#5367f8",
    fontWeight: "700",
  },

  ".cm-content": {
    fontFamily: "var(--font-jetbrains), monospace",
    caretColor: "#5367f8",
  },

  ".cm-activeLine": {
    backgroundColor: "#f8faff",
  },

  "&.cm-focused": {
    outline: "none",
  },
});
export default function MarkdownEditor({ input, editable, setInput }) {
  return (
    <div className="overflow-hidden border border-border pt-4 w-full">
      <CodeMirror
        value={input}
        height="900px"
        extensions={[
          markdown(),
          syntaxHighlighting(customColors),
          draftlyTheme,
        ]}
        onChange={(value) => setInput(value)}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: true,
        }}
        editable={editable}
      />
    </div>
  );
}
