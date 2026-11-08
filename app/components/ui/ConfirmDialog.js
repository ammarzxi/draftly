export default function ConfirmDialog({
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}) {
  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/20 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white text-center border border-muted/40 rounded px-6 py-8 max-w-full"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="mt-2">{description}</p>
        <div className="mt-4 flex items-center gap-x-2 justify-center">
          <button
            type="button"
            onClick={onCancel}
            className="text-red-500 border border-red-500 px-6 py-2 rounded"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-6 py-2 rounded text-white ${danger ? "bg-red-500" : "bg-primary"}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
