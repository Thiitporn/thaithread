import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  CloseOutlined,
  MenuOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { CartContext } from "../App"; // ✅ นำเข้า CartContext

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [user, setUser] = useState(null);

  // ✅ ดึงข้อมูลผู้ใช้จาก localStorage เมื่อโหลดหน้า
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ ฟังก์ชัน Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setUser(null); // อัปเดต state
    navigate("/login"); // กลับไปหน้า login
  };

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
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-[#FEF9E1]"
          >
            <HomeOutlined /> หน้าแรก
          </Link>
          <Link
            to="/products"
            className="flex items-center gap-2 text-white hover:text-[#FEF9E1]"
          >
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

          {/* ✅ แสดงชื่อผู้ใช้หรือปุ่ม Login & Register */}
          {user ? (
            <div className="flex items-center gap-4">
              {/* ✅ ชื่อผู้ใช้ */}
              <span
                className="text-white font-medium flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/edit-profile")} // เพิ่มการนำทางไปหน้าลงทะเบียน
              >
                <UserOutlined /> {user}
              </span>
              {/* ✅ ปุ่ม Logout */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md font-medium border-2 border-[#A31D1D] text-[#A31D1D] bg-[#FEF9E1] 
                hover:bg-[#A31D1D] hover:text-white transition"
              >
                <LogoutOutlined /> ออกจากระบบ
              </button>
            </div>
          ) : (
            <>
              {/* ✅ ถ้ายังไม่ได้เข้าสู่ระบบ */}
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
            </>
          )}
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
          <button
            className="text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>

      {/* ✅ Dropdown Menu (เฉพาะ Mobile) */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#FEF9E1] flex flex-col items-center justify-center p-6 z-50">
          {/* ❌ ปุ่มปิด Dropdown */}
          <button
            className="absolute top-4 right-4 text-2xl text-[#A31D1D]"
            onClick={() => setIsOpen(false)}
          >
            <CloseOutlined />
          </button>

          {/* ✅ รายการเมนูใน Dropdown */}
          <div className="flex flex-col gap-6 text-[#6D2323] text-lg">
            <Link
              to="/"
              className="flex items-center gap-2 hover:text-[#A31D1D]"
              onClick={() => setIsOpen(false)}
            >
              <HomeOutlined /> หน้าแรก
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-2 hover:text-[#A31D1D]"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingOutlined /> สินค้าทั้งหมด
            </Link>

            {/* ✅ แสดงชื่อผู้ใช้หรือปุ่ม Login & Register */}
            {user ? (
              <>
                <span className="flex items-center gap-2 text-[#6D2323] font-medium">
                  <UserOutlined /> {user}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 hover:text-[#A31D1D]"
                >
                  <LogoutOutlined /> ออกจากระบบ
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 hover:text-[#A31D1D]"
                >
                  เข้าสู่ระบบ
                </button>
                <Link
                  to="/register"
                  className="flex items-center gap-2 hover:text-[#A31D1D]"
                  onClick={() => setIsOpen(false)}
                >
                  สมัครสมาชิก
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
