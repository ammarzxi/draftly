export function addDocument(items, document) {
  return [...items, document];
}

export function updateDocument(items, id, updates) {
  return items.map((item) =>
    item.id === id && item.type === "Document"
      ? { ...item, ...updates }
      : item,
  );
}

export function softDeleteDocument(items, id, deletedAt) {
  return updateDocument(items, id, { deletedAt });
}

export function restoreDocument(items, id) {
  return updateDocument(items, id, { deletedAt: null });
}

export function permanentlyDeleteDocument(items, id) {
  return items.filter(
    (item) => !(item.id === id && item.type === "Document"),
  );
}