import DocumentRow from "./DocumentRow";

export default function DocumentItems({
  items,
  allItems = items,
  folders,
  mode,
  selectedFolder,
  selectedDocument,
  popup,
  setPopup,
  actions,
  tab,
  onTitleChange,
  onAddDocument,
}) {
  return items.map((item) => {
    const folder = folders.find((entry) => entry.id === item.folderId);
  
    const folderDocs =
      (mode === "folder" || mode === "DocRename") && selectedFolder?.id === item.id && tab !== "Recent"
        ? allItems.filter(
            (doc) =>
              doc.type === "Document" &&
              doc.folderId === item.id &&
              doc.deletedAt === null,
          )
        : [];

    return (
      <DocumentRow
        key={item.id}
        item={item}
        folder={folder}
        mode={mode}
        selectedFolder={selectedFolder}
        popup={popup}
        setPopup={setPopup}
        onSelect={actions.handleSelect}
        onEdit={actions.handleEdit}
        onTitleChange={onTitleChange}
        onDelete={actions.handleDelete}
        selectedDocument={selectedDocument}
        onToggleStar={actions.toggleStar}
        onRename={actions.handleRename}
        tab={tab}
        onAddDocument={onAddDocument}
      >
        {folderDocs.map((doc) => (
          <DocumentRow
            key={doc.id}
            item={doc}
            selectedDocument={selectedDocument}
            mode={mode}
            selectedFolder={selectedFolder}
            onTitleChange={onTitleChange}
            popup={popup}
            setPopup={setPopup}
            onRename={actions.handleRename}
            onSelect={actions.handleSelect}
            onEdit={actions.handleEdit}
            onDelete={actions.handleDelete}
            onToggleStar={actions.toggleStar}
          />
        ))}
      </DocumentRow>
    );
  });
}
