import { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EditProfile from "./pages/EditProfile";
import AdminPanel from "./pages/Admin/AdminPanel";
import StoreOwnerPage from "./pages/StoreOwnerPage";
import ProtectedRoute from "./ProtectedRoute";

// สร้าง Context
export const CartContext = createContext();
export const UserContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({
    name: "",
    role: "",
    id: ""
  });

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");

    if (userName && userRole && userId) {
      setUser({
        name: userName,
        role: userRole,
        id: userId,
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/edit-profile" element={
              <ProtectedRoute allowedRoles={["customer", "merchant", "admin"]}>
                <EditProfile />
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPanel />
              </ProtectedRoute>
            } />
            <Route path="/store-owner" element={
              <ProtectedRoute allowedRoles={["merchant"]}>
                <StoreOwnerPage />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
