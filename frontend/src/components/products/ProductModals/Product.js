import { useState, useEffect } from "react";

const defaultProduct = {
  name: "",
  price: "",
  description: "",
  type: "",
  stock: "",
  status: "Available",
};

const Product = ({ setProducts, onClose, product }) => {
  const [form, setForm] = useState(defaultProduct);

  useEffect(() => {
    if (product && product._id) {
      setForm({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        type: product.type || "",
        stock: product.stock || "",
        status: product.status || "",
      });
    } else {
      setForm(defaultProduct);
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product?._id) {
      const res = await fetch('http://localhost:5000/api/add-product', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product: form }),
      });
      const data = await res.json();
      setProducts((prev) => [...prev, { ...data.item }]);
      if (res.status === 422 || !data) {
        console.log("Error Encountered while Creating Product in Add Product Page");
      } else {
        onClose();
      }
    } else {
      const res = await fetch(`http://localhost:5000/api/edit-product/${product._id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p._id === product._id ? { ...data.item } : p))
      );
      if (res.status === 422 || !data) {
        console.log("Error Encountered while Updating Product");
      } else {
        onClose();
      }
    }
  };

  return (
    <div className="container mx-auto p-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 w-full"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          min={0}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          min={1}
          className="border p-2 w-full"
          required
        />
        <select
          name="type"
          value={form.type}
          className="border p-2 w-full"
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="Tablet">Tablet</option>
          <option value="Syrup">Syrup</option>
          <option value="Injection">Injection</option>
        </select>
        {product?._id && (
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        )}
        <button
          type="submit"
          className="bg-cyan-600 text-white px-4 py-2 rounded shadow-md
                hover:bg-cyan-800 transition font-semibold">
          {product?._id ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Product;
