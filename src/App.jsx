import { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute

// ✅ สร้าง Context สำหรับตะกร้าสินค้า
export const CartContext = createContext();

// ✅ สร้าง Context สำหรับข้อมูลผู้ใช้
export const UserContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // ✅ เก็บข้อมูลผู้ใช้ (Admin, Owner, Customer)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    if (storedUser) {
      setUser({ ...JSON.parse(storedUser), role: storedRole });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Protected Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />

            <Route
              path="/store-owner"
              element={
                <ProtectedRoute allowedRoles={["storeOwner"]}>
                  <StoreOwnerPage />
                </ProtectedRoute>
              }
            />

            {/* Redirect to Home if route doesn't exist */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
