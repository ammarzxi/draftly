"use client";

import Header from "@/app/components/layout/Header";
import Intro from "../components/trash/Intro";
import TrashList from "../components/layout/documents/TrashList";

export default function Trash() {
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
