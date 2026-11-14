"use client";

import { useGlobal } from "@/app/context/GlobalVars";
import { Clock, House, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Profile from "./Profile";

const links = [
  {
    title: "Home",
    href: "/",
    icon: House,
  },
  {
    title: "Recent",
    href: "/recents",
    icon: Clock,
  },
  {
    title: "Trash",
    href: "/trash",
    icon: Trash,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { mode, setMode } = useGlobal();

  return (
    <aside className="w-45 px-2 hidden bg-muted/10 lg:flex flex-col pl-3 min-h-screen">
      <div className="flex items-center gap-x-2 py-6">
        <Pencil size={25} />
        <span className="font-heading font-bold text-2xl">Draftly</span>
      </div>

      <nav className="space-y-3 flex-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMode(null)}
              className={`flex text-sm items-center space-x-2 py-2 rounded-lg px-2 ${isActive ? "bg-primary/20 text-primary" : ""}`}
            >
              <Icon size={20} />
              <span>{link.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto py-4">
        <Profile />
      </div>
    </aside>
  );
}
