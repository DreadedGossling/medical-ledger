import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" py-4 px-2 bg-slate-300 shadow-md">
      <div className="flex items-center justify-between p-2 md:px-6 lg:px-10 max-w-[1800px] mx-auto">
        {/* Left: Title */}
        <div className="text-xl font-bold text-cyan-700">Medical Shop Products</div>
        {/* Center: Navigation Menu */}
        <nav className="space-x-6 flex justify-center">
          <Link to="/" className="hover:text-cyan-600">Products</Link>
          <Link to="/add-product" className="hover:text-cyan-600">Add Product</Link>
          <Link to="/users" className="hover:text-cyan-600">User</Link>
          <Link to="/add-user" className="hover:text-cyan-600">Add User</Link>
        </nav>
        {/* Right: Buttons */}
        <div className="space-x-2 flex">
          <button
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            Settings
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Layout
