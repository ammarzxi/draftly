export const getTypeStyle = (type) => {
  const styles = {
    Work: "bg-purple-500/10 text-purple-700",
    Personal: "bg-primary/20 text-primary",
    Learning: "bg-red-500/20 text-red-700",
    Extras: "bg-green-500/10 text-green-700",
    Document: "bg-primary/10 text-primary",
    Folder: "bg-yellow-500/10 text-yellow-700",
  };

  return styles[type] ?? "bg-muted text-muted-foreground border-border";
};

export function getRelativeTime(date) {
  const difference = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (days >= 1) return "Updated " + days + " day(s) ago";
  if (hours >= 1) return "Updated " + hours + " hour(s) ago";
  if (minutes >= 1) return "Updated " + minutes + " minute(s) ago";

  return "Updated just now";
}
export function filterByTab(items, tab) {
  const sortedItems = [...items].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  );

  const filteredItems =
    tab === "Recent"
      ? sortedItems
      : items.filter((item) => {
          if (tab === "Folders") return item.type === "Folder";
          if (tab === "Starred")
            return item.starred;
          if (tab === "All")
            return (
              item.type === "Folder" ||
              (item.type === "Document" && item.folderId == null)
            );
          return false;
        });

  return filteredItems.filter((item) => item.deletedAt === null);
}