import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/apiService";
import Navbar from "../components/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userData = await loginUser({ email, password });

      // เก็บข้อมูลแยกส่วนใน localStorage
      localStorage.setItem("user", userData.user.name);
      localStorage.setItem("role", userData.user.role);
      localStorage.setItem("userId", userData.user._id);

      // ตรวจสอบ role และนำทางไปยังหน้าที่เหมาะสม
      if (userData.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (userData.user.role === "customer") {
        navigate("/products");
      } else if (userData.user.role === "merchant") {
        navigate("/store-owner");
      }
    } catch (err) {
      setError(err.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#FEF9E1]">
        <div className="card bg-[#E5D0AC] w-full max-w-md shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-[#6D2323] text-center">
            เข้าสู่ระบบ
          </h1>
          <p className="text-sm text-center text-gray-700 mt-2">
            เข้าสู่ระบบเพื่อทำการสั่งซื้อสินค้า
          </p>

          {error && (
            <p className="text-center text-red-600 font-semibold mt-2">
              {error}
            </p>
          )}

          <form className="mt-6" onSubmit={handleLogin}>
            {/* 🔹 Email */}
            <div className="mb-4">
              <label className="block text-[#6D2323] font-semibold">
                อีเมล
              </label>
              <input
                type="email"
                placeholder="กรอกอีเมล"
                className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* 🔹 Password */}
            <div className="mb-4">
              <label className="block text-[#6D2323] font-semibold">
                รหัสผ่าน
              </label>
              <input
                type="password"
                placeholder="กรอกรหัสผ่าน"
                className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-right text-sm mt-2">
                <button
                  type="button"
                  className="text-[#A31D1D] hover:underline"
                  onClick={() => navigate("/forgot-password")}
                >
                  ลืมรหัสผ่าน?
                </button>
              </p>
            </div>

            {/* 🔹 ปุ่ม Login */}
            <button
              type="submit"
              className="w-full bg-[#A31D1D] text-white py-3 rounded-lg font-semibold hover:bg-[#6D2323] transition"
            >
              เข้าสู่ระบบ
            </button>
          </form>

          {/* 🔹 สมัครสมาชิก */}
          <p className="text-center text-sm mt-4">
            ยังไม่มีบัญชี?
            <a
              href="/register"
              className="text-[#A31D1D] font-semibold hover:underline ml-1"
            >
              สมัครสมาชิก
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
