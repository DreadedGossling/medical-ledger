import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((response) => {
      setProducts(response.data.products);
    });
  }, []);

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

  return (
    <div className=" mx-auto py-5">
      <h1 className="text-2xl font-bold mb-4">⊚ <span className="underline decoration-wavy decoration-4 decoration-cyan-500">Products</span></h1>
      <table className="min-w-full bg-white border border-gray-200">
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
          {products && products.map((product) => (
            <tr key={product._id} className=" hover:bg-gray-100">
              <td className="border p-2 font-serif capitalize">{product.name}</td>
              <td className="border p-2 font-serif capitalize">{product.type}</td>
              <td className="border p-2 font-serif capitalize">{product.description}</td>
              <td className="border p-2 font-serif">Rs {product.price}/-</td>
              <td className="border p-2 font-serif">{product.stock}</td>
              <td className="border p-2 font-serif">{product.status}</td>
              <td className="border p-2 font-serif flex justify-center gap-3">
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded shadow-md shadow-red-300
                             hover:bg-red-800 transition ease-in-out"
                  onClick={() => deleteProduct(product._id)}>
                  Delete
                </button>
                <button
                  className="bg-cyan-600 text-white px-2 py-1 rounded shadow-md shadow-cyan-200
                             hover:bg-cyan-800 transition ease-in-out"
                  onClick={() => navigate(`/edit-product/${product._id}`)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
