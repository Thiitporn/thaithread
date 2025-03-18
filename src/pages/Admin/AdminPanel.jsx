import React, { useState } from "react";
import { DeleteOutlined, BarChartOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

const AdminPanel = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "ผู้ใช้ A", email: "userA@example.com", role: "owner" },
        { id: 2, name: "ผู้ใช้ B", email: "userB@example.com", role: "customer" }
    ]);

    const [orders, setOrders] = useState([
        { id: 101, customer: "ผู้ใช้ A", total: 500, status: "รอดำเนินการ" },
        { id: 102, customer: "ผู้ใช้ B", total: 1500, status: "สำเร็จ" }
    ]);

    const [products, setProducts] = useState([
        { id: 1, name: "กางเกงขาบาน", price: 159, stock: 20, image: "/src/assets/product01.jpg" }
    ]);

    // ✅ ลบผู้ใช้
    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    // ✅ ลบคำสั่งซื้อ
    const deleteOrder = (id) => {
        setOrders(orders.filter(order => order.id !== id));
    };

    // ✅ ลบสินค้า
    const deleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-[#6D2323]">⚙️ ระบบจัดการเว็บไซต์ (Admin)</h1>

            {/* ✅ ดูรายชื่อสมาชิก */}
            <div className="bg-[#E5D0AC] p-6 mt-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#6D2323]"><UserOutlined /> รายชื่อสมาชิก</h2>
                {users.length === 0 ? <p className="text-gray-500">ไม่มีสมาชิก</p> : (
                    <ul className="mt-4">
                        {users.map(user => (
                            <li key={user.id} className="flex justify-between bg-white p-3 rounded-md shadow-sm mt-2">
                                <span>{user.name} - {user.email} ({user.role})</span>
                                <button className="text-red-600 hover:text-red-800"
                                    onClick={() => deleteUser(user.id)}>
                                    <DeleteOutlined />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* ✅ ดู/ลบคำสั่งซื้อ */}
            <div className="bg-[#E5D0AC] p-6 mt-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#6D2323]"><ShoppingCartOutlined /> คำสั่งซื้อ</h2>
                {orders.length === 0 ? <p className="text-gray-500">ไม่มีคำสั่งซื้อ</p> : (
                    <ul className="mt-4">
                        {orders.map(order => (
                            <li key={order.id} className="flex justify-between bg-white p-3 rounded-md shadow-sm mt-2">
                                <span>คำสั่งซื้อ #{order.id} - {order.customer} (฿{order.total}) [{order.status}]</span>
                                <button className="text-red-600 hover:text-red-800"
                                    onClick={() => deleteOrder(order.id)}>
                                    <DeleteOutlined />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* ✅ จัดการสินค้า */}
            <div className="bg-[#E5D0AC] p-6 mt-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#6D2323]"><BarChartOutlined /> จัดการสินค้า</h2>
                {products.length === 0 ? <p className="text-gray-500">ไม่มีสินค้า</p> : (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {products.map(product => (
                            <div key={product.id} className="border p-4 rounded-lg shadow-md bg-white">
                                <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-md" />
                                <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                                <p className="text-[#A31D1D] font-semibold">฿{product.price}</p>
                                <p className="text-gray-600">สต็อก: {product.stock} ชิ้น</p>
                                <button className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                                    onClick={() => deleteProduct(product.id)}>
                                    <DeleteOutlined /> ลบสินค้า
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ✅ ตั้งค่าระบบ */}
            <div className="bg-[#E5D0AC] p-6 mt-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#6D2323]"><SettingOutlined /> ตั้งค่าระบบ</h2>
                <p className="text-gray-600 mt-2">คุณสามารถตั้งค่าระบบ เช่น เปลี่ยนแปลงข้อมูลเว็บไซต์ และจัดการสิทธิ์ผู้ใช้</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition">
                    ตั้งค่าระบบ
                </button>
            </div>
        </div>
    );
};

export default AdminPanel;
