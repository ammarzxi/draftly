"use client";
import { Bell, Plus, Search, Sun } from "lucide-react";
import { useState } from "react";
import AddDoc from "./documents/AddDoc";

import { useGlobal } from "../../context/GlobalVars";

export default function Input() {
  const { createDocument } = useGlobal();
  return (
    <section className="bg-muted/20 h-fit py-2 px-2 flex-1 rounded flex justify-between flex-col md:flex-row col-span-full">
      <div className="bg-white flex items-center space-x-3 py-1 px-2 rounded md:w-70">
        <Search size={15} className="text-muted" />
        <input
          placeholder="Search documents..."
          className="text-sm rounded focus:outline-none"
        />
      </div>

      <div className="items-center gap-x-4 hidden md:flex">
        <Sun size={20} />
        <Bell size={20} />

        <button
          className={`flex items-center text-white bg-primary px-2.5 text-sm py-1.5 rounded gap-x-2`}
          onClick={() => createDocument()}
        >
          <Plus size={20} />
          <span className="font-sans">New Document</span>
        </button>
      </div>
    </section>
  );
}
