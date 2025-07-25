import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import ProductList from "./components/products/ProductList";
import AddProduct from "./components/products/AddProduct";
import Product from "./components/products/[product]";
import EditProduct from "./components/products/[EditProduct]";
import Login from "./components/users/Login";
import AddUser from "./components/users/AddUser";
import Layout from "./components/Layout";
import UserLists from "./components/users/UserLists";

function App() {
  return (
    <Router>
      <>
        <Layout />
        <div className="p-2 md:px-6 lg:px-10 max-w-[1800px] mx-auto">
          <Routes>
            <Route path="/*" element={<NotFound />} />
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<UserLists />} />
            <Route path="/add-user" element={<AddUser />} />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
