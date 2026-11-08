"use client";

import { useGlobal } from "../../../context/GlobalVars";
import useDocumentActions from "../../../hooks/useDocumentActions";
import DocumentItems from "./DocumentItems";

export default function RecentsList({
  handleSelectFolder,
  handleSelectDocument,
  popup,
  setPopup,
  selectedFolder,
  setEditable,
}) {
  const { mode, items } = useGlobal();

  const actions = useDocumentActions({
    handleSelectFolder,
    handleSelectDocument,
    setEditable,
    setPopup,
  });

  const folders = items.filter(
    (item) => item.type === "Folder" && item.deletedAt === null,
  );
  const visibleItems = items
    .filter((item) => item.deletedAt === null)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const today = visibleItems.filter(
    (item) => new Date(item.updatedAt) >= startOfToday,
  );
  const yesterday = visibleItems.filter((item) => {
    const updatedAt = new Date(item.updatedAt);
    return updatedAt >= startOfYesterday && updatedAt < startOfToday;
  });
  const earlier = visibleItems.filter(
    (item) => new Date(item.updatedAt) < startOfYesterday,
  );

  function renderGroup(group) {
    return (
      <DocumentItems
        items={group}
        allItems={group}
        folders={folders}
        mode={null}
        selectedFolder={selectedFolder}
        popup={popup}
        setPopup={setPopup}
        actions={actions}
      />
    );
  }

  return (
    <section className="space-y-4 pt-4">
      {today.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold text-lg mb-2">Today</h3>
          {renderGroup(today)}
        </div>
      )}

      {yesterday.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold text-lg mb-2">Yesterday</h3>
          {renderGroup(yesterday)}
        </div>
      )}

      {earlier.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold text-lg mb-2">Earlier</h3>
          {renderGroup(earlier)}
        </div>
      )}
    </section>
  );
}
