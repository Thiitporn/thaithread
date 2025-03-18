import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("รหัสผ่านไม่ตรงกัน!");
            return;
        }
        alert("รีเซ็ตรหัสผ่านสำเร็จ!");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FEF9E1]">
            <div className="card bg-[#E5D0AC] w-full max-w-md shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-[#6D2323] text-center">รีเซ็ตรหัสผ่าน</h1>

                <form className="mt-6" onSubmit={handleSubmit}>
                    <label className="block text-[#6D2323] font-semibold">รหัสผ่านใหม่</label>
                    <input 
                        type="password" 
                        placeholder="กรอกรหัสผ่านใหม่" 
                        className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />

                    <label className="block text-[#6D2323] font-semibold mt-4">ยืนยันรหัสผ่านใหม่</label>
                    <input 
                        type="password" 
                        placeholder="กรอกรหัสผ่านอีกครั้ง" 
                        className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />

                    <button type="submit" className="w-full bg-[#A31D1D] text-white py-3 mt-4 rounded-lg font-semibold hover:bg-[#6D2323] transition">
                        รีเซ็ตรหัสผ่าน
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
