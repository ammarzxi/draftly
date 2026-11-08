import DocumentRow from "./DocumentRow";

export default function DocumentItems({
  items,
  folders,
  mode,
  selectedFolder,
  popup,
  setPopup,
  actions,
  onAddDocument,
}) {
  return items.map((item) => {
    const folder = folders.find((entry) => entry.id === item.folderId);
    const folderDocs =
      mode === "folder" && selectedFolder?.id === item.id
        ? items.filter(
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
        onDelete={actions.handleDelete}
        onToggleStar={actions.toggleStar}
        onAddDocument={onAddDocument}
      >
        {folderDocs.map((doc) => (
          <DocumentRow
            key={doc.id}
            item={doc}
            mode={mode}
            selectedFolder={selectedFolder}
            popup={popup}
            setPopup={setPopup}
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
