"use client";

import { Plus } from "lucide-react";
import { useGlobal } from "../../context/GlobalVars";

export default function Intro() {
  const { setAddOpen } = useGlobal();

  return (
    <section>
      <h2 className="font-bold font-heading">Recents</h2>
      <p className="text-muted text-sm mb-4">Pick up where you left off.</p>
      <button
        type="button"
        onClick={() => setAddOpen(true)}
        className="flex items-center text-white bg-primary px-2.5 text-sm py-2.5 rounded gap-x-2 w-full justify-center lg:hidden"
      >
        <Plus size={20} />
        <span className="font-sans">New Document</span>
      </button>
    </section>
  );
}
