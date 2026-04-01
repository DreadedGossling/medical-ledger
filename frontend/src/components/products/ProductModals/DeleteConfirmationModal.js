const DeleteConfirmationModal = ({ showDeleteModal, setShowDeleteModal, productToDelete, onConfirmDelete }) => {
  if (!showDeleteModal || !productToDelete) return null;

  const handleClose = () => {
    setShowDeleteModal(false);
  };

  const handleConfirm = () => {
    onConfirmDelete(productToDelete._id);
    setShowDeleteModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Deletion</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete the product <strong className="capitalize">"{productToDelete.name}"</strong>?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            >
              No
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;