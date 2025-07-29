import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./ProductModals/Modal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editableProduct, setEditableProduct] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((response) => {
      setProducts(response.data.products);
    });
  }, [products]);

  const deleteProduct = async (id) => {
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
      {products && products.length === 0 ? (
        <div className="flex flex-col items-center justify-center my-10 text-gray-500">
          <span className="text-5xl mb-2">📦</span>
          <span className="text-xl font-semibold">No products found</span>
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 mt-6">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id || index} className=" hover:bg-gray-100">
                <td className="border p-2 font-serif capitalize">{product.name}</td>
                <td className="border p-2 font-serif capitalize">{product.type}</td>
                <td className="border p-2 font-serif capitalize">{product.description}</td>
                <td className="border p-2 font-serif">Rs {product.price}/-</td>
                <td className="border p-2 font-serif">{product.stock}</td>
                <td className="border p-2 font-serif">{product.status}</td>
                <td>
                  <div className='p-2 font-serif flex justify-center items-center gap-3'>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded shadow-md shadow-gray-300 hover:bg-red-800 transition ease-in-out"
                      onClick={() => deleteProduct(product._id)}>
                      Delete
                    </button>
                    <button
                      className="bg-gray-600 text-white px-2 py-1 rounded shadow-md shadow-gray-200 hover:bg-gray-800 transition ease-in-out"
                      onClick={() => handleEdit(product._id)}>
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          product={editableProduct}
          setProducts={setProducts}
          setEditableProduct={setEditableProduct}
        />
      )}
    </div>
  );
};

export default ProductList;
