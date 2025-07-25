import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    type: "",
    description: "",
    price: "",
    stock: "",
    status: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/${id}`)
        const data = await response.json()
        console.log("Recieved Product is ===> ", data)
        setProduct(data)
      } catch (error) {
        console.error(`Encountered Error While Fetching Product List ===> ${error}`)
      }
    }

    fetchProduct()
  }, [])

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jsonString = JSON.stringify(product);
    try {
      const res = await fetch(`http://localhost:5000/api/edit-product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonString
      });
      const updated = await res.json();
      console.log("Successfully Updated Product Now Navigating to Product List ===> ", updated)
      navigate('/')
    } catch (error) {
      console.error(`Error Updating Product in Edit Product Page ===> ${error}`);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 w-full"
        />
        <select
          name="type"
          value={product.type}
          className="border p-2 w-full"
          onChange={handleChange}
        >
          <option value="Tablet">Tablet</option>
          <option value="Syrup">Syrup</option>
          <option value="Injection">Injection</option>
        </select>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          min={0}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
          min={1}
          className="border p-2 w-full"
        />
        <select
          name="status"
          value={product.status}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="Available">Available</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
