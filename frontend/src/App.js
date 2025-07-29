import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import ProductList from "./components/products/ProductList";
import Login from "./components/users/Login";
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
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<UserLists />} />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
