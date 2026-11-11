
"use client";

import { Bell, Plus, Search } from "lucide-react";
import { useGlobal } from "../../context/GlobalVars";
import AddDoc from "./documents/AddDoc";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  const { addOpen, setAddOpen } = useGlobal();

  return (
    <>
      <section className="bg-background border border-border px-3 py-2 flex items-center justify-between gap-3 rounded col-span-full">
        <div className="bg-muted/20 border border-border/60 flex items-center gap-x-3 py-2 px-3 rounded flex-1 max-w-sm">
          <Search size={16} className="text-muted-foreground shrink-0" />
          <input
            type="search"
            placeholder="Search documents..."
            className="text-sm bg-transparent w-full min-w-0 text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-x-2">
          <ThemeToggle />

          <button
            type="button"
            className="p-2 rounded text-muted-foreground hover:bg-muted/40 hover:text-foreground transition"
          >
            <Bell size={18} />
          </button>

          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="flex items-center text-white bg-primary hover:opacity-90 transition px-3 py-2 text-sm rounded gap-x-2"
          >
            <Plus size={18} />
            <span>New Document</span>
          </button>
        </div>
      </section>

      {addOpen && <AddDoc />}
    </>
  );
}
