export function addFolder(items, folder) {
  return [...items, folder];
}

export function updateFolder(items, id, updates) {
  return items.map((item) =>
    item.id === id && item.type === "Folder"
      ? { ...item, ...updates }
      : item,
  );
}

export function softDeleteFolder(items, id, deletedAt) {
  return updateFolder(items, id, { deletedAt });
}

export function restoreFolder(items, id) {
  return updateFolder(items, id, { deletedAt: null });
}

export function permanentlyDeleteFolder(items, id) {
  return items.filter(
    (item) => !(item.id === id && item.type === "Folder"),
  );
}