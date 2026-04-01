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
  const [originalProduct, setOriginalProduct] = useState(defaultProduct);
  const [error, setError] = useState("");

  // Check if any changes have been made
  const hasChanged = () => {
    return JSON.stringify(form) !== JSON.stringify(originalProduct);
  };

  useEffect(() => {
    if (product && product._id) {
      const productData = {
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        type: product.type || "",
        stock: product.stock || "",
        status: product.status || "",
      };
      setForm(productData);
      setOriginalProduct(productData);
      setError("");
    } else {
      setForm(defaultProduct);
      setOriginalProduct(defaultProduct);
      setError("");
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // For update operation, check if any changes were made
    if (product?._id) {
      if (!hasChanged()) {
        setError("No changes made to the product. Please make some changes before updating.");
        return;
      }
    }

    // Check if product content is empty
    if (!form.name.trim() || !form.description.trim() || !form.price || !form.stock || !form.type) {
      setError("All product fields are required.");
      return;
    }

    setError("");

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
        window.location.reload();
      }
    }
  };

  return (
    <div className="container mx-auto p-3">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className={product ? "space-y-5" : "space-y-3"}>
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold text-xl text-cyan-700 font-serif">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="font-bold text-xl text-cyan-700 font-serif">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 w-full rounded min-h-[60px] focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="font-bold text-xl text-cyan-700 font-serif">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min={0}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="stock" className="font-bold text-xl text-cyan-700 font-serif">Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            min={1}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="type" className="font-bold text-xl text-cyan-700 font-serif">Type</label>
          <select
            name="type"
            value={form.type}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Tablet">Tablet</option>
            <option value="Syrup">Syrup</option>
            <option value="Injection">Injection</option>
          </select>
        </div>
        {product?._id && (
          <div className="flex flex-col">
            <label htmlFor="status" className="font-bold text-xl text-cyan-700 font-serif">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            >
              <option value="Available">Available</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        )}
        <div className="flex justify-between pt-6">
          <button
            type="submit"
            disabled={product?._id && !hasChanged()}
            className={`text-white w-32 px-4 py-2 rounded shadow-md transition font-serif font-semibold ${
              product?._id && !hasChanged()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cyan-600 hover:bg-cyan-800"
            }`}
          >
            {product?._id ? "Update" : "Add"}
          </button>
          <button
            type="button"
            className="bg-red-600 text-white w-32 px-4 py-2 rounded shadow-md hover:bg-red-800 
                      transition font-serif font-semibold"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Product;
