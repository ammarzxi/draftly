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

export function restoreItem(items, id, type) {
  return updateItem(items, id, type, { deletedAt: null });
}

export function permanentlyDeleteItem(items, id, type) {
  return items.filter((item) => !(item.id === id && item.type === type));
}
