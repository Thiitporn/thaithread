import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined, ShoppingOutlined, LoginOutlined,
  CloseOutlined, MenuOutlined, UserAddOutlined, ShoppingCartOutlined
} from "@ant-design/icons";
import { CartContext } from "../App"; // ✅ นำเข้า CartContext

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  return (
    <>
      {/* ✅ Navbar */}
      <div 
        className="navbar sticky top-0 left-0 w-full px-4 pr-6 py-3 flex items-center justify-between z-50 shadow-md"
        style={{
          background: "#6D2323",
          borderBottom: "4px solid #E5D0AC",
        }}
      >
        {/* ✅ LOGO */}
        <div className="flex-none">
          <Link to="/" className="btn btn-ghost text-xl font-bold text-white">
            THAI THREADS.
          </Link>
        </div>

        {/* ✅ เมนูหลัก (เฉพาะ Desktop) */}
        <div className="hidden md:flex flex-1 justify-center gap-6 items-center">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-[#FEF9E1]">
            <HomeOutlined /> หน้าแรก
          </Link>
          <Link to="/products" className="flex items-center gap-2 text-white hover:text-[#FEF9E1]">
            <ShoppingOutlined /> สินค้าทั้งหมด
          </Link>
        </div>

        {/* ✅ ตะกร้าสินค้า (เฉพาะ Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => navigate("/cart")} 
            className="relative flex items-center gap-2 text-white hover:text-[#FEF9E1]"
          >
            <ShoppingCartOutlined className="text-xl" /> ตะกร้าสินค้า
          </button>

          {/* ✅ ปุ่มเข้าสู่ระบบ & สมัครสมาชิก */}
          <button 
            onClick={() => navigate("/login")} 
            className="hidden md:block px-4 py-2 rounded-md font-medium border-2 border-[#A31D1D] text-[#A31D1D] bg-[#FEF9E1] 
                      hover:bg-[#A31D1D] hover:text-white transition"
          >
            เข้าสู่ระบบ
          </button>
          <Link 
            to="/register" 
            className="hidden md:block bg-[#A31D1D] text-white px-4 py-2 rounded-md font-medium hover:bg-[#FEF9E1] hover:text-[#A31D1D] border border-[#E5D0AC] transition"
          >
            สมัครสมาชิก
          </Link>
        </div>

        {/* ✅ ปุ่ม Hamburger (เฉพาะ Mobile) */}
        <div className="md:hidden flex items-center">
          {/* ✅ ปุ่มตะกร้าสินค้าใน Mobile Navbar (นอกเมนู) */}
          <button 
            onClick={() => navigate("/cart")}
            className="relative text-white text-2xl mr-4"
          >
            <ShoppingCartOutlined />
            {cart.length > 0 && (
              <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </button>

          {/* ✅ ปุ่มเมนู */}
          <button className="text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>

      {/* ✅ Dropdown Menu (เฉพาะ Mobile) */}
      {
        isOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-[#FEF9E1] flex flex-col items-center justify-center p-6 z-50">
            {/* ❌ ปุ่มปิด Dropdown */}
            <button className="absolute top-4 right-4 text-2xl text-[#A31D1D]" onClick={() => setIsOpen(false)}>
              <CloseOutlined />
            </button>

            {/* ✅ รายการเมนูใน Dropdown */}
            <div className="flex flex-col gap-6 text-[#6D2323] text-lg">
              <Link to="/" className="flex items-center gap-2 hover:text-[#A31D1D]" onClick={() => setIsOpen(false)}>
                <HomeOutlined /> หน้าแรก
              </Link>
              <Link to="/products" className="flex items-center gap-2 hover:text-[#A31D1D]" onClick={() => setIsOpen(false)}>
                <ShoppingOutlined /> สินค้าทั้งหมด
              </Link>

              {/* ✅ ปุ่มตะกร้าสินค้าใน Mobile Menu */}
              <button 
                onClick={() => { navigate("/cart"); setIsOpen(false); }} 
                className="flex items-center gap-2 hover:text-[#A31D1D]"
              >
                <ShoppingCartOutlined /> ตะกร้าสินค้า
                {cart.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* 🔻 เส้นคั่น พร้อมข้อความ "ระบบสมาชิก" */}
              <div className="relative flex items-center w-full my-4">
                <div className="flex-1 border-t border-gray-400"></div>
                <span className="px-4 text-gray-600 text-sm font-medium">ระบบสมาชิก</span>
                <div className="flex-1 border-t border-gray-400"></div>
              </div>

              <button 
                onClick={() => { navigate("/Login"); setIsOpen(false); }} 
                className="flex items-center gap-2 hover:text-[#A31D1D]"
              >
                <LoginOutlined /> เข้าสู่ระบบ
              </button>
              <Link to="/register" className="flex items-center gap-2 hover:text-[#A31D1D]" onClick={() => setIsOpen(false)}>
                <UserAddOutlined /> สมัครสมาชิก
              </Link>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Navbar;
