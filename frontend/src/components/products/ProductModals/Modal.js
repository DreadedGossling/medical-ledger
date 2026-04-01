import ProductModal from "./Product";

const Modal = ({
  setShowModal,
  setProducts,
  product,
  setEditableProduct }) => {

  const handleClose = () => {
    setShowModal(false);
    setEditableProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative px-10 pt-4 pb-6">
        <div className="flex items-center justify-between my-4">
          <h2 className="text-3xl font-extrabold font-serif mx-auto text-cyan-700 shadow-sm 
                          shadow-current rounded-2xl p-2">
            <>
              <span className="ml-2">{product ? "✎" : "+"}</span>
              <span className="relative text-3xl mx-2">{product ? "Edit Product" : "Add Product"}</span>
            </>
          </h2>
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

export default Modal;
