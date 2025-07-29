import ProductModal from "./Product";

export default function Modal({
  setShowModal,
  setProducts,
  product,
  setEditableProduct }) {

  const handleClose = () => {
    setShowModal(false);
    setEditableProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative p-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold font-serif flex items-center gap-2 text-cyan-700">
            <span className="relative text-3xl">Add Product</span>
          </h2>
          <button
            className="text-gray-500 hover:text-gray-600 text-4xl font-bold"
            onClick={handleClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <ProductModal
          product={product ? product : null}
          setProducts={setProducts}
          onClose={handleClose}
        />
      </div>
    </div>
  );
}
