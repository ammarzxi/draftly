export function addItem(items, item) {
  return [...items, item];
}

export function updateItem(items, id, type, updates) {
  return items.map((item) =>
    item.id === id && item.type === type ? { ...item, ...updates } : item,
  );
}

export function softDeleteItem(items, id, type, deletedAt) {
  return updateItem(items, id, type, { deletedAt });
}

export function deleteFolderItem(items, id, deletedAt) {
  return items.map((item) => {
    if (item.id === id && item.type === "Folder") {
      return { ...item, deletedAt, deleteId: null };
    }

    if (
      item.type === "Document" &&
      item.folderId === id &&
      item.deletedAt === null
    ) {
      return { ...item, deletedAt, deleteId: id };
    }

    return item;
  });
}

export function restoreItem(items, id, type) {
  return updateItem(items, id, type, { deletedAt: null, deleteId: null });
}

export function restoreFolderItem(items, id) {
  return items.map((item) => {
    if (item.id === id && item.type === "Folder") {
      return { ...item, deletedAt: null, deleteId: null };
    }

    if (item.type === "Document" && item.deleteId === id) {
      return { ...item, deletedAt: null, deleteId: null };
    }

    return item;
  });
}

export function permanentlyDeleteItem(items, id, type) {
  return items.filter((item) => !(item.id === id && item.type === type));
}

export function permanentlyDeleteFolderItem(items, id) {
  return items.filter(
    (item) =>
      !(item.id === id && item.type === "Folder") &&
      !(item.type === "Document" && item.folderId === id),
  );
}
