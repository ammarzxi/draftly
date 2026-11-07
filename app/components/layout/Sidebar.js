"use client";

import { Clock, Folder, House, Pencil, Plus, Star, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "Home",
    href: "/",
    icon: House,
  },
  {
    title: "Starred",
    href: "/starred",
    icon: Star,
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

const folderLinks = [
  {
    title: "Personal",
    href: "/",
    icon: Folder,
  },
  {
    title: "Work",
    href: "/starred",
    icon: Folder,
  },
  {
    title: "Ideas",
    href: "/recent",
    icon: Folder,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="max-w-45 px-2 hidden bg-muted/10 lg:block flex-1 pl-3">
      <div className="flex items-center gap-x-2 py-6">
        <Pencil size={25} />
        <span className="font-heading font-bold text-2xl">Draftly</span>
      </div>

      <nav className="space-y-3">
        {links.map((link, i) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <div
              key={i}
              className={`flex text-sm items-center space-x-2 py-2 rounded-lg px-2 ${isActive ? "bg-primary/20 text-primary" : ""}`}
            >
              <Icon size={20} />
              <Link href={link.href}>{link.title}</Link>
            </div>
          );
        })}
      </nav>

      <nav className="space-y-3 mt-8">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Folders</span>
          <Plus className="text-muted" size={15} />
        </div>

        {folderLinks.map((link, i) => {
          const Icon = link.icon;
          // Do something abt isActive in this making hte bg of prject folder gray or blue
          const isActive = pathname === link.href;

          return (
            <div
              key={i}
              className={`flex text-sm items-center space-x-2 py-2 rounded-lg px-2 ${isActive ? "bg-muted/20" : ""}`}
            >
              <Icon size={20} />
              <Link href={link.href}>{link.title}</Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}