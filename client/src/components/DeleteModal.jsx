export default function DeleteModal({ buildName, onConfirm, onCancel }) {
  return (
    <div className="modal modal-open">
      <div className="modal-box bg-void-800 border border-void-600 flex flex-col gap-4">
        <h3 className="font-cinzel text-parchment text-base font-semibold">
          Delete Build
        </h3>
        <p className="font-nunito text-parchment-dim text-sm">
          Are you sure you want to delete{" "}
          <span className="text-parchment font-semibold">"{buildName}"</span>?
          This action cannot be undone.
        </p>
        <div className="modal-action mt-0">
          <button
            onClick={onConfirm}
            className="bg-red-800 text-red-100 font-cinzel text-xs tracking-widest uppercase py-2 px-6 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="btn-outline text-xs py-2 px-6 w-fit"
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onCancel} />
    </div>
  );
}
