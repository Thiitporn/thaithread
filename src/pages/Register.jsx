import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/apiService";
import Navbar from "../components/Navbar";

const Register = () => {
  const navigate = useNavigate();

  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      await registerUser({ name, email, password });
      setSuccess("สมัครสมาชิกสำเร็จ! กำลังนำคุณไปที่หน้าเข้าสู่ระบบ...");
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2s
    } catch (err) {
      setError(err.response?.data?.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-[#FEF9E1]">
        <div className="card bg-[#E5D0AC] w-full max-w-md shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-[#6D2323] text-center">
            สมัครสมาชิก
          </h1>
          <p className="text-sm text-center text-gray-700 mt-2">
            สร้างบัญชีเพื่อเริ่มต้นการสั่งซื้อสินค้า
          </p>

          {error && (
            <p className="text-center text-red-600 font-semibold mt-2">
              {error}
            </p>
          )}
          {success && (
            <p className="text-center text-green-600 font-semibold mt-2">
              {success}
            </p>
          )}

          <form className="mt-6" onSubmit={handleRegister}>
            {/* 🔹 ชื่อเต็ม */}
            <div className="mb-4">
              <label className="block text-[#6D2323] font-semibold">
                ชื่อ-นามสกุล
              </label>
              <input
                type="text"
                placeholder="กรอกชื่อ-นามสกุล"
                className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* 🔹 อีเมล */}
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

            {/* 🔹 รหัสผ่าน */}
            <div className="mb-4">
              <label className="block text-[#6D2323] font-semibold">
                รหัสผ่าน
              </label>
              <input
                type="password"
                placeholder="สร้างรหัสผ่าน"
                className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* 🔹 ยืนยันรหัสผ่าน */}
            <div className="mb-4">
              <label className="block text-[#6D2323] font-semibold">
                ยืนยันรหัสผ่าน
              </label>
              <input
                type="password"
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* 🔹 ปุ่มสมัครสมาชิก */}
            <button
              type="submit"
              className="w-full bg-[#A31D1D] text-white py-3 rounded-lg font-semibold hover:bg-[#6D2323] transition"
            >
              สมัครสมาชิก
            </button>
          </form>

          {/* 🔹 ลิงก์กลับไปหน้า Login */}
          <p className="text-center text-sm mt-4">
            มีบัญชีแล้ว?
            <a
              href="/login"
              className="text-[#A31D1D] font-semibold hover:underline ml-1"
            >
              เข้าสู่ระบบ
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
