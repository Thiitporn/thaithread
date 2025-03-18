import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext); // ✅ ดึง setUser จาก Context

    const handleLogin = (e) => {
        e.preventDefault();
        
        // 📌 ล็อกอินสำเร็จและดึงข้อมูลผู้ใช้จาก API หรือ LocalStorage
        const mockUser = { username: "JohnDoe", role: "customer" };
    
        setUser(mockUser); // ✅ อัปเดตข้อมูลผู้ใช้
        navigate("/products"); // ✅ พาไปหน้าสินค้า
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FEF9E1]">
            <div className="card bg-[#E5D0AC] w-full max-w-md shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-[#6D2323] text-center">เข้าสู่ระบบ</h1>
                <p className="text-sm text-center text-gray-700 mt-2">
                    เข้าสู่ระบบเพื่อทำการสั่งซื้อสินค้า
                </p>

                <form className="mt-6" onSubmit={handleLogin}>
                    {/* 🔹 Email */}
                    <div className="mb-4">
                        <label className="block text-[#6D2323] font-semibold">อีเมล</label>
                        <input 
                            type="email" 
                            placeholder="กรอกอีเมล" 
                            className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                            required 
                        />
                    </div>

                    {/* 🔹 Password */}
                    <div className="mb-4">
                        <label className="block text-[#6D2323] font-semibold">รหัสผ่าน</label>
                        <input 
                            type="password" 
                            placeholder="กรอกรหัสผ่าน" 
                            className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                            required 
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
                    <button type="submit" className="w-full bg-[#A31D1D] text-white py-3 rounded-lg font-semibold hover:bg-[#6D2323] transition">
                        เข้าสู่ระบบ
                    </button>
                </form>

                {/* 🔹 สมัครสมาชิก */}
                <p className="text-center text-sm mt-4">
                    ยังไม่มีบัญชี? 
                    <a href="/register" className="text-[#A31D1D] font-semibold hover:underline ml-1">
                        สมัครสมาชิก
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
