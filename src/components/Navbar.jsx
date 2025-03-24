import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // ✅ ดึงข้อมูลผู้ใช้จาก localStorage เมื่อโหลดหน้า
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(storedUser); // Store the user object correctly
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
        <div className=" md:flex flex-1 justify-center gap-6 items-center">
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
        <div className=" md:flex items-center gap-4">
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
                <UserOutlined /> {user} {/* Assuming user has name */}
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
              <button
                onClick={() => navigate("/login")}
                className=" md:block px-4 py-2 rounded-md font-medium border-2 border-[#A31D1D] text-[#A31D1D] bg-[#FEF9E1] 
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
      </div>
    </>
  );
};

export default Navbar;
