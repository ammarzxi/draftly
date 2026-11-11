
"use client";

import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";
import { tags } from "@lezer/highlight";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";

export default function MarkdownEditor({ input, editable, setInput, mode }) {
  const isDark = mode === "dark";

  const customColors = HighlightStyle.define([
    { tag: tags.heading1, color: "#5367F8", fontWeight: "800" },
    { tag: tags.heading2, color: "#5367F8", fontWeight: "700" },
    { tag: tags.heading3, color: "#5367F8", fontWeight: "600" },
    { tag: tags.heading, color: "#5367F8", fontWeight: "700" },
    { tag: tags.strong, color: isDark ? "#C4B5FD" : "#8B5CF6", fontWeight: "700" },
    { tag: tags.emphasis, color: isDark ? "#FBBF24" : "#D97706", fontStyle: "italic" },
    { tag: tags.link, color: "#0D9488" },
    { tag: tags.url, color: "#0D9488" },
    { tag: tags.monospace, color: isDark ? "#F472B6" : "#DB2777" },
    { tag: tags.quote, color: isDark ? "#94A3B8" : "#68758B", fontStyle: "italic" },
  ]);

  const draftlyTheme = EditorView.theme({
    "&": {
      backgroundColor: "var(--background)",
      color: "var(--foreground)",
      fontSize: "14px",
      height: "100%",
    },

    ".cm-scroller": {
      backgroundColor: "var(--background)",
    },

    ".cm-gutters": {
      backgroundColor: "var(--background)",
      color: "var(--muted-foreground)",
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

    ".cm-lineNumbers .cm-gutterElement.cm-activeLineGutter": {
      color: "var(--primary)",
      fontWeight: "700",
    },

    ".cm-content": {
      fontFamily: "var(--font-jetbrains), monospace",
      caretColor: "var(--primary)",
    },

    ".cm-activeLine": {
      backgroundColor: "var(--muted)",
    },

    "&.cm-focused": {
      outline: "none",
    },
  }, { dark: isDark });

  return (
    <div className="overflow-hidden border border-border pt-4 w-full">
      <CodeMirror
        value={input}
        height="900px"
        theme={draftlyTheme}
        extensions={[
          markdown(),
          syntaxHighlighting(customColors),
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
