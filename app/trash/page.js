"use client";

import documentsData from "../data/documents";
import Header from "@/app/home/Header";
import Intro from "./Intro";
import TrashList from "./TrashList";
import { useState } from "react";

export default function Trash() {
  const [items, setItems] = useState(documentsData);
  return (
    <main className="p-4">
      <Header />
      <div className="grid grid-cols-1 pt-6 gap-x-4 h-fit items-start relative">
        <div className="py-4">
          <Intro />
          {/* PINNED ONEs */}
          <TrashList />
        </div>
        {/* Add a sepereate type of right-col here */}
      </div>
      {/* Add mini feats */}
      {/* ADD THE NEWEST FIRST TYPE FILTER */}
      {/* FIX HEADING HEIRARCY ANDOTHER SMEANTIC TAGS */}
    </main>
  );
}
