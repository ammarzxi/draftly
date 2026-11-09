"use client";

import { useGlobal } from "@/app/context/GlobalVars";
import { Clock, House, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
    <aside className="max-w-45 px-2 hidden bg-muted/10 lg:block flex-1 pl-3">
      <div className="flex items-center gap-x-2 py-6">
        <Pencil size={25} />
        <span className="font-heading font-bold text-2xl">Draftly</span>
      </div>

      <nav className="space-y-3">
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
    </aside>
  );
}
