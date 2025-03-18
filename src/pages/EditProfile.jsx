import React, { useState } from "react";

const EditProfile = () => {
    const [name, setName] = useState("ชื่อของคุณ");
    const [email, setEmail] = useState("example@email.com");
    const [phone, setPhone] = useState("0123456789");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("บันทึกข้อมูลสำเร็จ!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FEF9E1]">
            <div className="card bg-[#E5D0AC] w-full max-w-md shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-[#6D2323] text-center">แก้ไขข้อมูลส่วนตัว</h1>

                <form className="mt-6" onSubmit={handleSubmit}>
                    <label className="block text-[#6D2323] font-semibold">ชื่อ-นามสกุล</label>
                    <input 
                        type="text" 
                        className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />

                    <label className="block text-[#6D2323] font-semibold mt-4">อีเมล</label>
                    <input 
                        type="email" 
                        className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />

                    <label className="block text-[#6D2323] font-semibold mt-4">เบอร์โทรศัพท์</label>
                    <input 
                        type="text" 
                        className="input input-bordered w-full p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        required 
                    />

                    <button type="submit" className="w-full bg-[#A31D1D] text-white py-3 mt-4 rounded-lg font-semibold hover:bg-[#6D2323] transition">
                        บันทึกข้อมูล
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
