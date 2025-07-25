import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    type: "",
    createdAt: new Date().toISOString(),
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted of Product Intialized ==> ", product)
    const res = await fetch('http://localhost:5000/api/add-product', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product
      })
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("Error Encountered while Creating Product in Add Product Page")
    } else {
      console.log("Successfully Created Now Navigating to Product List")
      navigate('/')
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" className="border p-2 w-full" onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" className="border p-2 w-full" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" min={0} className="border p-2 w-full" onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" min={1} className="border p-2 w-full" onChange={handleChange} required />
        <select name="type" className="border p-2 w-full" onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Tablet">Tablet</option>
          <option value="Syrup">Syrup</option>
          <option value="Injection">Injection</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
