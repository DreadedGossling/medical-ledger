const ProductTable = ({ products, deleteProduct, handleEdit }) => {
  return (
    <>
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
              <td className={`border p-2 font-serif ${product.status === 'Out of Stock' ? 'bg-red-200' : ''}`}
              >
                {product.status}
              </td>
              <td className="border p-2 font-serif">
                <div className='flex justify-center items-center gap-3'>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded shadow-md shadow-gray-300
                                 hover:bg-red-800 transition ease-in-out"
                    onClick={() => deleteProduct(product)}>
                    Delete
                  </button>
                  <button
                    className="bg-gray-600 text-white px-2 py-1 rounded shadow-md shadow-gray-200
                                 hover:bg-gray-800 transition ease-in-out"
                    onClick={() => handleEdit(product._id)}>
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ProductTable;
