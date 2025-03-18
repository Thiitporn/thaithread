import React, { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`ลิงก์รีเซ็ตรหัสผ่านถูกส่งไปที่: ${email}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FEF9E1]">
            <div className="card bg-[#E5D0AC] w-full max-w-md shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-[#6D2323] text-center">ลืมรหัสผ่าน</h1>
                <p className="text-sm text-center text-gray-700 mt-2">
                    กรุณากรอกอีเมลของคุณเพื่อรับลิงก์รีเซ็ตรหัสผ่าน
                </p>

                <form className="mt-6" onSubmit={handleSubmit}>
                    <label className="block text-[#6D2323] font-semibold">อีเมล</label>
                    <input 
                        type="email" 
                        placeholder="กรอกอีเมล" 
                        className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />

                    <button type="submit" className="w-full bg-[#A31D1D] text-white py-3 mt-4 rounded-lg font-semibold hover:bg-[#6D2323] transition">
                        ส่งลิงก์รีเซ็ตรหัสผ่าน
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
