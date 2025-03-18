import React, { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

// หน้าจัดการผู้ใช้

const ManageUsers = () => {
    // ✅ สถานะของผู้ใช้
    const [users, setUsers] = useState([
        { id: 1, name: "ผู้ใช้ A", email: "userA@example.com", role: "owner" },
        { id: 2, name: "ผู้ใช้ B", email: "userB@example.com", role: "customer" },
    ]);

    // ✅ สถานะสำหรับฟอร์มเพิ่ม/แก้ไขผู้ใช้
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        role: "customer",  // default คือ "customer"
    });

    // ✅ ฟังก์ชันเพิ่มผู้ใช้
    const addUser = (e) => {
        e.preventDefault();
        if (!newUser.name || !newUser.email) {
            alert("กรุณากรอกข้อมูลผู้ใช้ให้ครบ!");
            return;
        }

        const newId = users.length ? users[users.length - 1].id + 1 : 1;
        setUsers([...users, { ...newUser, id: newId }]);

        // รีเซ็ตฟอร์ม
        setNewUser({ name: "", email: "", role: "customer" });
    };

    // ✅ ฟังก์ชันลบผู้ใช้
    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    // ✅ ฟังก์ชันแก้ไขผู้ใช้
    const editUser = (id) => {
        const userToEdit = users.find(user => user.id === id);
        setNewUser({
            name: userToEdit.name,
            email: userToEdit.email,
            role: userToEdit.role
        });
        deleteUser(id); // ลบผู้ใช้เดิมก่อนทำการเพิ่มใหม่
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-[#6D2323]">จัดการผู้ใช้</h1>

            {/* ✅ ฟอร์มเพิ่มผู้ใช้ */}
            <div className="bg-[#E5D0AC] p-6 mt-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#6D2323] mb-4">เพิ่มผู้ใช้ใหม่</h2>
                <form onSubmit={addUser} className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="ชื่อผู้ใช้" className="p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                        value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} required />
                    <input type="email" placeholder="อีเมลผู้ใช้" className="p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white placeholder-gray-300"
                        value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
                    <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="p-3 border border-[#A31D1D] rounded-md bg-[#6D2323] text-white">
                        <option value="customer">ลูกค้า</option>
                        <option value="owner">เจ้าของร้าน</option>
                        <option value="admin">ผู้ดูแลระบบ</option>
                    </select>
                </form>
                <button type="submit" className="w-full bg-[#A31D1D] text-white py-3 mt-4 rounded-lg font-semibold hover:bg-[#6D2323] transition"
                    onClick={addUser}>
                    เพิ่มผู้ใช้
                </button>
            </div>

            {/* ✅ รายการผู้ใช้ */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-[#6D2323]">📋 รายการผู้ใช้</h2>
                {users.map((user) => (
                    <div key={user.id} className="border p-4 rounded-lg shadow-md bg-white mt-4">
                        <h3 className="text-lg font-bold">{user.name} ({user.role})</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>

                        {/* ปุ่มแก้ไขผู้ใช้ */}
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => editUser(user.id)} className="text-yellow-600 hover:text-yellow-800">
                                <EditOutlined /> แก้ไข
                            </button>

                            {/* ปุ่มลบผู้ใช้ */}
                            <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-800">
                                <DeleteOutlined /> ลบ
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageUsers;
