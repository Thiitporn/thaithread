import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
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

// ✅ สร้าง Context สำหรับตะกร้าสินค้า
export const CartContext = createContext();

// ✅ สร้าง Context สำหรับข้อมูลผู้ใช้
export const UserContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // ✅ เก็บข้อมูลผู้ใช้ (Admin, Owner, Customer)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product-detail/:name" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />

            {/* ✅ Route สำหรับเจ้าของร้าน */}
            <Route
              path="/store-owner"
              element={user?.role === "owner" ? <StoreOwnerPage /> : <Navigate to="/login" />}
            />

            {/* ✅ Route สำหรับแอดมิน */}
            <Route
              path="/admin"
              element={user?.role === "admin" ? <AdminPanel /> : <Navigate to="/login" />}
            />
          </Routes>
        </Router>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
