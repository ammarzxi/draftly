import { Plus } from "lucide-react";

export default function Intro() {
  return (
    <section className="">
      <h2 className="font-bold font-heading">Trash</h2>

      <p className="text-muted text-sm mb-4">
        Deleted items are kept for 30 days (add this 30 days logic and
        continuing where u left off meaning the exact line etc)
      </p>
      <button
        className={`flex items-center text-white bg-primary px-2.5 text-sm py-2.5 rounded gap-x-2 w-full justify-center lg:hidden`}
      >
        <Plus size={20} />
        <span className="font-sans">New Document</span>
      </button>
    </section>
  );
}
