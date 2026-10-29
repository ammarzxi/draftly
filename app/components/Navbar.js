import { MoreHorizontal, Pencil } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-2 py-4 lg:hidden">
      <div className="flex items-center gap-x-1">
        <Pencil size={20} />
        <span className="font-heading font-extrabold">Draftly</span>
      </div>

      <MoreHorizontal />
    </nav>
  );
}
