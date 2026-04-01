import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./ProductModals/Modal";
import DeleteConfirmationModal from "./ProductModals/DeleteConfirmationModal";
import ProductTable from "./ProductTable";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editableProduct, setEditableProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((response) => {
      setProducts(response.data.products);
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });
  }, []);

  const deleteProduct = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  }

  const confirmDelete = async (id) => {
    const res = await fetch('http://localhost:5000/api/delete-product/' + id, {
      method: 'DELETE'
    });
    const data = await res.json();
    const remainingData = products.filter((item) => item._id !== id)
    setProducts(remainingData)
    if (res.status === 422 || !data) {
      console.log("Error Encountered in Product Page")
    } else {
      console.log('Successfully Deleted Product wit Id ===> ', id)
    }
  }

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/${id}`);
      const data = await response.json();
      console.log("Fetched Product is ===> ", data);
      if (data) {
        setEditableProduct(data);
        setShowModal(true);
      }
    } catch (error) {
      console.error(`Encountered Error While Fetching Product List ===> ${error}`);
    }
  };


  return (
    <div className="mx-auto py-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-extrabold font-serif flex items-center gap-2">
          <span className="text-lg">💊</span>
          <span className="relative text-4xl text-cyan-700">
            Products
          </span>
        </h1>
        <button
          className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded shadow-md
                   hover:bg-cyan-800 transition font-semibold"
          onClick={() => setShowModal(true)}
        >
          <span className="text-md font-bold">+</span> Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center my-10 text-gray-500">
          <span className="text-5xl mb-2">⏳</span>
          <span className="text-xl font-semibold">Loading Product</span>
        </div>
      ) : products && products.length === 0 ? (
        <div className="flex flex-col items-center justify-center my-10 text-gray-500">
          <span className="text-5xl mb-2">📦</span>
          <span className="text-xl font-semibold">No products found</span>
        </div>
      ) : (
        <ProductTable
          products={products}
          deleteProduct={deleteProduct}
          handleEdit={handleEdit}
        />
      )}

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          product={editableProduct}
          setProducts={setProducts}
          setEditableProduct={setEditableProduct}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          productToDelete={productToDelete}
          onConfirmDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default ProductList;
